
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import TokenDisplay from '@/components/ui/TokenDisplay';
import TierBadge from '@/components/ui/TierBadge';
import type { User } from '@/types';

interface GlassNavProps {
  user?: User;
  showTokens?: boolean;
}

const navLinks = [
  { label: 'Styles', href: '/styles' },
  { label: 'How it works', href: '/#steps' },
  { label: 'Community', href: '/community' },
  { label: 'Pricing', href: '/tokens' },
];

export default function GlassNav({ user, showTokens = false }: GlassNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo (text only) */}
            <a href="/" className="font-bold text-xl text-[var(--text-primary)]">
              GlowHaus
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {showTokens && user && (
                <>
                  <TokenDisplay tokens={user.tokens} size="sm" />
                  <TierBadge tier={user.tier} />
                </>
              )}
              <a
                href="/signup"
                className="glow-btn-primary text-sm py-2 px-5"
              >
                Start free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transition-transform duration-300 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-16">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-semibold text-[var(--text-primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/signup"
            className="glow-btn-primary mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start free
          </a>
        </div>
      </div>
    </>
  );
}
