'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenDisplayProps {
  tokens: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TokenDisplay({ 
  tokens, 
  showLabel = true,
  size = 'md',
  className 
}: TokenDisplayProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-semibold',
        'bg-[var(--accent-pale)] text-[var(--accent)]',
        'shadow-[0_0_15px_rgba(225,29,72,0.3)]',
        sizes[size],
        className
      )}
    >
      <Sparkles className={cn(
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-5 h-5',
        size === 'lg' && 'w-6 h-6'
      )} />
      <span>{tokens.toLocaleString()}</span>
      {showLabel && <span className="text-[var(--text-secondary)] font-normal">tokens</span>}
    </div>
  );
}
