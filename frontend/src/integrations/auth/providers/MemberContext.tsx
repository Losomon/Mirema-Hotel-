import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../auth/service';
import type { AuthUser, LoginCredentials } from '../auth/types';
import type { Member } from '../../index';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  member: Member | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

interface MemberProviderProps {
  children: ReactNode;
}

const MemberContext = createContext<AuthState & AuthActions | null>(null);

export function useMember() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}

export function MemberProvider({ children }: MemberProviderProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    member: null,
  });

  const checkSession = async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const token = authService.getToken();
      if (token) {
        const user = await authService.fetchCurrentUser();
        const member: Member = {
          ...user,
          loginEmail: user.email,
          loginEmailVerified: true,
          _createdDate: new Date().toISOString(),
          status: 'APPROVED',
        };
        setState({ isAuthenticated: true, isLoading: false, member });
      } else {
        setState({ isAuthenticated: false, isLoading: false, member: null });
      }
    } catch (e) {
      authService.clearToken();
      setState({ isAuthenticated: false, isLoading: false, member: null });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    authService.setToken(token);
    const member: Member = {
      ...user,
      loginEmail: user.email,
      loginEmailVerified: true,
      _createdDate: new Date().toISOString(),
      status: 'APPROVED',
    };
    setState({ isAuthenticated: true, isLoading: false, member });
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore network errors on logout
    } finally {
      authService.clearToken();
      setState({ isAuthenticated: false, isLoading: false, member: null });
      navigate('/');
    }
  };

  return (
    <MemberContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        member: state.member,
        login,
        logout,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}
