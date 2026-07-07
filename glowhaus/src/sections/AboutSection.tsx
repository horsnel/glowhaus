import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!section || !text || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        image,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flowing-section bg-[#F6F7F9] z-[120] py-[12vh]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div ref={textRef}>
            <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-[#111827] mb-6">
              Why we built GlowHaus
            </h2>
            <div className="space-y-4 mb-8">
              <p className="font-body text-lg text-[#6B7280] leading-relaxed">
                We wanted a safe, fast way to try new looks—without the salon
                commitment. GlowHaus is designed to help you explore, express,
                and share your style with confidence.
              </p>
              <p className="font-body text-lg text-[#6B7280] leading-relaxed">
                Our AI-powered platform uses cutting-edge technology to generate
                realistic beauty previews while keeping your data private and
                secure.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-label font-medium text-sm text-[#E11D48] hover:underline"
            >
              Read our story
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="image-card h-[400px] lg:h-[500px]"
          >
            <img
              src="/images/about_image.jpg"
              alt="Our team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
