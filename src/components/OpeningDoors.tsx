import React, { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { weddingAudio } from '../utils/audioPlayer';

interface OpeningDoorsProps {
  onOpen: () => void;
  guestName?: string | null;
}

export const OpeningDoors: React.FC<OpeningDoorsProps> = ({ onOpen, guestName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleEnter = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Audio starts with gentle volume fade-in synchronised with the doors swinging open
    if (weddingConfig.audio.enabled) {
      weddingAudio.playWithFadeIn(2200, 0.65).catch(() => {});
    }

    onOpen();

    // Cleanly unmount doors once perspective animation finishes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1250);
  };

  if (isRemoved) return null;

  return (
    <div
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleEnter();
        }
      }}
      aria-label="Tap to enter wedding reception invitation"
      style={{ perspective: '1400px' }}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none bg-transparent"
    >
      {/* =======================================================================
          LEFT DOOR (Swings open to the left on Y-axis with 3D perspective)
          ======================================================================= */}
      <div
        style={{
          transformOrigin: 'left center',
          transform: isOpen
            ? 'rotateY(-84deg) translate3d(-15%, 0, -60px)'
            : 'rotateY(0deg) translate3d(0, 0, 0)',
          opacity: isOpen ? 0 : 1,
          transition:
            'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1), opacity 1.05s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0C1914] via-[#12241C] to-[#152B21] border-r border-gold/50 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient botanical lighting */}
        <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Corner filigree accents */}
        <div className="absolute top-6 left-6 w-7 h-7 border-t border-l border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-7 h-7 border-b border-l border-gold/40 pointer-events-none" />
      </div>

      {/* =======================================================================
          RIGHT DOOR (Swings open to the right on Y-axis with 3D perspective)
          ======================================================================= */}
      <div
        style={{
          transformOrigin: 'right center',
          transform: isOpen
            ? 'rotateY(84deg) translate3d(15%, 0, -60px)'
            : 'rotateY(0deg) translate3d(0, 0, 0)',
          opacity: isOpen ? 0 : 1,
          transition:
            'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1), opacity 1.05s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#0C1914] via-[#12241C] to-[#152B21] border-l border-gold/50 shadow-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle ambient lighting */}
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Corner filigree accents */}
        <div className="absolute top-6 right-6 w-7 h-7 border-t border-r border-gold/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-7 h-7 border-b border-r border-gold/40 pointer-events-none" />
      </div>

      {/* =======================================================================
          CENTER GOLD SEAM LINE (The starting point for the parting reveal)
          ======================================================================= */}
      <div
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scaleY(0.7)' : 'scaleY(1)',
          transition: 'opacity 0.4s ease, transform 0.5s ease',
        }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-gold-shimmer to-transparent pointer-events-none z-10"
      />

      {/* =======================================================================
          CENTER EMBLEM & TYPOGRAPHY
          ======================================================================= */}
      <div
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0.94) translateY(-10px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.45s ease, transform 0.5s ease',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-20"
      >
        {/* Monogram Crest */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold/70 bg-[#12241C]/95 shadow-gold-glow flex items-center justify-center mb-4 sm:mb-5">
          <span className="font-display font-semibold text-lg sm:text-xl text-gold-shimmer tracking-widest pl-1">
            {weddingConfig.couple.monogram}
          </span>
        </div>

        {/* Small tracked headline */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-pearl-100/70 font-medium mb-1.5 sm:mb-2">
          The Wedding Reception of
        </p>

        {/* Couple Names */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
          {weddingConfig.couple.groom.name}{' '}
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold font-normal px-1">
            &amp;
          </span>{' '}
          {weddingConfig.couple.bride.name}
        </h1>

        {/* Confirmed Date & Location preview */}
        <p className="font-display italic text-sm sm:text-base text-pearl/85 tracking-wide max-w-sm mb-5 sm:mb-6">
          {weddingConfig.reception.formattedDate}
        </p>

        {/* Guest Personalization Pill */}
        {guestName && (
          <div className="mb-6 px-4 py-1.5 rounded-full bg-pearl/10 border border-gold/40 text-pearl-100 text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm">
            Prepared for {guestName}
          </div>
        )}

        {/* Subtle Parting Cue */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gold/40 text-gold-shimmer text-xs tracking-[0.2em] uppercase font-medium shadow-md backdrop-blur-md animate-pulse">
          <span className="text-[10px]">⟨</span>
          <span className="text-[11px] font-sans">Tap to enter</span>
          <span className="text-[10px]">⟩</span>
        </div>
      </div>
    </div>
  );
};
