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

    // Smooth transition time for cinematic unfolding
    setTimeout(() => {
      onOpen(playAudioWithOpen);
    }, 900);
  };

  return (
    <motion.div
      key="opening-overlay"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(6px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#182B24] via-[#223E33] to-[#15241E] p-4 sm:p-6 overflow-hidden select-none safe-top safe-bottom"
    >
      {/* Subtle ambient golden dust / glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-peacock/25 blur-3xl" />
      </div>

      {/* Main Invitation Card Container — Strictly fitted to mobile viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[360px] sm:max-w-md mx-auto my-auto flex flex-col items-center justify-between py-6 sm:py-7 px-5 sm:px-8 rounded-3xl bg-pearl border border-gold/45 shadow-2xl shadow-black/50 overflow-hidden text-center max-h-[92dvh]"
      >
        {/* Subtle Luxury Corner Ornaments */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/60 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/60 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/60 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/60 rounded-br-sm pointer-events-none" />

        {/* Inner thin decorative gold border line */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/25 rounded-2xl pointer-events-none" />

        {/* Top Header / Royal Monogram Crest */}
        <div className="relative z-10 pt-1 flex flex-col items-center">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="h-[1px] w-7 sm:w-10 bg-gradient-to-r from-transparent to-gold/70" />
            <div className="w-7 h-7 rounded-full border border-gold/60 bg-champagne-light flex items-center justify-center text-botanical shadow-sm">
              <span className="font-display font-semibold text-xs tracking-wider text-botanical">
                V&amp;A
              </span>
            </div>
            <span className="h-[1px] w-7 sm:w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </div>

          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-slate font-medium">
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

        {/* Centerpiece: Couple Names & Tactile 3D Wax Seal */}
        <div className="relative z-10 my-3 sm:my-5 flex flex-col items-center w-full">
          {/* Couple Names */}
          <div className="mb-2">
            <h2 className="font-display text-3xl sm:text-4xl text-botanical font-normal tracking-tight">
              Vineeth{' '}
              <span className="font-script text-2xl sm:text-3xl text-gold font-normal px-1">
                &amp;
              </span>{' '}
              Alida
            </h2>
          </div>

          <p className="font-display text-xs sm:text-sm text-charcoal/80 max-w-[270px] leading-relaxed italic mb-4 sm:mb-5">
            &ldquo;Together with our families, we joyfully invite you to celebrate our reception evening.&rdquo;
          </p>

          {/* Tactile 3D Wax Seal — Tap to Open */}
          <motion.button
            type="button"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-gold/30 rounded-full p-1"
            aria-label="Break wax seal and open wedding invitation"
          >
            {/* Subtle Pulsing Aura */}
            <div className="absolute inset-0 rounded-full bg-gold/25 blur-md animate-pulse pointer-events-none" />

            {/* Wax Seal Body — Optically centered & symmetrical */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#CA9C56] via-[#B88A45] to-[#865E26] border-2 border-[#ECC17E] shadow-wax-seal flex items-center justify-center text-pearl transition-transform duration-300">
              {/* Inner carved circle */}
              <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full border border-gold-shimmer/40 flex flex-col items-center justify-center p-1 text-center">
                {/* Fleur / Diamond accent */}
                <span className="text-[9px] text-pearl-100/80 leading-none select-none">
                  ✦
                </span>
                {/* Monogram — Cormorant Serif optical center */}
                <span className="font-display text-xl sm:text-2xl font-semibold text-pearl tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-[-1px]">
                  V&amp;A
                </span>
                {/* Year */}
                <span className="text-[9px] font-sans tracking-[0.2em] text-pearl-100/90 font-medium uppercase leading-none">
                  2026
                </span>
              </div>
            </div>

            {/* Micro hint under seal */}
            <span className="block text-[11px] text-slate font-medium tracking-wide mt-2">
              Tap seal or button below
            </span>
          </motion.button>
        </div>

        {/* Bottom Actions: "Open Invitation" Button & Music Toggle */}
        <div className="relative z-10 w-full pt-1 flex flex-col items-center gap-2.5">
          {/* Main Action Button */}
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={isOpening}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[270px] py-3 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-lg shadow-botanical/25 flex items-center justify-center gap-2 border border-gold/40 group cursor-pointer"
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
              className="flex items-center gap-1.5 text-xs text-slate hover:text-charcoal transition-colors px-3 py-1 rounded-full hover:bg-champagne/40 cursor-pointer"
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
    </motion.div>
  );
};
