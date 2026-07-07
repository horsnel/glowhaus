
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Home,
  History,
  Heart,
  Sparkles,
  TrendingUp,
  Users,
  Settings,
  Coins,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

const sidebarItems = [
  { id: 'home', label: 'Home', href: '/app', icon: Home },
  { id: 'history', label: 'History', href: '/app/history', icon: History },
  { id: 'favorites', label: 'Favorites', href: '/app/favorites', icon: Heart },
  { id: 'skin', label: 'Skin Profile', href: '/app/skin', icon: Sparkles },
  { id: 'progress', label: 'Progress', href: '/app/progress', icon: TrendingUp },
  { id: 'community', label: 'Community', href: '/community', icon: Users },
  { id: 'settings', label: 'Settings', href: '/app/settings', icon: Settings },
  { id: 'tokens', label: 'Tokens', href: '/tokens', icon: Coins },
];

export default function Sidebar({ activeItem = 'home' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{
          bottom: 'calc(1rem + env(safe-area-inset-bottom))',
          right: 'calc(1rem + env(safe-area-inset-right))',
        }}
        className="lg:hidden fixed z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#E11D48] to-[#F43F5E] text-white shadow-[0_8px_25px_rgba(225,29,72,0.5)] flex items-center justify-center active:scale-95 transition-transform"
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 bottom-0 z-40 transition-all duration-300',
          'glass-card border-r border-[var(--border-light)]',
          isCollapsed ? 'w-20' : 'w-64',
          'hidden lg:block'
        )}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive 
                    ? 'bg-[var(--accent-pale)] text-[var(--accent)] shadow-[var(--glow-soft)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          isMobileOpen ? 'visible' : 'invisible'
        )}
      >
        <div 
          className={cn(
            'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity',
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileOpen(false)}
        />
        <aside
          className={cn(
            'absolute left-0 top-0 bottom-0 w-64 max-w-[85vw] glass-card transition-transform duration-300',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4 pt-20 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    isActive 
                      ? 'bg-[var(--accent-pale)] text-[var(--accent)]' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--secondary)]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}
