import React, { useRef, useState, useEffect } from 'react';
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
  const apertureContentRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const motesContainerRef = useRef<HTMLDivElement>(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Reduced motion preference
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio volume fade-in synchronised with reveal
    if (weddingConfig.audio.enabled) {
      weddingAudio.playWithFadeIn(2400, 0.65).catch(() => {});
    }

    onOpenStart?.();

    if (prefersReducedMotion.current) {
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

    // GSAP 3D Door Parting & Mist-and-Light Reveal Timeline (~1.35s)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRemoved(true);
        onOpenComplete?.();
        onOpen?.();
      },
    });

    // 1. Center seam line appears and flares as the physical parting mechanism
    tl.fromTo(
      centerSeamRef.current,
      { opacity: 0, scaleY: 0.2, scaleX: 1 },
      {
        opacity: 1,
        scaleY: 1,
        scaleX: 2.5,
        boxShadow: '0 0 24px rgba(240, 212, 158, 0.95), 0 0 10px #D4A359',
        duration: 0.25,
        ease: 'power2.out',
      },
      0
    );

    // 2. Aperture typography gently dissolves
    tl.to(
      apertureContentRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.in',
      },
      0.05
    );

    // 3. Delicate veil of warm ivory mist billows outward from the center seam
    if (mistRef.current) {
      tl.fromTo(
        mistRef.current,
        { opacity: 0, scaleX: 0.15, scaleY: 0.8 },
        {
          opacity: 0.85,
          scaleX: 1.15,
          scaleY: 1.05,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.08
      );
      // Mist smoothly dissolves completely as doors open
      tl.to(
        mistRef.current,
        {
          opacity: 0,
          scale: 1.35,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0.48
      );
    }

    // 4. Subtle champagne-gold light motes drift outward and fade
    if (motesContainerRef.current) {
      tl.to(motesContainerRef.current, { opacity: 1, duration: 0.15 }, 0.08);
      const motes = motesContainerRef.current.querySelectorAll('.mote-particle');
      motes.forEach((mote, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const xDist = 40 + i * 20;
        const yDist = (i - 2.5) * 35;
        tl.to(
          mote,
          {
            x: direction * xDist,
            y: yDist,
            opacity: 0,
            scale: 1.5,
            duration: 1.05,
            ease: 'power2.out',
          },
          0.12
        );
      });
    }

    // 5. Left and Right emerald panels swing open along outer hinges in 3D
    tl.to(
      leftDoorRef.current,
      {
        rotateY: -92,
        xPercent: -8,
        z: -120,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.1
    );

    tl.to(
      rightDoorRef.current,
      {
        rotateY: 92,
        xPercent: 8,
        z: -120,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.inOut',
        force3D: true,
      },
      0.1
    );

    // 6. Center seam smoothly fades out
    tl.to(
      centerSeamRef.current,
      {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      },
      0.35
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
      aria-label="Tap anywhere to open Vineeth & Alida's wedding invitation"
      style={{
        perspective: '1400px',
        WebkitPerspective: '1400px',
      }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none bg-transparent h-[100dvh] w-full"
    >
      {/* =======================================================================
          WARM IVORY MIST VEIL (Emerges from center seam and dissolves completely)
          ======================================================================= */}
      <div
        ref={mistRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 opacity-0 will-change-[opacity,transform]"
        style={{
          background:
            'radial-gradient(ellipse 65% 85% at 50% 50%, rgba(254, 250, 242, 0.9) 0%, rgba(245, 235, 220, 0.5) 45%, rgba(212, 163, 89, 0.18) 75%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* =======================================================================
          CHAMPAGNE-GOLD LIGHT MOTES (Drift outward gently on parting)
          ======================================================================= */}
      <div
        ref={motesContainerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 overflow-hidden opacity-0"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="mote-particle absolute rounded-full bg-[#F5E2B8] shadow-[0_0_8px_#D4A359]"
            style={{
              width: `${3 + (i % 3) * 1.5}px`,
              height: `${3 + (i % 3) * 1.5}px`,
              left: '50%',
              top: `${32 + i * 7}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* =======================================================================
          LEFT EMERALD APERTURE PANEL (Hinged on the left edge)
          ======================================================================= */}
      <div
        ref={leftDoorRef}
        style={{
          transformOrigin: 'left center',
          WebkitTransformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#05100B] via-[#091C14] to-[#0E281D] border-r border-gold/30 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Restrained corner filigree */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-gold/30 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-gold/30 pointer-events-none" />
      </div>

      {/* =======================================================================
          RIGHT EMERALD APERTURE PANEL (Hinged on the right edge)
          ======================================================================= */}
      <div
        ref={rightDoorRef}
        style={{
          transformOrigin: 'right center',
          WebkitTransformOrigin: 'right center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#05100B] via-[#091C14] to-[#0E281D] border-l border-gold/30 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Restrained corner filigree */}
        <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-gold/30 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-gold/30 pointer-events-none" />
      </div>

      {/* =======================================================================
          CENTRAL GOLD SEAM (Part of the opening mechanism, invisible until tap)
          Never intersects or runs behind the text!
          ======================================================================= */}
      <div
        ref={centerSeamRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-gold-shimmer to-transparent pointer-events-none z-30 opacity-0 will-change-transform"
      />

      {/* =======================================================================
          THE EMERALD APERTURE: MINIMAL, BESPOKE LAUNCH CONTENT
          - Custom SVG V&A ligature on ONE single line (immune to text wrapping)
          - "A celebration awaits"
          - Subtle "Tap to open" cue
          - Zero repeated dates, venues, or duplicate text
          ======================================================================= */}
      <div
        ref={apertureContentRef}
        className="absolute inset-0 flex flex-col items-center justify-between py-12 sm:py-16 px-6 text-center z-20 pointer-events-none"
      >
        {/* Top subtle emblem */}
        <div className="pt-2 flex items-center justify-center gap-3 text-gold/40">
          <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold/60 font-light">
            Reception Invitation
          </span>
          <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Center: Bespoke V&A SVG Ligature & Minimal Greeting */}
        <div className="flex flex-col items-center my-auto px-4 max-w-xs">
          {/* Custom V&A SVG Ligature - Aligned on one line, zero wrapping */}
          <div className="mb-4">
            <svg
              viewBox="0 0 120 40"
              className="w-28 sm:w-32 h-auto mx-auto overflow-visible drop-shadow-md"
              aria-label="V and A Monogram"
            >
              <text
                x="60"
                y="28"
                textAnchor="middle"
                className="font-display font-medium fill-gold-shimmer select-none"
                style={{ fontSize: '26px', letterSpacing: '0.18em' }}
              >
                V<tspan className="font-script text-[22px] fill-gold" dx="2" dy="-2">&amp;</tspan><tspan dx="2">A</tspan>
              </text>
              {/* Delicate ornamental curve below */}
              <path
                d="M 28 36 Q 60 40 92 36"
                stroke="url(#apertureGoldLine)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="apertureGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C89D54" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F0D49E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C89D54" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Minimal Poetic Greeting */}
          <h2 className="font-display italic text-2xl sm:text-3xl font-light text-pearl tracking-wide drop-shadow-sm mb-1.5">
            A celebration awaits
          </h2>

          <p className="text-[11px] sm:text-xs text-pearl-100/60 font-sans tracking-[0.2em] uppercase font-light">
            Vineeth &amp; Alida
          </p>

          {/* Guest Personalization if provided via URL */}
          {guestName && (
            <div className="mt-4 px-3.5 py-1 rounded-full bg-pearl/10 border border-gold/30 text-pearl-100 text-[11px] font-medium tracking-wide shadow-sm backdrop-blur-sm">
              Prepared for {guestName}
            </div>
          )}
        </div>

        {/* Bottom: Subtle "Tap to open" cue */}
        <div className="pb-4 flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-gold/40 text-gold-shimmer text-[11px] tracking-[0.25em] uppercase font-medium shadow-md backdrop-blur-md animate-pulse">
            <span className="text-[9px] text-gold/60">✦</span>
            <span className="font-sans">Tap to open</span>
            <span className="text-[9px] text-gold/60">✦</span>
          </div>
        </div>
      </div>
    </div>
  );
};
