'use client';

import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface TierBadgeProps {
  tier: User['tier'];
  className?: string;
}

export default function TierBadge({ tier, className }: TierBadgeProps) {
  const tierConfig = {
    free: {
      label: 'Free',
      className: 'tier-badge-free',
    },
    starter: {
      label: 'Starter',
      className: 'tier-badge-starter',
    },
    pro: {
      label: 'Pro',
      className: 'tier-badge-pro',
    },
    elite: {
      label: 'Elite',
      className: 'tier-badge-elite',
    },
  };

  const config = tierConfig[tier];

  return (
    <span className={cn('tier-badge', config.className, className)}>
      {config.label}
    </span>
  );
}
