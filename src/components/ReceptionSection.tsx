import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Copy,
  Check,
  CalendarPlus,
  Sparkles,
  UtensilsCrossed,
  Music,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const ReceptionSection: React.FC = () => {
  const { reception } = weddingConfig;
  const [copied, setCopied] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const target = new Date(reception.isoDateTime).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [reception.isoDateTime]);

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
      className="relative py-14 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-champagne/30 to-transparent"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanical/10 text-botanical text-xs font-semibold uppercase tracking-widest border border-botanical/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{reception.badge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight">
            {reception.title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate max-w-lg mx-auto mt-2">
            {reception.subtitle}
          </p>
        </motion.div>

        {/* Central Master Reception Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-pearl border-2 border-gold/40 shadow-wedding-lg overflow-hidden p-6 sm:p-10 text-center"
        >
          {/* Subtle Gilded Corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold pointer-events-none" />

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-4 border-b border-champagne-border">
            {/* Date Box */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-champagne-light/60 border border-gold/25">
              <div className="w-10 h-10 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-2">
                <Calendar className="w-5 h-5 text-botanical" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
                The Date
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold text-botanical mt-1">
                {reception.formattedDate}
              </span>
              <span className="text-xs text-slate mt-0.5">
                {reception.formattedDay}
              </span>
            </div>

            {/* Time Box */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-champagne-light/60 border border-gold/25">
              <div className="w-10 h-10 rounded-full bg-botanical/10 flex items-center justify-center text-botanical mb-2">
                <Clock className="w-5 h-5 text-botanical" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
                Reception Time
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold text-botanical mt-1">
                {reception.formattedTime}
              </span>
              <span className="text-xs text-slate mt-0.5">
                Followed by Dinner &amp; Music
              </span>
            </div>
          </div>

          {/* Venue & Location Details */}
          <div className="py-6 sm:py-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-3 border border-gold/30">
              <MapPin className="w-6 h-6 text-gold" />
            </div>

            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-1">
              Reception Venue
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
              {reception.venueName}
            </h3>

            {reception.venueHall && (
              <p className="text-sm font-medium text-charcoal/90 mt-1">
                {reception.venueHall}
              </p>
            )}

            <p className="font-sans text-sm sm:text-base text-slate max-w-md mx-auto mt-2 leading-relaxed">
              {reception.fullAddress}
            </p>

            {/* Copy Address Button */}
            <button
              type="button"
              onClick={handleCopyAddress}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne-light hover:bg-champagne border border-champagne-border text-xs text-slate hover:text-charcoal transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-botanical" />
                  <span className="text-botanical font-medium">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Prominent Action Buttons: Get Directions & Add to Calendar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            {/* Get Directions Button */}
            <a
              href={reception.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wide transition-all shadow-md shadow-botanical/20 flex items-center justify-center gap-2 border border-gold/30 group"
            >
              <Navigation className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span>Get Directions</span>
            </a>

            {/* Add to Calendar Dropdown / Button */}
            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                className="w-full sm:w-auto min-w-[190px] py-3.5 px-6 rounded-full bg-pearl hover:bg-champagne-light text-botanical border border-gold/50 font-medium text-sm sm:text-base tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
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
                    className="w-full px-3 py-2 rounded-xl text-xs font-medium text-charcoal hover:bg-champagne-light hover:text-botanical flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-botanical" />
                    <span>Google Calendar</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleIcsDownload}
                    className="w-full px-3 py-2 rounded-xl text-xs font-medium text-charcoal hover:bg-champagne-light hover:text-botanical flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-gold" />
                    <span>Apple / Outlook (.ics)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Evening Reception Features: Dining & Music Highlights */}
          <div className="mt-8 pt-6 border-t border-champagne-border flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-gold" />
              <span>Grand Reception Feast &amp; Refreshments</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-gold" />
              <span>Live Melodies &amp; Celebration</span>
            </div>
          </div>
        </motion.div>

        {/* Live Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <span className="text-[11px] uppercase tracking-widest text-slate font-medium">
            Counting Down To The Celebration
          </span>

          {!timeLeft.isPast ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mt-4">
              {/* Days */}
              <div className="p-3 sm:p-4 rounded-2xl bg-pearl border border-gold/30 shadow-sm flex flex-col items-center">
                <span className="font-display text-2xl sm:text-4xl font-bold text-botanical">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate mt-1">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="p-3 sm:p-4 rounded-2xl bg-pearl border border-gold/30 shadow-sm flex flex-col items-center">
                <span className="font-display text-2xl sm:text-4xl font-bold text-botanical">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="p-3 sm:p-4 rounded-2xl bg-pearl border border-gold/30 shadow-sm flex flex-col items-center">
                <span className="font-display text-2xl sm:text-4xl font-bold text-botanical">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate mt-1">
                  Mins
                </span>
              </div>

              {/* Seconds */}
              <div className="p-3 sm:p-4 rounded-2xl bg-pearl border border-gold/30 shadow-sm flex flex-col items-center">
                <span className="font-display text-2xl sm:text-4xl font-bold text-gold">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate mt-1">
                  Secs
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-2xl bg-pearl border border-gold/40 text-botanical font-display text-lg sm:text-xl font-medium max-w-md mx-auto shadow-sm">
              ✨ The celebration has arrived! We look forward to seeing you tonight!
            </div>
          )}

          {/* Important Clarity Note: Private Wedding Ceremony vs Public Reception */}
          <p className="text-xs text-slate/75 italic max-w-lg mx-auto mt-6 px-4">
            * Note: The holy wedding ceremony takes place privately with immediate family. We eagerly await your presence to celebrate together at our evening reception!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
