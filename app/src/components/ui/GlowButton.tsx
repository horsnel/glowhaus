'use client';

import { cn } from '@/lib/utils';
import { Loader2, Check } from 'lucide-react';
import { forwardRef } from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    loading = false,
    success = false,
    disabled = false,
    className,
    onClick,
    type = 'button',
    href
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30';
    
    const variants = {
      primary: 'glow-btn-primary',
      secondary: 'glow-btn-secondary',
      outline: 'border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48]/10',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    const content = (
      <>
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {success && !loading && <Check className="w-4 h-4 mr-2" />}
        {children}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {content}
      </button>
    );
  }
);

GlowButton.displayName = 'GlowButton';

export default GlowButton;
