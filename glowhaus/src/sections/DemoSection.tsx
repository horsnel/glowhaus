import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const beforeLabelRef = useRef<HTMLSpanElement>(null);
  const afterLabelRef = useRef<HTMLSpanElement>(null);
  const microcopyRef = useRef<HTMLSpanElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const beforeLabel = beforeLabelRef.current;
    const afterLabel = afterLabelRef.current;
    const microcopy = microcopyRef.current;

    if (!section || !card || !beforeLabel || !afterLabel || !microcopy) return;

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
      scrollTl.fromTo(card,
        { x: '50vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(beforeLabel,
        { x: '-4vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(afterLabel,
        { x: '4vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(microcopy,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo([beforeLabel, afterLabel],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(microcopy,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-[#E9ECEF] z-30"
    >
      {/* Before Label */}
      <span
        ref={beforeLabelRef}
        className="absolute left-[6vw] top-[46vh] font-display font-bold text-sm tracking-widest text-[#9CA3AF] uppercase will-change-transform"
      >
        BEFORE
      </span>

      {/* After Label */}
      <span
        ref={afterLabelRef}
        className="absolute right-[6vw] top-[46vh] font-display font-bold text-sm tracking-widest text-[#9CA3AF] uppercase will-change-transform"
      >
        AFTER
      </span>

      {/* Microcopy */}
      <span
        ref={microcopyRef}
        className="absolute right-[6vw] top-[20vh] font-label text-sm text-[#6B7280] will-change-transform"
      >
        Drag to compare • AI-generated preview
      </span>

      {/* Before/After Card */}
      <div
        ref={cardRef}
        className="absolute left-[18vw] top-[16vh] w-[64vw] h-[68vh] bg-white rounded-[28px] overflow-hidden card-shadow will-change-transform"
      >
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* After Image (full) */}
          <div className="absolute inset-0">
            <img
              src="/images/demo_after.jpg"
              alt="After transformation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Before Image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="/images/demo_before.jpg"
              alt="Before transformation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5 text-[#111827]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
