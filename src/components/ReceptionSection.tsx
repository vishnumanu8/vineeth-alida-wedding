import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Navigation,
  Copy,
  Check,
  CalendarPlus,
  Calendar,
  Sparkles,
  UtensilsCrossed,
  Music,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const ReceptionSection: React.FC = () => {
  const { reception } = weddingConfig;
  const [copied, setCopied] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const calendarMenuRef = useRef<HTMLDivElement>(null);

  // Click outside to close calendar popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarMenuRef.current &&
        !calendarMenuRef.current.contains(event.target as Node)
      ) {
        setShowCalendarMenu(false);
      }
    };

    if (showCalendarMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendarMenu]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${reception.venueName}, ${reception.fullAddress}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleGoogleCalendar = () => {
    const url = createGoogleCalendarUrl({
      title: reception.calendarDetails.title,
      description: reception.calendarDetails.description,
      location: reception.calendarDetails.location,
      startDateIso: reception.isoDateTime,
      durationHours: 4,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowCalendarMenu(false);
  };

  const handleIcsDownload = () => {
    downloadIcsFile({
      title: reception.calendarDetails.title,
      description: reception.calendarDetails.description,
      location: reception.calendarDetails.location,
      startDateIso: reception.isoDateTime,
      durationHours: 4,
    });
    setShowCalendarMenu(false);
  };

  return (
    <section
      id="reception"
      className="relative py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanical/10 text-botanical text-xs font-semibold uppercase tracking-widest border border-botanical/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{reception.badge}</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight">
          {reception.title}
        </h2>

        <p className="font-sans text-xs sm:text-sm text-slate max-w-lg mx-auto mt-1.5 leading-relaxed">
          {reception.subtitle}
        </p>
      </motion.div>

      {/* =======================================================================
          UNIFIED EDITORIAL RECEPTION COMPOSITION
          One single, beautifully framed presentation replacing nested cards
          ======================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-pearl border-2 border-gold/40 shadow-wedding-lg overflow-hidden p-6 sm:p-10 text-center"
      >
        {/* Restrained Gilded Corner Filigree */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold pointer-events-none" />

        {/* ===================================================================
            PART 1: CALENDAR-INSPIRED DATE & TIME COMPOSITION
            Places "07" prominently beside "JANUARY 2027" and "6:00 PM onwards"
            =================================================================== */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-champagne-light/60 border border-gold/30 shadow-sm">
            {/* Prominent Day Number "07" */}
            <div className="font-display text-6xl sm:text-7xl font-light text-botanical leading-none tracking-tight select-none">
              07
            </div>

            {/* Vertical Hairline Divider */}
            <div className="h-14 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent" />

            {/* Month, Year & Time Details */}
            <div className="flex flex-col text-left">
              <span className="font-display text-xs sm:text-sm tracking-[0.25em] font-semibold text-gold uppercase">
                January 2027
              </span>
              <span className="text-[11px] sm:text-xs text-slate uppercase tracking-wider font-medium mt-0.5">
                {reception.formattedDay}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal mt-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{reception.formattedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            PART 2: DELICATE SVG ROUTE LINE CONNECTOR
            Progressively links date/time to the venue
            =================================================================== */}
        <div className="flex justify-center my-3 sm:my-4 pointer-events-none" aria-hidden="true">
          <svg className="w-4 h-12" viewBox="0 0 10 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="5"
              y1="0"
              x2="5"
              y2="40"
              stroke="#D4A359"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
            />
            <circle cx="5" cy="44" r="3" fill="#D4A359" />
          </svg>
        </div>

        {/* ===================================================================
            PART 3: VENUE INFORMATION
            =================================================================== */}
        <div className="flex flex-col items-center max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-2 border border-gold/30">
            <MapPin className="w-4 h-4 text-gold" />
          </div>

          <span className="text-[11px] uppercase tracking-widest text-gold font-semibold mb-1">
            Reception Venue
          </span>

          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
            {reception.venueName}
          </h3>

          {reception.venueHall && (
            <p className="text-xs sm:text-sm font-medium text-charcoal/90 mt-0.5">
              {reception.venueHall}
            </p>
          )}

          <p className="font-sans text-xs sm:text-sm text-slate max-w-md mx-auto mt-1 leading-relaxed">
            {reception.fullAddress}
          </p>

          {/* Copy Address Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-light hover:bg-champagne border border-champagne-border text-xs text-slate hover:text-charcoal transition-colors cursor-pointer min-h-[32px]"
            aria-label="Copy venue address"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-botanical" />
                <span className="text-botanical font-medium">Address Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>

        {/* ===================================================================
            PART 4: PROMINENT ACTION BUTTONS
            =================================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6">
          {/* Get Directions Button */}
          <a
            href={reception.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wide transition-all shadow-md shadow-botanical/20 flex items-center justify-center gap-2 border border-gold/30 group min-h-[46px]"
          >
            <Navigation className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>Get Directions</span>
          </a>

          {/* Add to Calendar Dropdown */}
          <div ref={calendarMenuRef} className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="w-full sm:w-auto min-w-[190px] py-3.5 px-6 rounded-full bg-pearl hover:bg-champagne-light text-botanical border border-gold/50 font-medium text-sm sm:text-base tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              aria-expanded={showCalendarMenu}
            >
              <CalendarPlus className="w-4 h-4 text-gold" />
              <span>Add to Calendar</span>
            </button>

            {/* Calendar Options Popover */}
            {showCalendarMenu && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-2xl bg-pearl border border-gold/30 shadow-xl p-2 z-30 flex flex-col gap-1 text-left">
                <button
                  type="button"
                  onClick={handleGoogleCalendar}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-medium text-charcoal hover:bg-champagne-light hover:text-botanical flex items-center gap-2 transition-colors cursor-pointer min-h-[40px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-botanical" />
                  <span>Google Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={handleIcsDownload}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-medium text-charcoal hover:bg-champagne-light hover:text-botanical flex items-center gap-2 transition-colors cursor-pointer min-h-[40px]"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-gold" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            PART 5: RECEPTION HIGHLIGHTS & COURTESY NOTE
            =================================================================== */}
        <div className="mt-8 pt-5 border-t border-champagne-border flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate">
          <div className="flex items-center gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-gold" />
            <span>Grand Reception Feast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-gold" />
            <span>Live Melodies &amp; Celebration</span>
          </div>
        </div>

        {/* Refined single-line ceremony note */}
        <p className="text-[11px] text-slate/75 italic max-w-lg mx-auto mt-4 px-2">
          * Note: The holy wedding ceremony takes place privately with immediate family. We eagerly await your presence to celebrate together at our evening reception!
        </p>
      </motion.div>
    </section>
  );
};
