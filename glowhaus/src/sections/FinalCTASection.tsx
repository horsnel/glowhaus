import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const content = contentRef.current;

    if (!section || !portrait || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE
      tl.fromTo(
        portrait,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      tl.fromTo(
        content,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // EXIT
      tl.fromTo(
        portrait,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for signing up! Check your email for early access.');
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#E9ECEF] z-[110]"
      style={{
        background:
          'radial-gradient(circle at 70% 50%, rgba(233,236,239,0.7) 0%, rgba(233,236,239,0) 50%)',
      }}
    >
      {/* Portrait Card (Left) */}
      <div
        ref={portraitRef}
        className="absolute left-[9vw] top-[14vh] w-[40vw] h-[72vh] image-card will-change-transform"
      >
        <img
          src="/images/finalcta_portrait.jpg"
          alt="Happy user"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content (Right) */}
      <div
        ref={contentRef}
        className="absolute left-[56vw] top-[26vh] w-[36vw] will-change-transform"
      >
        <h2 className="font-display font-black text-[clamp(32px,4vw,64px)] leading-[0.95] tracking-[-0.02em] text-[#111827] mb-6">
          READY FOR
          <br />
          YOUR GLOW UP?
        </h2>
        <p className="font-body text-lg text-[#6B7280] mb-8 max-w-[34vw]">
          Drop your email for early access to new styles—then upload your first photo.
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-5 py-3 rounded-full border border-[rgba(0,0,0,0.08)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:border-[#E11D48] transition-all"
              required
            />
            <button type="submit" className="btn-primary">
              Get started
            </button>
          </div>
        </form>

        <a
          href="/signup"
          className="inline-flex items-center gap-2 font-label font-medium text-sm text-[#6B7280] hover:text-[#E11D48] transition-colors"
        >
          Or upload without email
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
