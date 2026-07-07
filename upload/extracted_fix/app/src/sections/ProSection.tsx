import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const portrait = portraitRef.current;

    if (!section || !headline || !portrait) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(headline,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(portrait,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(portrait,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#F6F7F9] z-[90]"
      style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(233,236,239,0.7) 0%, rgba(246,247,249,0) 50%)'
      }}
    >
      {/* Headline Block (Left) */}
      <div
        ref={headlineRef}
        className="absolute left-[9vw] top-[28vh] w-[38vw] will-change-transform"
      >
        <h2 className="font-display font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-[#111827] mb-6">
          GO PRO<br />UNLOCK<br />EVERYTHING
        </h2>
        <p className="font-body text-lg text-[#6B7280] mb-8 max-w-[34vw]">
          Instant HD, private folders, and new styles before everyone else.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="/tokens"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 transition-all"
          >
            Upgrade now
          </a>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] rounded-full">
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
            <span className="font-label font-medium text-xs text-[#111827]">Pro</span>
          </span>
        </div>
      </div>

      {/* Portrait Card (Right) */}
      <div
        ref={portraitRef}
        className="absolute left-[56vw] top-[14vh] w-[36vw] h-[72vh] image-card will-change-transform"
      >
        <img
          src="/images/pro_portrait.jpg"
          alt="Pro member"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
