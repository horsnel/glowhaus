'use client';

import { ChevronLeft, Shield } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const sections = [
  {
    title: 'Introduction',
    content: `GlowHaus ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered beauty transformation service.`,
  },
  {
    title: 'Data We Collect',
    content: `We collect the following types of information:

• Personal Information: Name, email address, and account credentials
• Photos: Images you upload for transformation
• Usage Data: How you interact with our service
• Device Information: Browser type, IP address, device identifiers
• Payment Information: Processed securely through Paystack`,
  },
  {
    title: 'How We Use Your Data',
    content: `We use your data to:

• Generate AI-powered beauty transformations
• Improve our algorithms and service quality
• Process payments and manage your account
• Send notifications about your generations
• Provide customer support
• Comply with legal obligations`,
  },
  {
    title: 'Photo Storage and Deletion',
    content: `Your photos are stored securely on encrypted servers. By default:

• Original photos are stored for 30 days
• Generated results are stored indefinitely unless you delete them
• You can request immediate deletion at any time
• Photos are never used to train AI models without explicit consent
• You can enable auto-delete in your privacy settings`,
  },
  {
    title: 'Third-Party Services',
    content: `We use the following third-party services:

• Supabase: Database and authentication
• Paystack: Payment processing
• Cloudflare: CDN and security
• Google OAuth: Optional authentication

These services have their own privacy policies and security measures.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to:

• Access your personal data
• Correct inaccurate information
• Request deletion of your data
• Export your data
• Opt out of marketing communications
• Disable data tracking

Contact us to exercise these rights.`,
  },
  {
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy, please contact us at:

Email: privacy@glowhaus.app
Address: [Your Business Address]

We will respond to your inquiry within 48 hours.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <a 
            href="/"
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </a>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[var(--accent)]" />
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h2>
          <p className="text-[var(--text-secondary)]">
            Last updated: January 2026
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <GlassCard key={i} className="p-6" hover={false}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                {section.title}
              </h3>
              <div className="text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            By using GlowHaus, you agree to this Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
