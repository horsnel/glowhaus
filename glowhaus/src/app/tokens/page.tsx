
import { useState } from 'react';
import { Sparkles, Check, Shield, Lock, Star, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GlowButton from '@/components/ui/GlowButton';
import { tokenPackages } from '@/lib/mockData';

const testimonials = [
  { name: 'Sarah M.', text: 'Worth every naira! The HD quality is amazing.', rating: 5 },
  { name: 'Jessica K.', text: 'Pro tier saved me so much time with priority queue.', rating: 5 },
  { name: 'Mina K.', text: 'Best investment for my content creation.', rating: 5 },
];

const faqs = [
  { q: 'How do tokens work?', a: 'Each generation costs tokens based on the quality and style. 1 token = ₦10.' },
  { q: 'Can I get a refund?', a: 'Tokens are non-refundable but never expire.' },
  { q: 'What happens when I run out?', a: 'You can purchase more tokens anytime or upgrade to a higher tier.' },
];

export default function TokensPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = (packageId: string) => {
    setIsProcessing(true);
    // TODO: Initialize Paystack payment
    console.log('Initializing Paystack:', { packageId, email: 'user@example.com' });
    
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment initialized! (Demo mode)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--dominant-alt)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-[var(--border-light)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="font-bold text-xl text-[var(--text-primary)]">
            GlowHaus
          </a>
          <a href="/app" className="text-sm text-[var(--accent)] hover:underline">
            Back to app
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Choose Your Glow
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Purchase tokens to unlock more transformations. The more you buy, the more you save.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tokenPackages.map((pkg) => (
            <GlassCard 
              key={pkg.id}
              className={`p-6 relative ${pkg.isPopular || pkg.isBestValue ? 'ring-2 ring-[var(--accent)]' : ''}`}
              hover={true}
            >
              {/* Badge */}
              {(pkg.isPopular || pkg.isBestValue) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-semibold text-white ${
                    pkg.isPopular ? 'bg-[var(--accent)]' : 'bg-purple-500'
                  } ${pkg.isPopular ? 'animate-glow-pulse' : ''}`}>
                    {pkg.isPopular ? 'Most Popular' : 'Best Value'}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-[var(--text-primary)]">
                    ₦{pkg.price.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-semibold text-[var(--accent)]">
                    {pkg.tokens + pkg.bonusTokens} tokens
                  </span>
                </div>
                {pkg.bonusTokens > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    +{pkg.bonusTokens} bonus tokens
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <GlowButton
                onClick={() => handlePurchase(pkg.id)}
                loading={isProcessing}
                variant={pkg.price === 0 ? 'secondary' : 'primary'}
                className="w-full"
              >
                {pkg.price === 0 ? 'Start Free' : 'Buy Now'}
              </GlowButton>
            </GlassCard>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            What our users say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] mb-4">"{t.text}"</p>
                <p className="font-medium text-[var(--text-primary)]">— {t.name}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="overflow-hidden" hover={false}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-[var(--text-primary)]">{faq.q}</span>
                  <span className="text-[var(--accent)]">{expandedFaq === i ? '−' : '+'}</span>
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-[var(--text-secondary)]">{faq.a}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Paystack Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <span className="text-sm">Encrypted Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm">Instant Delivery</span>
          </div>
        </div>
      </main>
    </div>
  );
}
