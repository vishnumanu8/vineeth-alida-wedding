import React, { useState, useEffect } from 'react';
import { Navigation, Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

export const FloatingControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlaying(state);
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none safe-bottom">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-pearl/90 hover:bg-pearl text-botanical border border-gold/40 shadow-lg flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-botanical" />
        </button>
      )}

      {/* Floating Directions Quick Pill (Mobile) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <a
          href={weddingConfig.reception.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-botanical text-pearl text-xs font-medium shadow-xl shadow-botanical/30 border border-gold/40 hover:bg-botanical-light transition-all md:hidden"
        >
          <Navigation className="w-3.5 h-3.5 text-gold" />
          <span>Directions</span>
        </a>

        {/* Audio Floating Toggle (Mobile) */}
        {weddingConfig.audio.enabled && (
          <button
            type="button"
            onClick={() => weddingAudio.toggle()}
            className="w-10 h-10 rounded-full bg-pearl/90 hover:bg-pearl text-botanical border border-gold/40 shadow-lg flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm md:hidden"
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-gold animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
