import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const styles = [
  { name: 'Soft Glam', image: '/images/style_soft_glam.jpg', href: '/style/soft-glam' },
  { name: 'Clean Girl', image: '/images/style_clean_girl.jpg', href: '/style/clean-girl' },
  { name: 'Y2K', image: '/images/style_y2k.jpg', href: '/style/y2k' },
  { name: 'Editorial', image: '/images/style_editorial.jpg', href: '/style/editorial' },
  { name: 'Night Out', image: '/images/style_night_out.jpg', href: '/style/night-out' },
  { name: 'Glass Skin', image: '/images/style_glass_skin.jpg', href: '/style/glass-skin' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const strip = stripRef.current;

    if (!section || !headline || !strip) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(headline,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(strip,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(strip,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#F6F7F9] z-40"
    >
      {/* Left Headline Block */}
      <div
        ref={headlineRef}
        className="absolute left-[9vw] top-[30vh] w-[30vw] will-change-transform"
      >
        <h2 className="font-display font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-[#111827] mb-6">
          CHOOSE<br />YOUR<br />VIBE
        </h2>
        <p className="font-body text-lg text-[#6B7280] mb-8 max-w-[26vw]">
          From clean girl to night out—explore looks made for your mood.
        </p>
        <a 
          href="/styles"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border border-[rgba(0,0,0,0.1)] text-[#1F2937] hover:border-[#E11D48] hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] group"
        >
          Browse all styles
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Style Strip */}
      <div
        ref={stripRef}
        className="absolute left-[44vw] top-[18vh] w-[52vw] h-[64vh] will-change-transform"
      >
        <div className="flex gap-4 overflow-x-auto h-full pb-4 scrollbar-hide">
          {styles.map((style, i) => (
            <a
              key={i}
              href={style.href}
              className="flex-shrink-0 w-[22vw] h-[56vh] rounded-[24px] overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="relative w-full h-full">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full font-label font-medium text-sm text-[#111827]">
                    {style.name}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
