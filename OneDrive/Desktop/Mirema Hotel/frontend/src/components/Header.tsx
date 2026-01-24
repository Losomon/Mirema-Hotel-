import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useMember } from '@/integrations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Apartments', path: '/rooms' },
    { name: 'About Us', path: '/about' },
    { name: 'Services & Amenities', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location & Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-heading text-2xl md:text-3xl text-primary">
              Mirema Hotel
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />
            
            {/* Auth Buttons */}
            {isLoading ? (
              <div className="w-20 h-10 bg-primary/10 animate-pulse rounded" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button 
                  onClick={actions.logout}
                  variant="outline" 
                  className="border-primary/30 text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-paragraph"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={actions.login}
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph"
              >
                Sign In
              </Button>
            )}
            
            <Link to="/booking">
              <Button className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold">
                Book Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-primary p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-paragraph text-base py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="py-2">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Auth Buttons */}
            {isLoading ? (
              <div className="w-full h-10 bg-primary/10 animate-pulse rounded" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph w-full">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    actions.logout();
                  }}
                  variant="outline" 
                  className="border-primary/30 text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-paragraph w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  actions.login();
                }}
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph w-full"
              >
                Sign In
              </Button>
            )}
            
            <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold w-full">
                Book Now
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
