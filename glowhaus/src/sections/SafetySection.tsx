import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, EyeOff, Trash2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const safetyFeatures = [
  {
    icon: Lock,
    title: 'Encrypted uploads',
    description: 'Your photos are encrypted in transit and at rest.',
  },
  {
    icon: EyeOff,
    title: 'No model training',
    description: 'We never use your images to train AI models.',
  },
  {
    icon: Trash2,
    title: 'Auto-delete option',
    description: 'Set your photos to delete automatically after processing.',
  },
];

export default function SafetySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
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
            scrub: true,
          },
        }
      );

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flowing-section bg-[#F6F7F9] z-[100] py-[12vh]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-[#111827] mb-4">
            Your photos stay private
          </h2>
          <p className="font-body text-lg text-[#6B7280] max-w-xl mx-auto">
            We built GlowHaus with safety in mind—from upload to download.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="bg-white rounded-[28px] p-8 card-shadow text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-[#E11D48]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#111827] mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Learn More Link */}
        <div className="text-center">
          <a
            href="/legal/privacy"
            className="inline-flex items-center gap-2 font-label font-medium text-sm text-[#E11D48] hover:underline"
          >
            Learn more about our privacy policy
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
