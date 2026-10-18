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
  const mistCenterRef = useRef<HTMLDivElement>(null);
  const mistLeftRef = useRef<HTMLDivElement>(null);
  const mistRightRef = useRef<HTMLDivElement>(null);
  const motesContainerRef = useRef<HTMLDivElement>(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Prevent background scrolling / rubberbanding while launch screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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
      weddingAudio.playWithFadeIn(2600, 0.65).catch(() => {});
    }

    onOpenStart?.();

    if (prefersReducedMotion.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => {
          document.body.style.overflow = '';
          setIsRemoved(true);
          onOpenComplete?.();
          onOpen?.();
        },
      });
      return;
    }

    // GSAP 3D Estate Door Parting & Atmospheric Mist Reveal Timeline (~1.95s)
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsRemoved(true);
        onOpenComplete?.();
        onOpen?.();
      },
    });

    // 1. Center seam line flares with radiant champagne gold glow (0.0s - 0.28s)
    tl.fromTo(
      centerSeamRef.current,
      { opacity: 0, scaleY: 0.15, scaleX: 1 },
      {
        opacity: 1,
        scaleY: 1,
        scaleX: 2.8,
        boxShadow: '0 0 32px rgba(240, 212, 158, 0.98), 0 0 14px #D4A359',
        duration: 0.28,
        ease: 'power2.out',
      },
      0
    );

    // 2. Aperture typography gently dissolves
    tl.to(
      apertureContentRef.current,
      {
        opacity: 0,
        scale: 0.96,
        duration: 0.38,
        ease: 'power2.in',
      },
      0.04
    );

    // 3. VISIBLY PERCEPTIBLE MIST REVEAL (Warm Ivory & Champagne Cloud Layers)
    // A. Center luminous mist blooming from the parting seam
    if (mistCenterRef.current) {
      tl.fromTo(
        mistCenterRef.current,
        { opacity: 0, scaleX: 0.2, scaleY: 0.7 },
        {
          opacity: 0.95,
          scaleX: 1.15,
          scaleY: 1.05,
          duration: 0.55,
          ease: 'power2.out',
        },
        0.1
      );
      tl.to(
        mistCenterRef.current,
        {
          opacity: 0,
          scaleX: 1.45,
          scaleY: 1.25,
          duration: 0.95,
          ease: 'power2.inOut',
        },
        0.65
      );
    }

    // B. Left billow drifting outward
    if (mistLeftRef.current) {
      tl.fromTo(
        mistLeftRef.current,
        { opacity: 0, x: 20, scale: 0.5 },
        {
          opacity: 0.88,
          x: -60,
          scale: 1.25,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.15
      );
      tl.to(
        mistLeftRef.current,
        {
          opacity: 0,
          x: -120,
          scale: 1.5,
          duration: 0.9,
          ease: 'power2.inOut',
        },
        0.75
      );
    }

    // C. Right billow drifting outward
    if (mistRightRef.current) {
      tl.fromTo(
        mistRightRef.current,
        { opacity: 0, x: -20, scale: 0.5 },
        {
          opacity: 0.88,
          x: 60,
          scale: 1.25,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.15
      );
      tl.to(
        mistRightRef.current,
        {
          opacity: 0,
          x: 120,
          scale: 1.5,
          duration: 0.9,
          ease: 'power2.inOut',
        },
        0.75
      );
    }

    // 4. CHAMPAGNE-GOLD LIGHT MOTES & TRANSLUCENT BUBBLES FLOATING UPWARD
    if (motesContainerRef.current) {
      tl.to(motesContainerRef.current, { opacity: 1, duration: 0.2 }, 0.1);
      const motes = motesContainerRef.current.querySelectorAll('.mote-particle');
      motes.forEach((mote, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const xDist = 30 + (i % 5) * 22;
        const yFloat = -70 - (i % 4) * 25;
        tl.to(
          mote,
          {
            x: direction * xDist,
            y: yFloat,
            opacity: 0,
            scale: 1.6,
            duration: 1.35,
            ease: 'power2.out',
          },
          0.15 + (i * 0.03)
        );
      });
    }

    // 5. SLOWER, MAJESTIC 3D ESTATE DOOR PARTING WITH PHYSICAL SETTLING (1.75s)
    // Left Door 3D swing
    tl.to(
      leftDoorRef.current,
      {
        rotateY: -96,
        xPercent: -12,
        z: -80,
        duration: 1.75,
        ease: 'power2.inOut',
        force3D: true,
      },
      0.18
    );

    // Right Door 3D swing
    tl.to(
      rightDoorRef.current,
      {
        rotateY: 96,
        xPercent: 12,
        z: -80,
        duration: 1.75,
        ease: 'power2.inOut',
        force3D: true,
      },
      0.18
    );

    // Keep doors fully visible during swing, then smoothly dissolve in final phase
    tl.to(
      [leftDoorRef.current, rightDoorRef.current],
      {
        opacity: 0,
        duration: 0.62,
        ease: 'power2.in',
      },
      1.32
    );

    // 6. Center seam line smoothly dissolves
    tl.to(
      centerSeamRef.current,
      {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      },
      0.4
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
        touchAction: 'none',
      }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none w-screen h-screen min-h-[100dvh]"
    >
      {/* =======================================================================
          WARM IVORY & CHAMPAGNE MIST VEIL LAYERS (Visibly perceptible atmospheric reveal)
          ======================================================================= */}
      {/* A. Center Seam Ivory Bloom */}
      <div
        ref={mistCenterRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 opacity-0 will-change-[opacity,transform]"
        style={{
          background:
            'radial-gradient(ellipse 65% 85% at 50% 50%, rgba(255, 252, 245, 0.95) 0%, rgba(248, 238, 218, 0.85) 35%, rgba(212, 163, 89, 0.45) 70%, transparent 100%)',
        }}
      />

      {/* B. Left Billowing Ivory Mist Cloud */}
      <div
        ref={mistLeftRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 opacity-0 will-change-[opacity,transform]"
        style={{
          background:
            'radial-gradient(ellipse 75% 90% at 35% 50%, rgba(255, 250, 240, 0.88) 0%, rgba(245, 230, 205, 0.6) 45%, rgba(212, 163, 89, 0.25) 75%, transparent 100%)',
        }}
      />

      {/* C. Right Billowing Ivory Mist Cloud */}
      <div
        ref={mistRightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 opacity-0 will-change-[opacity,transform]"
        style={{
          background:
            'radial-gradient(ellipse 75% 90% at 65% 50%, rgba(255, 250, 240, 0.88) 0%, rgba(245, 230, 205, 0.6) 45%, rgba(212, 163, 89, 0.25) 75%, transparent 100%)',
        }}
      />

      {/* =======================================================================
          CHAMPAGNE-GOLD LIGHT MOTES & TRANSLUCENT BOKEH BUBBLES
          Floating gently upward and outward on door parting
          ======================================================================= */}
      <div
        ref={motesContainerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-25 overflow-hidden opacity-0"
      >
        {/* 6 Sparkling Light Points */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="mote-particle absolute rounded-full bg-[#FFF5DE] shadow-[0_0_12px_#F0D49E,0_0_5px_#D4A359]"
            style={{
              width: `${3.5 + (i % 3) * 1.5}px`,
              height: `${3.5 + (i % 3) * 1.5}px`,
              left: `${46 + (i % 4) * 2.8}%`,
              top: `${30 + i * 8}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* 6 Soft Champagne Translucent Bokeh Bubbles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="mote-particle absolute rounded-full border border-gold/40"
            style={{
              width: `${12 + (i % 3) * 6}px`,
              height: `${12 + (i % 3) * 6}px`,
              left: `${44 + ((i * 3) % 13)}%`,
              top: `${26 + i * 9}%`,
              background:
                'radial-gradient(circle at 35% 35%, rgba(255, 248, 232, 0.8) 0%, rgba(240, 212, 158, 0.35) 55%, transparent 100%)',
              boxShadow: '0 0 10px rgba(240, 212, 158, 0.45)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* =======================================================================
          LEFT EMERALD APERTURE PANEL (Hinged on the left edge)
          Slightly oversized by 1px and 10px top/bottom to prevent subpixel leaks
          ======================================================================= */}
      <div
        ref={leftDoorRef}
        style={{
          transformOrigin: 'left center',
          WebkitTransformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute -top-[10px] -bottom-[10px] left-0 w-[calc(50%+1px)] bg-gradient-to-r from-[#05100B] via-[#091C14] to-[#0E281D] border-r border-gold/30 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Restrained corner filigree */}
        <div className="absolute top-8 left-6 w-6 h-6 border-t border-l border-gold/30 pointer-events-none" />
        <div className="absolute bottom-8 left-6 w-6 h-6 border-b border-l border-gold/30 pointer-events-none" />
      </div>

      {/* =======================================================================
          RIGHT EMERALD APERTURE PANEL (Hinged on the right edge)
          Slightly oversized by 1px and 10px top/bottom to prevent subpixel leaks
          ======================================================================= */}
      <div
        ref={rightDoorRef}
        style={{
          transformOrigin: 'right center',
          WebkitTransformOrigin: 'right center',
          transformStyle: 'preserve-3d',
        }}
        className="absolute -top-[10px] -bottom-[10px] right-0 w-[calc(50%+1px)] bg-gradient-to-l from-[#05100B] via-[#091C14] to-[#0E281D] border-l border-gold/30 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Restrained corner filigree */}
        <div className="absolute top-8 right-6 w-6 h-6 border-t border-r border-gold/30 pointer-events-none" />
        <div className="absolute bottom-8 right-6 w-6 h-6 border-b border-r border-gold/30 pointer-events-none" />
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
        className="absolute inset-0 flex flex-col items-center justify-between pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.75rem,env(safe-area-inset-bottom))] px-6 text-center z-20 pointer-events-none"
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
