import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC = () => {
  const targetDateIso = weddingConfig.reception.isoDateTime;

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isComplete: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-light/70 border border-gold/30 text-botanical text-[11px] uppercase tracking-widest font-semibold mb-3">
        <Clock className="w-3.5 h-3.5 text-gold" />
        <span>Counting Down to Forever</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md w-full">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-pearl border border-gold/40 shadow-sm relative overflow-hidden group hover:border-gold transition-colors"
          >
            {/* Subtle corner accent */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-gold/50" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-gold/50" />

            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-botanical leading-none tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-gold mt-1 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
