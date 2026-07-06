'use client';

import { cn } from '@/lib/utils';
import { Lock, Sparkles } from 'lucide-react';
import type { Style } from '@/types';

interface StyleCardProps {
  style: Style;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function StyleCard({ style, onClick, href, className }: StyleCardProps) {
  const content = (
    <>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={style.previewImage}
          alt={style.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Premium Badge */}
        {style.isPremium && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-purple-500/90 backdrop-blur-sm rounded-full">
            <Lock className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white">Premium</span>
          </div>
        )}
        
        {/* Token Cost */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
          <Sparkles className="w-3 h-3 text-[#E11D48]" />
          <span className="text-xs font-semibold text-[#111827]">{style.tokenCost}</span>
        </div>
        
        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-white text-lg">{style.name}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{style.description}</p>
        </div>
      </div>
      
      {/* Bottom Info */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-[var(--text-primary)]">{style.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          {style.qualityTiers.map((tier) => (
            <span
              key={tier}
              className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium',
                tier === '4k' && 'bg-purple-100 text-purple-600',
                tier === 'hd' && 'bg-blue-100 text-blue-600',
                tier === 'standard' && 'bg-gray-100 text-gray-600'
              )}
            >
              {tier.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const cardClassName = cn(
    'style-card group bg-white',
    className
  );

  if (href) {
    return (
      <a href={href} className={cardClassName} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div className={cardClassName} onClick={onClick}>
      {content}
    </div>
  );
}
