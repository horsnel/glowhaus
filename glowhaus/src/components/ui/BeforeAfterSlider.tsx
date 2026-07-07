
import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage,
  className 
}: BeforeAfterSliderProps) {
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

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden cursor-ew-resive select-none',
        'shadow-[var(--shadow-elevated)]',
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div 
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-12 h-12 rounded-full bg-white shadow-lg',
            'flex items-center justify-center',
            'transition-shadow duration-200',
            isDragging && 'shadow-[var(--glow-medium)]'
          )}
        >
          <MoveHorizontal className="w-5 h-5 text-[var(--text-primary)]" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
        <span className="text-sm font-medium text-white">Before</span>
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#E11D48]/80 backdrop-blur-sm rounded-full">
        <span className="text-sm font-medium text-white">After</span>
      </div>
    </div>
  );
}
