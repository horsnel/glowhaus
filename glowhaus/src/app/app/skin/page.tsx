
import { useState } from 'react';
import { Sparkles, RefreshCw, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Sidebar from '@/components/layout/Sidebar';
import { mockSkinProfile } from '@/lib/mockData';

const skinTypeTips = {
  oily: [
    'Use oil-free, non-comedogenic products',
    'Try double cleansing in the evening',
    'Use salicylic acid for pore care',
    'Don\'t skip moisturizer - oily skin needs hydration too',
  ],
  dry: [
    'Layer hydrating products (essence, serum, cream)',
    'Use gentle, non-foaming cleansers',
    'Add facial oils to your routine',
    'Avoid hot water when cleansing',
  ],
  combination: [
    'Use different products for different areas',
    'Focus hydration on dry zones',
    'Use lighter products on oily T-zone',
    'Balance is key - don\'t over-treat either area',
  ],
  not_sure: [
    'Start with gentle, balanced products',
    'Observe how your skin reacts throughout the day',
    'Consider a dermatologist consultation',
    'Track your skin changes over time',
  ],
};

export default function SkinProfilePage() {
  const [profile] = useState(mockSkinProfile);
  const [trackingEnabled, setTrackingEnabled] = useState(profile.trackingEnabled);

  const tips = skinTypeTips[profile.skinType] || [];

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      <Sidebar activeItem="skin" />

      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Skin Profile</h1>
        </header>

        <div className="p-6 space-y-6">
          {/* Profile Summary */}
          <GlassCard className="p-6 aurora-gradient">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  Your Skin Profile
                </h2>
                <p className="text-[var(--text-secondary)]">
                  Based on your onboarding quiz
                </p>
              </div>
              <div className="relative w-24 h-24">
                {/* Circular progress */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(profile.completionPercentage / 100) * 251} 251`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--accent)]">
                    {profile.completionPercentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-[var(--text-tertiary)] mb-1">Skin Type</p>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-semibold text-[var(--text-primary)] capitalize">
                    {profile.skinType.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-[var(--text-tertiary)] mb-1">Aesthetic Vibe</p>
                <span className="font-semibold text-[var(--text-primary)] capitalize">
                  {profile.vibe}
                </span>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-[var(--text-tertiary)] mb-1">Main Goal</p>
                <span className="font-semibold text-[var(--text-primary)] capitalize">
                  {profile.goal.replace('_', ' ')}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Concerns */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Skin Concerns
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.concerns.map((concern) => (
                <span
                  key={concern}
                  className="px-4 py-2 rounded-full bg-[var(--accent-pale)] text-[var(--accent)] text-sm font-medium"
                >
                  {concern}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Tips */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Tips for {profile.skinType.replace('_', ' ')} skin
            </h3>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)]">{tip}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Tracking Toggle */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  Progress Tracking
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Enable to track your glow up journey with photos
                </p>
              </div>
              <button
                onClick={() => setTrackingEnabled(!trackingEnabled)}
                className="relative"
              >
                {trackingEnabled ? (
                  <ToggleRight className="w-14 h-8 text-[var(--accent)]" />
                ) : (
                  <ToggleLeft className="w-14 h-8 text-[var(--text-tertiary)]" />
                )}
              </button>
            </div>
          </GlassCard>

          {/* Retake Quiz */}
          <div className="text-center">
            <a
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-[var(--border-light)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:shadow-[var(--glow-soft)] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Retake quiz
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
