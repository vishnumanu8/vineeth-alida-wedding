import React, { useRef, useState } from 'react';
import gsap from 'gsap';
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
  const centerEmblemRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Synchronize music: start volume fade-in immediately on user gesture
    if (weddingConfig.audio.enabled) {
      weddingAudio.playWithFadeIn(2200, 0.65).catch(() => {});
    }

    onOpenStart?.();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRemoved(true);
        onOpenComplete?.();
        onOpen?.();
      },
    });

    // 1. Center emblem and gold seam line smoothly fade and soften
    tl.to(
      [centerEmblemRef.current, centerSeamRef.current],
      {
        opacity: 0,
        scale: 0.94,
        duration: 0.45,
        ease: 'power2.out',
      },
      0
    );

    // 2. Left and Right emerald doors swing open in 3D perspective around their outer hinges
    tl.to(
      leftDoorRef.current,
      {
        rotateY: -92,
        xPercent: -12,
        z: -100,
        opacity: 0,
        duration: 1.25,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.05
    );

    tl.to(
      rightDoorRef.current,
      {
        rotateY: 92,
        xPercent: 12,
        z: -100,
        opacity: 0,
        duration: 1.25,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.05
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
      aria-label="Tap to enter wedding invitation"
      style={{
        perspective: '1400px',
        WebkitPerspective: '1400px',
      }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none bg-transparent"
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
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#08140F] via-[#0D1F18] to-[#12281F] border-r border-gold/45 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Ornate corner filigree */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/40 pointer-events-none" />
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
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#08140F] via-[#0D1F18] to-[#12281F] border-l border-gold/45 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Ornate corner filigree */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/40 pointer-events-none" />
      </div>

      {/* =======================================================================
          CENTRAL GOLD SEAM LINE
          ======================================================================= */}
      <div
        ref={centerSeamRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-gold-shimmer to-transparent pointer-events-none z-10 shadow-gold-glow"
      />

      {/* =======================================================================
          CENTER SEAM EMBLEM & TYPOGRAPHY
          ======================================================================= */}
      <div
        ref={centerEmblemRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-20"
      >
        {/* Monogram Crest */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold/70 bg-[#0E1F18]/95 shadow-gold-glow flex items-center justify-center mb-4 sm:mb-5">
          <span className="font-display font-semibold text-lg sm:text-xl text-gold-shimmer tracking-widest pl-1">
            {weddingConfig.couple.monogram}
          </span>
        </div>

        {/* Tracked uppercase label */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-pearl-100/70 font-medium mb-1.5 sm:mb-2">
          The Wedding Reception of
        </p>

        {/* Couple Names */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight mb-2 drop-shadow-md">
          {weddingConfig.couple.groom.name}{' '}
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
            &amp;
          </span>{' '}
          {weddingConfig.couple.bride.name}
        </h1>

        {/* Confirmed Date */}
        <p className="font-display italic text-sm sm:text-base text-pearl/85 tracking-wide max-w-sm mb-5 sm:mb-6">
          {weddingConfig.reception.formattedDate}
        </p>

        {/* Guest Personalization Pill */}
        {guestName && (
          <div className="mb-6 px-4 py-1.5 rounded-full bg-pearl/10 border border-gold/40 text-pearl-100 text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm">
            Prepared for {guestName}
          </div>
        )}

        {/* Minimal "Tap to enter" cue */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gold/45 text-gold-shimmer text-xs tracking-[0.2em] uppercase font-medium shadow-md backdrop-blur-md animate-pulse">
          <span className="text-[10px]">⟨</span>
          <span className="text-[11px] font-sans">Tap to enter</span>
          <span className="text-[10px]">⟩</span>
        </div>
      </div>
    </div>
  );
};
