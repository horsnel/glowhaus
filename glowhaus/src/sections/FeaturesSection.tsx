import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: 'HD in seconds',
    description: 'AI renders crisp, share-ready images you\'ll actually want to post.',
    link: 'Learn more'
  },
  {
    icon: Shield,
    title: 'Privacy-first',
    description: 'Your uploads are encrypted and never used to train models.',
    link: 'Learn more'
  },
  {
    icon: Heart,
    title: 'Any style, any mood',
    description: 'Save favorites, build collections, and revisit looks anytime.',
    link: 'Learn more'
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const lines = linesRef.current.filter(Boolean);

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
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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

      // Line draw animation
      lines.forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
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
      className="flowing-section bg-[#F6F7F9] z-50 py-[12vh]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-[#111827] mb-4">
            Built for real life
          </h2>
          <p className="font-body text-lg text-[#6B7280] max-w-xl mx-auto">
            Fast, private, and made to fit your routine.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className="bg-white rounded-[28px] p-8 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#E11D48]" />
                </div>

                {/* Decorative Line */}
                <div
                  ref={el => { linesRef.current[index] = el; }}
                  className="w-12 h-[2px] bg-[#E11D48] mb-6 origin-left"
                />

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-[#111827] mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[#6B7280] leading-relaxed mb-4">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="font-label font-medium text-sm text-[#E11D48] hover:underline"
                >
                  {feature.link}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
