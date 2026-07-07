import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Sparkles, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Upload your photo',
    description: 'Clear, front-facing selfies work best.',
    icon: Upload
  },
  {
    number: '02',
    title: 'Pick a style',
    description: 'Soft glam, clean girl, Y2K, editorial, and more.',
    icon: Sparkles
  },
  {
    number: '03',
    title: 'Download & share',
    description: 'Save HD images or post straight to your feed.',
    icon: Download
  }
];

export default function StepsSection() {
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
        { y: '6vh', opacity: 0 },
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

      // Cards stagger animation
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: '10vh', opacity: 0, rotate: -2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
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
      className="flowing-section bg-[#F6F7F9] z-20 py-[12vh]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-[#111827] mb-4">
            3 steps to glow
          </h2>
          <p className="font-body text-lg text-[#6B7280] max-w-xl mx-auto">
            No app install. No guesswork. Just your best look, fast.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className="bg-white rounded-[28px] p-8 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step Number */}
                <span className="font-display font-black text-6xl text-[#E5E7EB] mb-6 block">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#E11D48]" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-[#111827] mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
