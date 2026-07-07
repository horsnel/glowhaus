import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const uploadCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const label = labelRef.current;
    const uploadCard = uploadCardRef.current;

    if (!section || !portrait || !headline || !subhead || !label || !uploadCard) return;

    const ctx = gsap.context(() => {
      // Load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Portrait card entrance
      loadTl.fromTo(portrait,
        { x: '12vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.7 },
        0
      );

      // Headline words stagger
      const words = headline.querySelectorAll('.split-word-inner');
      loadTl.fromTo(words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03 },
        0.15
      );

      // Label + subheadline
      loadTl.fromTo([label, subhead],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.35
      );

      // Upload card
      loadTl.fromTo(uploadCard,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([portrait, headline, subhead, label, uploadCard], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(words, { opacity: 1, x: 0, y: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(portrait,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(uploadCard,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo([subhead, label],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = "YOUR AI GLOW UP STUDIO";
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#F6F7F9] z-10"
      style={{
        background: 'radial-gradient(circle at 62vw 45vh, rgba(233,236,239,0.85) 0%, rgba(246,247,249,0) 60%)'
      }}
    >
      {/* Left Content */}
      <div className="absolute left-[9vw] top-[20vh] w-[42vw]">
        {/* Micro Label */}
        <span
          ref={labelRef}
          className="font-label text-xs tracking-widest text-[#6B7280] uppercase mb-4 block"
        >
          AI MAKEOVER • 30 SECONDS
        </span>

        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <h1 className="font-display font-black text-[clamp(44px,6vw,96px)] leading-[0.95] tracking-[-0.02em] text-[#111827]">
            {words.map((word, i) => (
              <span key={i} className="split-word mr-[0.25em]">
                <span className="split-word-inner inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="font-body text-lg text-[#6B7280] max-w-[38vw] leading-relaxed mb-8"
        >
          Upload a selfie. Pick a vibe. Get a studio-grade beauty preview in seconds.
        </p>

        {/* Upload Card */}
        <div
          ref={uploadCardRef}
          className="w-[40vw] bg-white rounded-[24px] p-6 card-shadow"
        >
          <div className="border-2 border-dashed border-[rgba(0,0,0,0.1)] rounded-[16px] p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-4 text-[#6B7280]" />
            <p className="font-body text-[#6B7280] mb-4">
              Drop your photo or click to upload
            </p>
            <a href="/signup" className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#E11D48] to-[#F43F5E] shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 transition-all">
              Start free
            </a>
          </div>
          <p className="font-label text-xs text-[#9CA3AF] mt-4 text-center">
            JPG/PNG • Max 10MB • No account needed to preview
          </p>
        </div>
      </div>

      {/* Portrait Card (Right) */}
      <div
        ref={portraitRef}
        className="absolute left-[58vw] top-[14vh] w-[34vw] h-[72vh] image-card will-change-transform"
      >
        <img
          src="/images/hero_portrait.jpg"
          alt="Beauty portrait"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
