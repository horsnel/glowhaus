// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tokens: number;
  tier: 'free' | 'starter' | 'pro' | 'elite';
  totalGenerations: number;
  createdAt: Date;
}

// Token Package Types
export interface TokenPackage {
  id: string;
  name: string;
  price: number;
  tokens: number;
  bonusTokens: number;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
}

// Style Types
export interface Style {
  id: string;
  name: string;
  description: string;
  category: 'soft' | 'edgy' | 'classic' | 'y2k' | 'trending' | 'new' | 'premium';
  tokenCost: number;
  qualityTiers: ('standard' | 'hd' | '4k')[];
  previewImage: string;
  isPremium: boolean;
  tutorial?: TutorialStep[];
}

export interface TutorialStep {
  step: number;
  title: string;
  description: string;
}

// Generation Job Types
export interface GenerationJob {
  id: string;
  userId: string;
  styleId: string;
  styleName: string;
  originalImage: string;
  resultImage?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  quality: 'standard' | 'hd' | '4k';
  tokensUsed: number;
  queuePosition?: number;
  estimatedWaitTime?: number;
  createdAt: Date;
  completedAt?: Date;
  isFavorite: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'job_complete' | 'new_style' | 'tip' | 'low_tokens' | 'community';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Community Post Types
export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  styleId: string;
  styleName: string;
  image: string;
  upvotes: number;
  hasUpvoted: boolean;
  createdAt: Date;
}

// Skin Profile Types
export interface SkinProfile {
  userId: string;
  skinType: 'oily' | 'dry' | 'combination' | 'not_sure';
  vibe: 'soft' | 'edgy' | 'classic' | 'y2k';
  goal: 'everyday' | 'makeup_skills' | 'transformation';
  concerns: string[];
  inspoImages: string[];
  notificationsEnabled: boolean;
  trackingEnabled: boolean;
  completionPercentage: number;
}

// Progress Entry Types
export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  photo: string;
  notes: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
  glowUpScore?: number;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  affiliateLink: string;
}

// Onboarding Step Types
export type OnboardingStep = 
  | 'skin_type' 
  | 'vibe' 
  | 'goal' 
  | 'inspo' 
  | 'notifications';

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
