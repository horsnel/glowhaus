import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Product: ['Styles', 'How it works', 'Community', 'Pricing'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Support: ['Help Center', 'Privacy', 'Terms', 'Cookies'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;

    if (!footer || !logo || !links) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logo,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logo,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      links.querySelectorAll('.link-column').forEach((col) => {
        gsap.fromTo(
          col,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: col,
              start: 'top 90%',
              end: 'top 65%',
              scrub: true,
            },
          }
        );
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="flowing-section bg-[#F6F7F9] z-[130] py-[8vh] border-t border-[rgba(0,0,0,0.06)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo (text only — matches original glowhaus-2vc design) */}
        <div ref={logoRef} className="text-center mb-12">
          <span className="font-display font-black text-4xl text-[#111827]">
            GlowHaus
          </span>
        </div>

        {/* Link Columns */}
        <div
          ref={linksRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category} className="link-column">
              <h4 className="font-label font-semibold text-sm text-[#111827] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-sm text-[#6B7280] hover:text-[#E11D48] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[rgba(0,0,0,0.06)]">
          <p className="font-label text-xs text-[#9CA3AF] mb-4 md:mb-0">
            © 2026 GlowHaus. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-colors text-[#6B7280]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-colors text-[#6B7280]"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-colors text-[#6B7280]"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
