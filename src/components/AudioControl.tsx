import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface AudioControlProps {
  visible?: boolean;
}

export const AudioControl: React.FC<AudioControlProps> = ({ visible = true }) => {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!weddingConfig.audio.enabled || !visible) return null;

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggle();
  };

  return (
    <div
      className="fixed bottom-5 right-4 sm:right-6 z-40 select-none pointer-events-auto"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      <button
        type="button"
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-[#091711]/90 text-pearl border-gold/60 shadow-gold-glow'
            : 'bg-black/45 text-pearl/70 border-white/20 hover:border-gold/40'
        }`}
        title={isPlaying ? 'Pause celebration music' : 'Play celebration music'}
        aria-label={isPlaying ? 'Pause celebration music' : 'Play celebration music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-gold" />
            {/* Lightweight CSS transform animated musical wave symbol */}
            <span className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
              <span className="w-0.5 bg-gold rounded-full animate-bounce h-2" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
              <span className="w-0.5 bg-gold rounded-full animate-bounce h-3.5" style={{ animationDelay: '200ms', animationDuration: '0.8s' }} />
              <span className="w-0.5 bg-gold rounded-full animate-bounce h-1.5" style={{ animationDelay: '400ms', animationDuration: '0.8s' }} />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-pearl/60" />
            <span className="text-[10px] font-medium tracking-wider uppercase text-pearl/60 hidden sm:inline">
              Music
            </span>
          </>
        )}
      </button>
    </div>
  );
};
