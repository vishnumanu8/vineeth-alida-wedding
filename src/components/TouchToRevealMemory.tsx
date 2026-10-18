import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ChevronsLeftRight } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface TouchToRevealMemoryProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const TouchToRevealMemory: React.FC<TouchToRevealMemoryProps> = ({
  beforeImage = weddingConfig.photos.moments[0]?.url || '/images/moment-1.jpg',
  afterImage = weddingConfig.photos.moments[1]?.url || '/images/moment-2.jpg',
  beforeLabel = 'The First Glance',
  afterLabel = 'Towards Forever',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Reveal Frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Drag handle left or right to reveal wedding memory"
        className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-wedding-lg border border-gold/40 cursor-ew-resize select-none touch-none focus:outline-none focus:ring-2 focus:ring-gold bg-[#0C1712]"
      >
        {/* Layer 1: After / Revealed Image (Base Layer) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            draggable={false}
          />
          {/* Subtle gradient banner for label */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-right pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-gold-shimmer font-semibold block">
              Chapter II
            </span>
            <p className="font-display text-base sm:text-lg font-medium text-pearl drop-shadow-sm">
              {afterLabel}
            </p>
          </div>
        </div>

        {/* Layer 2: Before Image (Clipped Layer) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            draggable={false}
          />
          {/* Subtle gradient banner for label */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-gold-shimmer font-semibold block">
              Chapter I
            </span>
            <p className="font-display text-base sm:text-lg font-medium text-pearl drop-shadow-sm">
              {beforeLabel}
            </p>
          </div>
        </div>

        {/* Gold Divider Seam Line */}
        <div
          className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-gold-shimmer to-transparent pointer-events-none z-10 shadow-gold-glow"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        />

        {/* Gold Circular Drag Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0C1712]/90 backdrop-blur-md border-2 border-gold shadow-gold-glow flex items-center justify-center transition-transform ${
            isDragging ? 'scale-110 shadow-lg' : 'hover:scale-105'
          }`}
          style={{ left: `${sliderPosition}%` }}
        >
          <ChevronsLeftRight className="w-4 h-4 text-gold-shimmer animate-pulse" />
        </div>
      </div>

      {/* Elegant Instruction Cue */}
      <div className="mt-3.5 flex items-center gap-2 text-slate/75 text-xs font-sans tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>Slide horizontally to reveal our journey</span>
      </div>
    </div>
  );
};
