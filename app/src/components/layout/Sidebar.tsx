'use client';

import { useState } from 'react';
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

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[#E11D48] text-white shadow-lg flex items-center justify-center"
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
            'absolute left-0 top-0 bottom-0 w-64 glass-card transition-transform duration-300',
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
