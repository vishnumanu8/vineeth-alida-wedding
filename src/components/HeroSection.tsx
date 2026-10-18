import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Plane, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface HeroSectionProps {
  guestName?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName }) => {
  const { couple, reception, family } = weddingConfig;
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

  const scrollToReception = () => {
    const el = document.getElementById('reception');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-center p-5 sm:p-10 select-none overflow-hidden bg-[#102019]">
      {/* =======================================================================
          FULL-SCREEN COUPLE HERO PHOTOGRAPH
          ======================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={weddingConfig.photos.heroPortrait}
          alt="Vineeth & Alida"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.04]"
          loading="eager"
        />
        {/* Cinematic Atmospheric Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1C16] via-[#0E1C16]/30 to-[#0E1C16]/65" />
      </div>

      {/* =======================================================================
          TOP BAR (NATURALLY INTEGRATED, NEVER FLOATING OVER CONTENT)
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pt-2 sm:pt-4">
        {/* Monogram */}
        <div className="flex items-center gap-2 text-left">
          <div className="w-8 h-8 rounded-full border border-gold/50 bg-black/30 backdrop-blur-md flex items-center justify-center text-pearl font-display font-semibold text-xs shadow-sm">
            {couple.monogram}
          </div>
          <span className="font-display font-medium text-sm sm:text-base text-pearl/90 tracking-wide hidden sm:inline">
            {couple.combinedNames}
          </span>
        </div>

        {/* Personalized Welcome or Family Greeting Tag */}
        <div className="text-center px-2">
          {guestName ? (
            <span className="inline-block px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold-shimmer text-[11px] sm:text-xs font-medium tracking-wide shadow-sm">
              Cordially Welcoming {guestName}
            </span>
          ) : (
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-pearl-100/70 font-medium">
              {family.invitationHeadline}
            </span>
          )}
        </div>

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
          HERO CENTERPIECE: NAMES & INVITATION MESSAGE
          ======================================================================= */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center my-auto px-4">
        {/* Subtle decorative gold line */}
        <div className="flex items-center gap-3 mb-2">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-shimmer">
            The Wedding Reception
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Couple's Names */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight drop-shadow-lg mb-3">
          {couple.groom.name}{' '}
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
            &amp;
          </span>{' '}
          {couple.bride.name}
        </h1>

        {/* Short, warm invitation note */}
        <p className="font-sans text-xs sm:text-sm text-pearl-100/85 max-w-md mx-auto leading-relaxed mb-4">
          {family.invitationMessage}
        </p>

        {/* Reception Date & Venue Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-gold/40 text-xs sm:text-sm text-pearl font-display tracking-wide shadow-md">
          <span>{reception.formattedDate}</span>
          <span className="text-gold">•</span>
          <span>{reception.formattedTime}</span>
          <span className="text-gold">•</span>
          <span>{reception.city}</span>
        </div>

        {/* Tasteful Dubai ✈ Kerala journey detail */}
        {couple.originJourney && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/15 text-[11px] text-pearl-100/80">
            <span className="font-medium">{couple.originJourney.from}</span>
            <div className="relative flex items-center justify-center text-gold">
              <span className="w-5 h-[1px] border-t border-gold/50" />
              <Plane className="w-3 h-3 text-gold mx-1 rotate-45 transform" />
              <span className="w-5 h-[1px] border-t border-gold/50" />
            </div>
            <span className="font-medium">{couple.originJourney.to}</span>
            <span className="text-pearl-100/60 hidden sm:inline pl-1">
              • {couple.originJourney.note}
            </span>
          </div>
        )}
      </div>

      {/* =======================================================================
          BOTTOM SCROLL PROMPT
          ======================================================================= */}
      <div className="relative z-10 pb-2 sm:pb-4 flex flex-col items-center">
        <button
          type="button"
          onClick={scrollToReception}
          className="flex flex-col items-center gap-1 text-pearl-100/80 hover:text-pearl transition-colors cursor-pointer group"
          aria-label="Scroll to Reception Details"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-gold-shimmer">
            Reception Details
          </span>
          <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
