import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, ChevronDown, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  guestName?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  const { couple, reception } = weddingConfig;
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying);

  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync audio play/pause state
  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // =========================================================================
  // THE LIVING PORTRAIT: DESKTOP PARALLAX DEPTH & SCROLL TRIGGER
  // =========================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current || !imageRef.current) return;

      const isFinePointer = window.matchMedia('(pointer: fine)').matches;

      // Desktop smooth pointer parallax tilt
      if (isFinePointer) {
        const xTo = gsap.quickTo(imageRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
        const yTo = gsap.quickTo(imageRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
        const rotYTo = gsap.quickTo(imageRef.current, 'rotationY', { duration: 0.6, ease: 'power2.out' });
        const rotXTo = gsap.quickTo(imageRef.current, 'rotationX', { duration: 0.6, ease: 'power2.out' });

        const textXTo = contentRef.current
          ? gsap.quickTo(contentRef.current, 'x', { duration: 0.8, ease: 'power2.out' })
          : null;
        const textYTo = contentRef.current
          ? gsap.quickTo(contentRef.current, 'y', { duration: 0.8, ease: 'power2.out' })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          if (!heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
          const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

          xTo(normX * 16);
          yTo(normY * 16);
          rotYTo(normX * 2.5);
          rotXTo(-normY * 2.5);

          if (textXTo && textYTo) {
            textXTo(normX * -6);
            textYTo(normY * -6);
          }
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
          rotYTo(0);
          rotXTo(0);
          if (textXTo && textYTo) {
            textXTo(0);
            textYTo(0);
          }
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

  // ScrollTrigger for smooth hero depth on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current || !imageRef.current) return;

      gsap.to(imageRef.current, {
        scale: 1.12,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
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

  // =========================================================================
  // THE LIVING PORTRAIT: MOBILE TAP GOLDEN LIGHT SWEEP / SHIMMER
  // =========================================================================
  const triggerLivingPortraitShimmer = () => {
    if (!shimmerRef.current) return;
    gsap.killTweensOf(shimmerRef.current);
    gsap.fromTo(
      shimmerRef.current,
      { xPercent: -130, opacity: 0.9 },
      { xPercent: 130, opacity: 0, duration: 1.1, ease: 'power2.out' }
    );

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.03 },
        { scale: 1.065, duration: 0.35, yoyo: true, repeat: 1, ease: 'power1.inOut' }
      );
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggle();
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
      onClick={triggerLivingPortraitShimmer}
      className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-center p-5 sm:p-10 select-none overflow-hidden bg-[#0C1712] cursor-pointer"
      title="Tap the portrait for a golden blessing"
      aria-label="Vineeth & Alida Wedding Reception Hero"
    >
      {/* =======================================================================
          FEATURE B: THE LIVING PORTRAIT (FULL SCREEN PHOTOGRAPH)
          ======================================================================= */}
      <div
        style={{ perspective: '1000px' }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      >
        <img
          ref={imageRef}
          src={weddingConfig.photos.heroPortrait}
          alt="Vineeth & Alida"
          className="w-full h-full object-cover object-center scale-[1.04] filter brightness-[0.88] contrast-[1.03] will-change-transform"
          loading="eager"
          // @ts-expect-error - fetchpriority is standard in modern browsers
          fetchpriority="high"
        />

        {/* Ethereal Golden Light Shimmer Sweep on Tap */}
        <div
          ref={shimmerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full z-10 opacity-0 will-change-transform"
          style={{
            background:
              'linear-gradient(110deg, transparent 20%, rgba(240, 212, 158, 0.15) 45%, rgba(212, 163, 89, 0.45) 50%, rgba(240, 212, 158, 0.15) 55%, transparent 80%)',
          }}
        />

        {/* Subtle, restrained cinematic vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1712] via-[#0C1712]/20 to-[#0C1712]/50 pointer-events-none" />

        {/* Seamless bottom transition gradient into the pearl story section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#0C1712] pointer-events-none" />
      </div>

      {/* =======================================================================
          TOP BAR (UNOBTRUSIVE, MINIMAL AUDIO & GUEST GREETING)
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pt-2 sm:pt-4 pointer-events-auto">
        {/* Monogram */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-black/35 backdrop-blur-md flex items-center justify-center text-pearl font-display font-semibold text-xs shadow-sm">
            {couple.monogram}
          </div>
        </div>

        {/* Guest Greeting Pill (if personalized) */}
        {guestName ? (
          <div className="px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-gold/40 text-gold-shimmer text-xs font-medium tracking-wide shadow-sm">
            Cordially Welcoming {guestName}
          </div>
        ) : <div />}

        {/* Discreet Audio Control Button */}
        {weddingConfig.audio.enabled && (
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-botanical/90 text-pearl border-gold/60 shadow-sm'
                : 'bg-black/35 text-pearl/80 border-white/20 hover:border-gold/40'
            }`}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden sm:inline">Music</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* =======================================================================
          HERO ESSENTIALS: NAMES, LABEL & DATE ONLY (AS REQUESTED)
          ======================================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center my-auto px-4 pointer-events-none will-change-transform"
      >
        {/* Short wedding reception label */}
        <div className="flex items-center gap-3 mb-2.5">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-shimmer font-medium">
            The Wedding Reception
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Couple's Names */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight drop-shadow-md mb-3">
          {couple.groom.name}{' '}
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
            &amp;
          </span>{' '}
          {couple.bride.name}
        </h1>

        {/* Confirmed Date */}
        <p className="font-display italic text-base sm:text-xl text-pearl/90 tracking-wide drop-shadow-sm">
          {reception.formattedDate}
        </p>

        {/* Delicate hint for mobile tap */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gold-shimmer/60 tracking-wider font-sans sm:hidden">
          <Sparkles className="w-3 h-3 text-gold/60" />
          <span>Tap portrait for blessing</span>
        </div>
      </div>

      {/* =======================================================================
          SUBTLE ANIMATED SCROLL CUE
          ======================================================================= */}
      <div className="relative z-10 pb-3 sm:pb-5 flex flex-col items-center pointer-events-auto">
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
