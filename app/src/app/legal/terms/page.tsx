'use client';

import { ChevronLeft, FileText } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using GlowHaus ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

You must be at least 13 years old to use GlowHaus. By using the Service, you represent and warrant that you meet this requirement.`,
  },
  {
    title: 'Token Purchase and Refunds',
    content: `Tokens are the virtual currency used to access premium features of GlowHaus:

• Tokens are purchased through Paystack in Nigerian Naira (₦)
• 1 token = ₦10
• Tokens are non-refundable except where required by law
• Tokens do not expire
• Bonus tokens are included with certain packages
• We reserve the right to modify token pricing at any time

Refunds may be issued in cases of:
• Technical errors preventing service delivery
• Unauthorized transactions
• Service unavailability exceeding 24 hours`,
  },
  {
    title: 'Content Ownership',
    content: `You retain ownership of all photos you upload to GlowHaus. However:

• You grant us a license to process your photos for AI generation
• Generated images are owned by you
• We may use anonymized data to improve our services
• You are responsible for ensuring you have rights to uploaded content
• Do not upload photos of others without their consent`,
  },
  {
    title: 'Prohibited Content',
    content: `You may not use GlowHaus to create, upload, or share:

• Content depicting minors inappropriately
• Non-consensual intimate images
• Content promoting hate speech or discrimination
• Content that infringes on intellectual property rights
• Malicious software or harmful code
• Content violating any applicable laws

Violation will result in immediate account termination.`,
  },
  {
    title: 'Account Termination',
    content: `We may terminate or suspend your account for:

• Violation of these Terms
• Fraudulent activity
• Abuse of the service
• Non-payment of fees
• Extended period of inactivity (12+ months)

You may delete your account at any time through settings. Upon termination:

• Your access to the Service will cease
• Unused tokens will be forfeited
• Your data will be deleted per our Privacy Policy`,
  },
  {
    title: 'Limitation of Liability',
    content: `GlowHaus is provided "as is" without warranties of any kind:

• We do not guarantee specific results from AI generation
• We are not responsible for how you use generated content
• Service availability is not guaranteed
• We are not liable for indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount you paid in the last 12 months

You use the Service at your own risk.`,
  },
  {
    title: 'Changes to Terms',
    content: `We may update these Terms from time to time:

• Changes will be posted on this page
• Significant changes will be notified via email
• Continued use after changes constitutes acceptance
• Previous versions will be archived

We encourage you to review these Terms periodically.`,
  },
  {
    title: 'Contact',
    content: `For questions about these Terms, contact us:

Email: legal@glowhaus.app
Address: [Your Business Address]

We aim to respond within 48 hours.`,
  },
];

export default function TermsPage() {
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
            <FileText className="w-6 h-6 text-[var(--accent)]" />
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Terms of Service</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Terms of Service
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
            By using GlowHaus, you agree to these Terms of Service.
          </p>
        </div>
      </main>
    </div>
  );
}
