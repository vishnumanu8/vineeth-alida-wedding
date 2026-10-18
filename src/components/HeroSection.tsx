import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface HeroSectionProps {
  guestName?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  const { couple, reception } = weddingConfig;
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggle();
  };

  const scrollToInvitation = () => {
    const el = document.getElementById('invitation-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-center p-5 sm:p-10 select-none overflow-hidden bg-[#0C1712]">
      {/* =======================================================================
          FULL-SCREEN COUPLE HERO PHOTOGRAPH
          Keeps the photograph prominent, romantic, and breathtaking
          ======================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={weddingConfig.photos.heroPortrait}
          alt="Vineeth & Alida"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.03]"
          loading="eager"
        />
        {/* Subtle, restrained cinematic vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1712]/90 via-[#0C1712]/20 to-[#0C1712]/50" />
      </div>

      {/* =======================================================================
          TOP BAR (UNOBTRUSIVE, MINIMAL AUDIO & GUEST GREETING)
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pt-2 sm:pt-4">
        {/* Monogram */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-black/25 backdrop-blur-md flex items-center justify-center text-pearl font-display font-semibold text-xs shadow-sm">
            {couple.monogram}
          </div>
        </div>

        {/* Guest Greeting Pill (if customized) */}
        {guestName ? (
          <div className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold-shimmer text-xs font-medium tracking-wide shadow-sm">
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
                ? 'bg-botanical/90 text-pearl border-gold/50 shadow-sm'
                : 'bg-black/30 text-pearl/80 border-white/20 hover:border-gold/40'
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
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center my-auto px-4">
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
      </div>

      {/* =======================================================================
          SUBTLE ANIMATED SCROLL CUE
          ======================================================================= */}
      <div className="relative z-10 pb-3 sm:pb-5 flex flex-col items-center">
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
