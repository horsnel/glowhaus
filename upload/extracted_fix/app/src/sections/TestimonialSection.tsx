import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const quote = quoteRef.current;
    const attribution = attributionRef.current;

    if (!section || !portrait || !quote || !attribution) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(portrait,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(quote,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(attribution,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(portrait,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(quote,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(attribution,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#E9ECEF] z-[70]"
    >
      {/* Portrait Card (Left) */}
      <div
        ref={portraitRef}
        className="absolute left-[9vw] top-[14vh] w-[40vw] h-[72vh] image-card will-change-transform"
      >
        <img
          src="/images/testimonial_portrait.jpg"
          alt="Beauty creator"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quote Block (Right) */}
      <div
        ref={quoteRef}
        className="absolute left-[56vw] top-[30vh] w-[36vw] will-change-transform"
      >
        <blockquote className="font-display font-bold text-[clamp(24px,3vw,40px)] leading-tight text-[#111827] mb-8">
          "I use GlowHaus to test looks before I film. It saves me hours."
        </blockquote>
      </div>

      {/* Attribution */}
      <div
        ref={attributionRef}
        className="absolute left-[56vw] top-[62vh] will-change-transform"
      >
        <p className="font-body text-lg text-[#6B7280] mb-2">
          Mina K. • Beauty creator
        </p>
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-[#E11D48]" />
          <span className="font-label text-sm text-[#E11D48]">Verified creator</span>
        </div>
      </div>
    </section>
  );
}
