import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mail } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface NavbarProps {
  onReopenCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReopenCard }) => {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlaying(state);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAudio = () => {
    weddingAudio.toggle();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-pearl/90 backdrop-blur-md border-b border-champagne-border/80 shadow-sm py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
          aria-label="Scroll to top"
        >
          <div className="w-8 h-8 rounded-full border border-gold/50 bg-champagne-light flex items-center justify-center text-botanical font-display font-semibold text-sm shadow-sm group-hover:border-gold transition-colors">
            {weddingConfig.couple.monogram}
          </div>
          <span className="font-display font-semibold text-base sm:text-lg text-botanical tracking-wide">
            {weddingConfig.couple.combinedNames}
          </span>
        </button>

        {/* Quick Nav Links (Visible on Tablet/Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-slate font-medium">
          <button
            onClick={() => scrollTo('couple')}
            className="hover:text-botanical transition-colors cursor-pointer"
          >
            The Couple
          </button>
          <button
            onClick={() => scrollTo('reception')}
            className="hover:text-botanical transition-colors cursor-pointer font-semibold text-botanical"
          >
            Reception Details
          </button>
          <button
            onClick={() => scrollTo('moments')}
            className="hover:text-botanical transition-colors cursor-pointer"
          >
            Moments
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="hover:text-botanical transition-colors cursor-pointer"
          >
            Send Wishes
          </button>
        </nav>

        {/* Controls: Reopen Card & Music */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Re-open Invitation Card */}
          <button
            type="button"
            onClick={onReopenCard}
            title="View Invitation Card"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne/70 hover:bg-champagne border border-gold/30 text-xs text-botanical font-medium transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">View Card</span>
          </button>

          {/* Music Control */}
          {weddingConfig.audio.enabled && (
            <button
              type="button"
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-botanical text-pearl border-botanical shadow-sm'
                  : 'bg-pearl text-slate border-champagne-border hover:border-gold/40'
              }`}
              title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
              aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
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
      </div>
    </header>
  );
};
