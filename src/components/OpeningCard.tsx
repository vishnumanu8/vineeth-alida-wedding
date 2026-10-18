import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface OpeningCardProps {
  onOpen: (withAudio: boolean) => void;
  guestName?: string | null;
}

export const OpeningCard: React.FC<OpeningCardProps> = ({ onOpen, guestName }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [playAudioWithOpen, setPlayAudioWithOpen] = useState(true);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (playAudioWithOpen && weddingConfig.audio.enabled) {
      weddingAudio.play().catch(() => {
        // Safe fallback
      });
    }

    // Smooth transition time
    setTimeout(() => {
      onOpen(playAudioWithOpen);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1C332A] via-[#244438] to-[#172B23] p-4 sm:p-6 overflow-hidden select-none safe-top safe-bottom">
      {/* Subtle background ambient golden dust / stars */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-peacock/20 blur-3xl animate-pulse" />
      </div>

      {/* Main Invitation Card Container — Responsive and strictly fitted to mobile viewport (max-h 100dvh) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col items-center justify-between py-6 px-5 sm:px-8 rounded-3xl bg-pearl border border-gold/40 shadow-2xl shadow-black/40 overflow-hidden text-center max-h-[92dvh]"
      >
        {/* Subtle Luxury Corner Ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60 rounded-br-lg pointer-events-none" />

        {/* Inner thin decorative gold border line */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/20 rounded-2xl pointer-events-none" />

        {/* Top Header / Monogram Crest */}
        <div className="relative z-10 pt-2 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-8 h-8 rounded-full border border-gold/50 bg-champagne-light flex items-center justify-center text-gold shadow-sm">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            </div>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-slate font-medium">
            Wedding Reception Invitation
          </p>

          {/* Guest Personalization Pill on Card if present */}
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 px-3 py-1 rounded-full bg-champagne-light border border-gold/30 text-botanical text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3 h-3 text-rose fill-rose" />
              <span>For {guestName}</span>
            </motion.div>
          )}
        </div>

        {/* Centerpiece: Couple Names & Interactive Wax Seal */}
        <div className="relative z-10 my-4 sm:my-6 flex flex-col items-center w-full">
          <p className="font-script text-2xl sm:text-3xl text-gold mb-0.5">
            Vineeth
          </p>
          <span className="font-display italic text-base text-slate font-light my-[-4px]">
            &amp;
          </span>
          <p className="font-script text-2xl sm:text-3xl text-gold mb-3 sm:mb-4">
            Alida
          </p>

          <p className="font-display text-sm sm:text-base text-charcoal/80 max-w-[260px] leading-relaxed italic mb-4 sm:mb-5">
            &ldquo;Join us to celebrate love, laughter, and our happily ever after.&rdquo;
          </p>

          {/* Tactile 3D Wax Seal — Tap to Open */}
          <motion.button
            type="button"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-gold/30 rounded-full"
            aria-label="Break wax seal and open wedding invitation"
          >
            {/* Pulsing Aura */}
            <div className="absolute -inset-2 rounded-full bg-gold/20 blur-sm animate-pulse pointer-events-none" />

            {/* Wax Seal Body */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#C69852] via-[#B88A45] to-[#8C6329] border-2 border-[#E7BA77] shadow-wax-seal flex flex-col items-center justify-center text-pearl transition-transform duration-300">
              {/* Inner carved circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold-light/40 flex flex-col items-center justify-center p-1">
                <span className="font-display text-xs tracking-widest text-pearl-100/90 font-medium uppercase scale-90">
                  EST. 2026
                </span>
                <span className="font-script text-2xl sm:text-3xl text-pearl font-bold drop-shadow-md">
                  V &amp; A
                </span>
              </div>
            </div>

            {/* Micro hint under seal */}
            <span className="block text-[11px] text-slate font-medium tracking-wide mt-2">
              Tap seal or button below
            </span>
          </motion.button>
        </div>

        {/* Bottom Actions: Clear "Open Invitation" Button & Music Toggle */}
        <div className="relative z-10 w-full pt-2 flex flex-col items-center gap-3">
          {/* Main Action Button */}
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={isOpening}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[280px] py-3.5 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-lg shadow-botanical/25 flex items-center justify-center gap-2 border border-gold/40 group cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {isOpening ? (
                <motion.div
                  key="opening"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-gold animate-spin" />
                  <span>Unfolding Invitation...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span>Open Invitation</span>
                  <span className="text-gold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Music Preferences Toggle */}
          {weddingConfig.audio.enabled && (
            <button
              type="button"
              onClick={() => setPlayAudioWithOpen(!playAudioWithOpen)}
              className="flex items-center gap-2 text-xs text-slate hover:text-charcoal transition-colors px-3 py-1.5 rounded-full hover:bg-champagne/40"
              aria-label={playAudioWithOpen ? "Disable music on opening" : "Enable music on opening"}
            >
              {playAudioWithOpen ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-botanical" />
                  <span>Music: <strong className="text-botanical">On</strong></span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate" />
                  <span>Music: <strong className="text-slate">Muted</strong></span>
                </>
              )}
            </button>
          )}

          {/* Reception Highlight Sneak Peek */}
          <p className="text-[11px] text-slate/80 tracking-wide">
            {weddingConfig.reception.formattedDate} • {weddingConfig.reception.city}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
