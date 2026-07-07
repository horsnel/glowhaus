
import { cn } from '@/lib/utils';

interface QueueOrbProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function QueueOrb({ size = 'md', className }: QueueOrbProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const innerSizes = {
    sm: 'inset-1.5',
    md: 'inset-2',
    lg: 'inset-3',
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Spinning outer ring */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full',
          'bg-gradient-to-r from-transparent via-[#E11D48] to-transparent'
        )}
        style={{
          animation: 'spin 2s linear infinite',
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{
          background: 'conic-gradient(from 0deg, transparent, #E11D48, transparent)',
          animation: 'spin 2s linear infinite',
        }}
      />
      
      {/* Inner circle */}
      <div className={cn(
        'absolute rounded-full bg-white',
        innerSizes[size]
      )} />
    </div>
  );
}
