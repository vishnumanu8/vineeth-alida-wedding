import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  guestName?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  const { couple, reception } = weddingConfig;

  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const labelLineRef = useRef<HTMLDivElement>(null);
  const namesLineRef = useRef<HTMLHeadingElement>(null);
  const dateLineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // LINE-MASKED TYPOGRAPHY ENTRANCE & PARALLAX MOTION
  // =========================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      // Line-masked entrance sequence for hero typography
      const tl = gsap.timeline({ delay: 0.2 });

      if (labelLineRef.current) {
        tl.from(labelLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0);
      }

      if (namesLineRef.current) {
        tl.from(namesLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
        }, 0.15);
      }

      if (dateLineRef.current) {
        tl.from(dateLineRef.current, {
          yPercent: 120,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.35);
      }

      if (scrollCueRef.current) {
        tl.from(scrollCueRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.55);
      }

      // Parallax image movement into the next section
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.1,
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Subtle fade & upward shift of hero content on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '55% top',
            scrub: true,
          },
        });
      }

      // Desktop smooth pointer parallax
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      if (isFinePointer && imageRef.current) {
        const xTo = gsap.quickTo(imageRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
        const yTo = gsap.quickTo(imageRef.current, 'y', { duration: 0.6, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          if (!heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          xTo(normX * 14);
          yTo(normY * 14);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        const heroEl = heroRef.current;
        heroEl.addEventListener('mousemove', handleMouseMove);
        heroEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
          heroEl.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mobile touch shimmer interaction
  const triggerShimmer = () => {
    if (!shimmerRef.current) return;
    gsap.killTweensOf(shimmerRef.current);
    gsap.fromTo(
      shimmerRef.current,
      { xPercent: -130, opacity: 0.85 },
      { xPercent: 130, opacity: 0, duration: 1.15, ease: 'power2.out' }
    );
  };

  const scrollToInvitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById('invitation-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onClick={triggerShimmer}
      className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-center p-4 sm:p-8 select-none overflow-hidden bg-[#0C1712] cursor-pointer pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      aria-label="Vineeth & Alida Wedding Reception Hero"
    >
      {/* =======================================================================
          IMMERSIVE FULL-VIEWPORT COUPLE PHOTOGRAPHY
          Coupled with a restrained bottom gradient for crisp text legibility
          ======================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src={weddingConfig.photos.heroPortrait}
          alt="Vineeth & Alida"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02] will-change-transform"
          loading="eager"
          // @ts-expect-error - fetchpriority is standard in modern browsers
          fetchpriority="high"
        />

        {/* Delicate golden shimmer sweep beam on tap */}
        <div
          ref={shimmerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full z-10 opacity-0 will-change-transform"
          style={{
            background:
              'linear-gradient(110deg, transparent 20%, rgba(240, 212, 158, 0.15) 45%, rgba(212, 163, 89, 0.45) 50%, rgba(240, 212, 158, 0.15) 55%, transparent 80%)',
          }}
        />

        {/* Restrained bottom gradient only where needed behind text */}
        <div className="absolute bottom-0 inset-x-0 h-[50vh] bg-gradient-to-t from-[#0C1712]/95 via-[#0C1712]/45 to-transparent pointer-events-none" />

        {/* Subtle top edge shadow for status bar contrast */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* =======================================================================
          TOP BAR: REFINED MONOGRAM & OPTIONAL GUEST GREETING (ZERO UNNECESSARY FLOATING CONTROLS)
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Monogram Crest */}
        <div className="w-8 h-8 rounded-full border border-gold/40 bg-black/30 backdrop-blur-md flex items-center justify-center text-pearl font-display font-medium text-xs shadow-sm">
          {couple.monogram}
        </div>

        {/* Guest Greeting Pill (if customized via URL) */}
        {guestName ? (
          <div className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold-shimmer text-[11px] font-medium tracking-wide shadow-sm">
            Cordially Welcoming {guestName}
          </div>
        ) : <div />}

        <div className="w-8" />
      </div>

      {/* =======================================================================
          MAIN HERO ESSENTIALS: LINE-MASKED REVEAL
          Show ONLY: Reception Label, Vineeth & Alida, Confirmed Date, Scroll Cue
          ======================================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center my-auto px-4 pointer-events-none will-change-transform"
      >
        {/* Line 1: Refined Wedding Reception Label */}
        <div className="overflow-hidden mb-2 sm:mb-2.5">
          <div ref={labelLineRef} className="flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display text-[11px] sm:text-xs uppercase tracking-[0.28em] text-gold-shimmer font-medium">
              The Wedding Reception
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Line 2: Prominent Couple Names */}
        <div className="overflow-hidden mb-2 sm:mb-3">
          <h1
            ref={namesLineRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight drop-shadow-md"
          >
            {couple.groom.name}{' '}
            <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
              &amp;
            </span>{' '}
            {couple.bride.name}
          </h1>
        </div>

        {/* Line 3: Confirmed Date */}
        <div className="overflow-hidden">
          <p
            ref={dateLineRef}
            className="font-display italic text-base sm:text-xl text-pearl/90 tracking-wide drop-shadow-sm"
          >
            {reception.formattedDate}
          </p>
        </div>
      </div>

      {/* =======================================================================
          SUBTLE ANIMATED SCROLL CUE
          ======================================================================= */}
      <div
        ref={scrollCueRef}
        className="relative z-10 pb-2 sm:pb-3 flex flex-col items-center pointer-events-auto"
      >
        <button
          type="button"
          onClick={scrollToInvitation}
          className="flex flex-col items-center gap-1 text-pearl-100/75 hover:text-pearl transition-colors cursor-pointer group"
          aria-label="Scroll to explore invitation details"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-gold-shimmer">
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
