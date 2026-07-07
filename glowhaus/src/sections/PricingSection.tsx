import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    price: 'Free',
    description: 'Start your glow up journey',
    features: [
      '5 previews/month',
      'Standard quality',
      'Watermarked downloads',
      'Basic styles'
    ],
    cta: 'Start free',
    ctaHref: '/signup',
    primary: false
  },
  {
    name: 'Pro',
    price: '₦9900',
    period: '/month',
    description: 'Unlock everything',
    features: [
      'Unlimited previews',
      'HD, no watermark',
      'Priority generation',
      'Save collections'
    ],
    cta: 'Upgrade to Pro',
    ctaHref: '/tokens',
    primary: true,
    badge: 'Most popular'
  }
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

      // Cards animation
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: '10vh', opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flowing-section bg-[#F6F7F9] z-[80] py-[12vh]"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-[#111827] mb-4">
            Simple pricing
          </h2>
          <p className="font-body text-lg text-[#6B7280] max-w-xl mx-auto">
            Start free. Upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className={`relative bg-white rounded-[28px] p-8 card-shadow hover:card-shadow-hover transition-all duration-300 ${
                plan.primary ? 'border-t-4 border-[#E11D48]' : ''
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-[#E11D48] text-white rounded-full font-label font-medium text-xs animate-glow-pulse">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-2xl text-[#111827] mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-4xl text-[#111827]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="font-body text-[#6B7280]">{plan.period}</span>
                  )}
                </div>
                <p className="font-body text-sm text-[#6B7280] mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#E11D48]" />
                    </div>
                    <span className="font-body text-sm text-[#6B7280]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  plan.primary 
                    ? 'text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 active:scale-[0.98]'
                    : 'border border-[rgba(0,0,0,0.1)] text-[#1F2937] hover:border-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
