import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface OpeningDoorsProps {
  onOpen?: () => void;
  onOpenStart?: () => void;
  onOpenComplete?: () => void;
  guestName?: string | null;
}

export const OpeningDoors: React.FC<OpeningDoorsProps> = ({
  onOpen,
  onOpenStart,
  onOpenComplete,
  guestName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const centerSeamRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Synchronize music: begin audio volume fade-in as doors open
    if (weddingConfig.audio.enabled) {
      weddingAudio.playWithFadeIn(2400, 0.65).catch(() => {});
    }

    onOpenStart?.();

    if (prefersReducedMotion.current) {
      // Gentle opacity fade for reduced motion users
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          setIsRemoved(true);
          onOpenComplete?.();
          onOpen?.();
        },
      });
      return;
    }

    // GSAP 3D Parting Door Timeline (~1.3s)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRemoved(true);
        onOpenComplete?.();
        onOpen?.();
      },
    });

    // 1. Central gold seam line flares with an antique gold highlight
    tl.to(
      centerSeamRef.current,
      {
        scaleX: 3.5,
        boxShadow: '0 0 30px rgba(240, 212, 158, 0.95), 0 0 10px #D4A359',
        duration: 0.25,
        ease: 'power2.out',
      },
      0
    );

    // 2. Minimal center monogram and text fade & soften
    tl.to(
      centerContentRef.current,
      {
        opacity: 0,
        scale: 0.92,
        duration: 0.35,
        ease: 'power2.in',
      },
      0.08
    );

    // 3. Left and Right emerald doors swing outward around outer hinges in 3D
    tl.to(
      leftDoorRef.current,
      {
        rotateY: -94,
        xPercent: -8,
        z: -120,
        opacity: 0,
        duration: 1.25,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.1
    );

    tl.to(
      rightDoorRef.current,
      {
        rotateY: 94,
        xPercent: 8,
        z: -120,
        opacity: 0,
        duration: 1.25,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.1
    );

    // 4. Subtle seam fade out
    tl.to(
      centerSeamRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      0.3
    );
  };

  if (isRemoved) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleEnter();
        }
      }}
      aria-label="Tap to open the wedding invitation of Vineeth and Alida"
      style={{
        perspective: '1300px',
        WebkitPerspective: '1300px',
      }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none bg-transparent h-[100dvh] w-full"
    >
      {/* =======================================================================
          LEFT EMERALD DOOR PANEL (Hinged on the left edge)
          ======================================================================= */}
      <div
        ref={leftDoorRef}
        style={{
          transformOrigin: 'left center',
          WebkitTransformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#07130E] via-[#0B1E16] to-[#10291F] border-r border-gold/40 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Ornate corner filigree */}
        <div className="absolute top-6 left-6 w-7 h-7 sm:w-8 sm:h-8 border-t border-l border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-7 h-7 sm:w-8 sm:h-8 border-b border-l border-gold/40 pointer-events-none" />
      </div>

      {/* =======================================================================
          RIGHT EMERALD DOOR PANEL (Hinged on the right edge)
          ======================================================================= */}
      <div
        ref={rightDoorRef}
        style={{
          transformOrigin: 'right center',
          WebkitTransformOrigin: 'right center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#07130E] via-[#0B1E16] to-[#10291F] border-l border-gold/40 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Ornate corner filigree */}
        <div className="absolute top-6 right-6 w-7 h-7 sm:w-8 sm:h-8 border-t border-r border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-7 h-7 sm:w-8 sm:h-8 border-b border-r border-gold/40 pointer-events-none" />
      </div>

      {/* =======================================================================
          CENTRAL GOLD SEAM LINE (The visual parting seam)
          ======================================================================= */}
      <div
        ref={centerSeamRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-gold-shimmer to-transparent pointer-events-none z-10 shadow-gold-glow will-change-transform"
      />

      {/* =======================================================================
          MINIMAL MOBILE-FIRST LAUNCH CONTENT
          Only monogram, warm greeting, and subtle "Tap to open" cue.
          No repeated dates, venue details or clutter.
          ======================================================================= */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 flex flex-col items-center justify-between py-12 sm:py-16 px-6 text-center z-20 pointer-events-none"
      >
        {/* Top spacer / subtle decorative flourish */}
        <div className="flex items-center gap-2 text-gold/60 pt-4">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
          <Sparkles className="w-3.5 h-3.5 text-gold/70" />
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Center: V&A Monogram & Short Greeting */}
        <div className="flex flex-col items-center my-auto">
          {/* Monogram Crest */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold/70 bg-[#0A1813]/90 backdrop-blur-md shadow-gold-glow flex items-center justify-center mb-5 sm:mb-6 ring-4 ring-gold/15">
            <span className="font-display font-medium text-2xl sm:text-3xl text-gold-shimmer tracking-widest pl-1">
              {weddingConfig.couple.monogram}
            </span>
          </div>

          {/* Short Warm Greeting */}
          <h2 className="font-display italic text-2xl sm:text-3xl font-light text-pearl tracking-wide mb-2 drop-shadow-sm">
            A celebration awaits
          </h2>

          <p className="text-xs sm:text-sm text-pearl-100/70 font-sans tracking-widest uppercase">
            {weddingConfig.couple.combinedNames}
          </p>

          {/* Personalized guest welcome if provided */}
          {guestName && (
            <div className="mt-4 px-4 py-1.5 rounded-full bg-pearl/10 border border-gold/40 text-pearl-100 text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm">
              Prepared for {guestName}
            </div>
          )}
        </div>

        {/* Bottom: Subtle "Tap to open" cue */}
        <div className="pb-4 flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-gold/50 text-gold-shimmer text-xs tracking-[0.25em] uppercase font-medium shadow-md backdrop-blur-md animate-pulse">
            <span className="text-[10px] text-gold/60">✦</span>
            <span className="text-[11px] font-sans">Tap to open</span>
            <span className="text-[10px] text-gold/60">✦</span>
          </div>
          <span className="text-[10px] text-pearl-100/40 tracking-wider">
            Touch anywhere to begin
          </span>
        </div>
      </div>
    </div>
  );
};
