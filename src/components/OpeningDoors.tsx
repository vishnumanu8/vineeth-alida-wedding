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

    // Start background music immediately upon guest interaction
    if (weddingConfig.audio.enabled) {
      weddingAudio.play().catch(() => {});
    }

    onOpen();

    // Remove doors from DOM once transition completes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1150);
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
      aria-label="Open wedding reception invitation"
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none"
    >
      {/* =======================================================================
          LEFT DOOR PANEL
          ======================================================================= */}
      <div
        style={{
          transform: isOpen ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#0F1E18] via-[#14261F] to-[#182E25] border-r border-gold/40 shadow-2xl flex items-center justify-end overflow-hidden will-change-transform"
      >
        {/* Subtle ambient botanical lighting */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        {/* Ornate corner flourish */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-sm pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-sm pointer-events-none" />
      </div>

      {/* =======================================================================
          RIGHT DOOR PANEL
          ======================================================================= */}
      <div
        style={{
          transform: isOpen ? 'translate3d(100%, 0, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#0F1E18] via-[#14261F] to-[#182E25] border-l border-gold/40 shadow-2xl flex items-center justify-start overflow-hidden will-change-transform"
      >
        {/* Subtle ambient botanical lighting */}
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-peacock/10 blur-3xl pointer-events-none" />
        {/* Ornate corner flourish */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-sm pointer-events-none" />
      </div>

      {/* =======================================================================
          CENTER SEAM EMBLEM & TYPOGRAPHY
          Seamlessly centered across the parting doors
          ======================================================================= */}
      <div
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-10"
      >
        {/* Monogram Crest */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold/60 bg-[#162920]/90 shadow-gold-glow flex items-center justify-center mb-4 sm:mb-6">
          <span className="font-display font-semibold text-lg sm:text-xl text-gold-shimmer tracking-widest pl-1">
            V&amp;A
          </span>
        </div>

        {/* Small tracked headline */}
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-pearl-100/70 font-medium mb-2">
          Wedding Reception Invitation
        </p>

        {/* Couple Names */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-pearl tracking-tight leading-tight mb-2 sm:mb-3">
          Vineeth{' '}
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-gold px-1 font-normal">
            &amp;
          </span>{' '}
          Alida
        </h1>

        {/* Date & Location preview */}
        <p className="font-display italic text-sm sm:text-lg text-pearl/85 tracking-wide max-w-sm mb-6">
          {weddingConfig.reception.formattedDate} • {weddingConfig.reception.city}
        </p>

        {/* Guest Personalization Pill */}
        {guestName && (
          <div className="mb-6 px-4 py-1.5 rounded-full bg-pearl/10 border border-gold/40 text-pearl-100 text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm">
            Prepared for {guestName}
          </div>
        )}

        {/* Elegant Parting Cue */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/40 border border-gold/50 text-gold-shimmer text-xs tracking-[0.2em] uppercase font-medium shadow-lg backdrop-blur-md animate-pulse">
          <span>⟨</span>
          <span className="text-[11px] font-sans">Tap to Enter</span>
          <span>⟩</span>
        </div>
      </div>
    </div>
  );
};
