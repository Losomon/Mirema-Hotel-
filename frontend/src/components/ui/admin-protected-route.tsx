import { ReactNode } from 'react';
import { useMember } from '@/integrations';
import { SignIn } from '@/components/ui/sign-in';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AdminProtectedRouteProps {
  children: ReactNode;
  messageToSignIn?: string;
  messageToLoading?: string;
  signInTitle?: string;
}

export function AdminProtectedRoute({
  children,
  messageToSignIn = "Please sign in to access the admin console.",
  messageToLoading = "Loading admin console...",
  signInTitle = "Admin Access Required"
}: AdminProtectedRouteProps) {
  const { isAuthenticated, isLoading, member } = useMember();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoadingSpinner message={messageToLoading} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SignIn
          title={signInTitle}
          message={messageToSignIn}
        />
      </div>
    );
  }

  // TODO: Add admin role check when backend supports roles
  // For now, allow any authenticated user (demo only)
  // In production, check: member.roles?.includes('admin') or member.customFields?.isAdmin
  const isAdmin = true; // Placeholder - implement proper role check

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-destructive mb-4">Access Denied</h1>
          <p className="font-paragraph text-foreground/70">
            You do not have permission to access the admin console.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
