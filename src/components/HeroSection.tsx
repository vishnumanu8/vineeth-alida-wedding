import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { AnimatedMonogram } from './AnimatedMonogram';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  guestName?: string | null;
  hasOpened?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName, hasOpened }) => {
  const { couple, reception } = weddingConfig;

  const heroRef = useRef<HTMLElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const labelLineRef = useRef<HTMLDivElement>(null);
  const namesLineRef = useRef<HTMLHeadingElement>(null);
  const dateLineRef = useRef<HTMLParagraphElement>(null);
  const venueLineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Smooth entrance of couple background image when doors open
  useEffect(() => {
    // If hasOpened is explicitly false (doors closed), wait until it becomes true
    if (hasOpened === false) return;

    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 0.45,
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
        }
      );
    }
  }, [hasOpened]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      // Synchronise couple background opacity with scrolling:
      // Fades to 0 smoothly as user scrolls away from hero, restores naturally when scrolling back
      if (bgContainerRef.current) {
        gsap.to(bgContainerRef.current, {
          opacity: 0,
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '85% top',
            scrub: true,
          },
        });
      }

      const tl = gsap.timeline({ delay: 0.3 });

      if (labelLineRef.current) {
        tl.from(labelLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        }, 0.2);
      }

      if (namesLineRef.current) {
        tl.from(namesLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
        }, 0.35);
      }

      if (dateLineRef.current) {
        tl.from(dateLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        }, 0.55);
      }

      if (venueLineRef.current) {
        tl.from(venueLineRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.75);
      }

      if (scrollCueRef.current) {
        tl.from(scrollCueRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.95);
      }

      // Smooth scroll-driven upward float & soft fade
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const triggerShimmer = () => {
    if (!shimmerRef.current) return;
    gsap.killTweensOf(shimmerRef.current);
    gsap.fromTo(
      shimmerRef.current,
      { xPercent: -130, opacity: 0.75 },
      { xPercent: 130, opacity: 0, duration: 1.2, ease: 'power2.out' }
    );
  };

  const scrollToInvitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById('invitation-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onClick={triggerShimmer}
      style={{
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
      }}
      className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center text-center px-4 sm:px-8 select-none overflow-hidden bg-transparent cursor-pointer pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      aria-label="Alida & Vineeth Wedding Reception Hero"
    >
      {/* =======================================================================
          COUPLE PHOTOGRAPHY BACKGROUND LAYER (SUBTLE, SCOPED TO HERO & FADES ON SCROLL)
          ======================================================================= */}
      <div
        ref={bgContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 will-change-[opacity,transform]"
      >
        <img
          ref={bgImageRef}
          src="/images/couple.jpg"
          alt="Alida & Vineeth"
          className="w-full h-full object-cover object-[center_25%] will-change-[opacity,transform] select-none opacity-0"
          loading="eager"
          // @ts-expect-error - fetchpriority is standard in modern browsers
          fetchpriority="high"
        />

        {/* Soft radial vignette keeping faces luminous while blending periphery into Midnight Sapphire */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 75% at 50% 35%, transparent 0%, rgba(11, 19, 37, 0.35) 60%, #0B1325 100%)',
          }}
        />

        {/* Bottom gradient smoothly melting into the subsequent section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0B1325] via-[#0B1325]/80 to-transparent pointer-events-none" />

        {/* Top gradient for status bar contrast */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0B1325]/75 to-transparent pointer-events-none" />
      </div>

      {/* =======================================================================
          LIVING INVITATION CANVAS: SHIMMER & CORNER ACCENTS
          ======================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Delicate golden sweep beam on tap */}
        <div
          ref={shimmerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full z-10 opacity-0 will-change-transform"
          style={{
            background:
              'linear-gradient(110deg, transparent 20%, rgba(240, 212, 158, 0.12) 45%, rgba(212, 163, 89, 0.35) 50%, rgba(240, 212, 158, 0.12) 55%, transparent 80%)',
          }}
        />

        {/* Outer ornate corner borders */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-gold/30 pointer-events-none" />
        <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-gold/30 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-gold/30 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-gold/30 pointer-events-none" />
      </div>

      {/* =======================================================================
          TOP BAR: MONOGRAM CREST & OPTIONAL GUEST GREETING PILL (CLEAN & MINIMAL)
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-auto shrink-0">
        <div className="w-8 h-8 rounded-full border border-gold/40 bg-black/40 backdrop-blur-md flex items-center justify-center text-pearl font-display font-medium text-xs shadow-md">
          {couple.monogram}
        </div>

        {guestName ? (
          <div className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-gold/40 text-gold-shimmer text-[11px] font-medium tracking-wide shadow-md">
            Cordially Welcoming {guestName}
          </div>
        ) : (
          <div />
        )}

        <div className="w-8" />
      </div>

      {/* =======================================================================
          MAIN HERO ESSENTIALS: ANIMATED MONOGRAM & KINETIC TYPOGRAPHY
          ======================================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center my-auto py-2 px-3 pointer-events-none will-change-transform"
      >
        {/* Animated Custom Gold Monogram SVG */}
        <div className="mb-1 sm:mb-2 scale-90 sm:scale-100">
          <AnimatedMonogram />
        </div>

        {/* Line 1: Refined Wedding Reception Label */}
        <div className="overflow-hidden mb-1 sm:mb-2">
          <div ref={labelLineRef} className="flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-[0.28em] text-gold-shimmer font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              The Wedding Reception
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Line 2: Prominent Couple Names */}
        <div className="overflow-hidden mb-1.5 sm:mb-2.5">
          <h1
            ref={namesLineRef}
            className="font-display text-[clamp(2.3rem,8vw,4.6rem)] font-light text-pearl tracking-tight leading-tight drop-shadow-[0_3px_14px_rgba(0,0,0,0.92)]"
          >
            {couple.bride.name}{' '}
            <span className="font-script text-2xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
              &amp;
            </span>{' '}
            {couple.groom.name}
          </h1>
        </div>

        {/* Line 3: Confirmed Date & Time */}
        <div className="overflow-hidden mb-2">
          <p
            ref={dateLineRef}
            className="font-display italic text-sm sm:text-xl text-pearl/95 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            {reception.formattedDate} • {reception.formattedTime}
          </p>
        </div>

        {/* Line 4: Venue Location Teaser */}
        <p
          ref={venueLineRef}
          className="text-[11px] sm:text-xs text-pearl-100/75 uppercase tracking-[0.2em] font-sans font-light"
        >
          {reception.venueName} • {reception.city}
        </p>
      </div>

      {/* =======================================================================
          ANIMATED SCROLL CUE
          ======================================================================= */}
      <div
        ref={scrollCueRef}
        className="relative z-10 pb-1 sm:pb-3 flex flex-col items-center pointer-events-auto shrink-0"
      >
        <button
          type="button"
          onClick={scrollToInvitation}
          className="flex flex-col items-center gap-1 text-pearl-100/75 hover:text-pearl transition-colors cursor-pointer group"
          aria-label="Scroll to read wedding invitation letter"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-gold-shimmer">
            Read Invitation Letter
          </span>
          <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
