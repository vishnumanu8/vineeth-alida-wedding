import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  id: string;
  targetId: string;
  shortLabel: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 'couple-milestone',
    targetId: 'invitation-story',
    shortLabel: 'Couple',
    label: 'The Couple',
    icon: (isActive) => (
      <Heart
        className={`w-3.5 h-3.5 transition-colors ${
          isActive ? 'text-gold fill-gold/50' : 'text-gold/60'
        }`}
      />
    ),
  },
  {
    id: 'reception-milestone',
    targetId: 'reception',
    shortLabel: 'Reception',
    label: 'The Reception',
    icon: (isActive) => (
      <Calendar
        className={`w-3.5 h-3.5 transition-colors ${
          isActive ? 'text-gold fill-gold/35' : 'text-gold/60'
        }`}
      />
    ),
  },
  {
    id: 'celebration-milestone',
    targetId: 'wishes',
    shortLabel: 'Blessings',
    label: 'Blessings',
    icon: (isActive) => (
      <Sparkles
        className={`w-3.5 h-3.5 transition-colors ${
          isActive ? 'text-gold fill-gold/50' : 'text-gold/60'
        }`}
      />
    ),
  },
];

export const TheLivingGoldenThread: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<string>('couple-milestone');
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Show thread once scrolling past hero
      ScrollTrigger.create({
        trigger: document.body,
        start: '70px top',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      // 2. Animate vertical desktop thread path length
      if (desktopPathRef.current) {
        const path = desktopPathRef.current;
        const pathLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }

      // 3. Animate mobile horizontal progress bar width
      if (mobileProgressRef.current) {
        gsap.to(mobileProgressRef.current, {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }

      // 4. ScrollTriggers to detect active milestone accurately both scrolling down & up
      milestones.forEach((m) => {
        ScrollTrigger.create({
          trigger: `#${m.targetId}`,
          start: 'top 65%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveMilestone(m.id);
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Invitation Chapter Navigation"
      className={`transition-all duration-500 pointer-events-none select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* =======================================================================
          1. DESKTOP VIEWPORT: VERTICAL LIVING GOLDEN THREAD (md: and above)
          ======================================================================= */}
      <div
        className="hidden md:flex fixed left-5 lg:left-8 top-0 bottom-0 z-40 pointer-events-none flex-col items-center justify-between py-28"
        aria-hidden="true"
      >
        {/* SVG Vertical Thread */}
        <svg
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 10 1000"
        >
          <defs>
            <linearGradient id="goldThreadGradDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C89D54" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#D4A359" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#F0D49E" stopOpacity="1" />
              <stop offset="100%" stopColor="#B88A45" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Background guide rail */}
          <line
            x1="5"
            y1="0"
            x2="5"
            y2="1000"
            stroke="#D4A359"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />

          {/* Progressively illuminated golden thread */}
          <path
            ref={desktopPathRef}
            d="M 5,0 L 5,1000"
            fill="none"
            stroke="url(#goldThreadGradDesktop)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Milestone Markers */}
        <div className="relative z-10 flex flex-col justify-around h-full w-full pointer-events-none">
          {milestones.map((m) => {
            const isActive = activeMilestone === m.id;
            return (
              <div
                key={m.id}
                className="group pointer-events-auto flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(m.targetId)}
                  className={`relative w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-botanical border-gold scale-110 shadow-gold-glow ring-2 ring-gold/40'
                      : 'bg-[#0C1712]/80 border-gold/40 hover:border-gold hover:scale-105'
                  }`}
                  title={`Jump to ${m.label}`}
                  aria-label={`Jump to ${m.label}`}
                >
                  {m.icon(isActive)}
                </button>

                {/* Permanent antique gold label on desktop */}
                <span
                  className={`text-xs font-display uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm ${
                    isActive
                      ? 'text-gold-shimmer font-semibold bg-[#0C1712]/90 border border-gold/60 shadow-gold-glow translate-x-0'
                      : 'text-pearl/70 bg-[#0C1712]/50 border border-white/10 group-hover:text-gold group-hover:border-gold/40 -translate-x-1 group-hover:translate-x-0'
                  }`}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =======================================================================
          2. MOBILE VIEWPORT: COMPACT FLOATING CHAPTER THREAD DOCK (< md)
          Shows thread and ALL section labels in a compact, non-overlapping dock
          ======================================================================= */}
      <nav
        className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-sm mx-auto pointer-events-auto"
        aria-label="Mobile Chapter Navigation"
      >
        <div className="relative bg-[#09150F]/95 backdrop-blur-md border border-gold/40 rounded-full shadow-2xl px-2.5 py-1.5 flex items-center justify-between overflow-hidden">
          {/* Horizontal Golden Guide Rail */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-gold/20 pointer-events-none" />

          {/* Progressively Illuminated Horizontal Golden Thread */}
          <div
            ref={mobileProgressRef}
            className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-gold/30 via-gold-shimmer to-gold pointer-events-none scale-x-0 will-change-transform shadow-gold-glow"
          />

          {/* Milestone Buttons */}
          {milestones.map((m) => {
            const isActive = activeMilestone === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => scrollToSection(m.targetId)}
                className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer min-h-[38px] ${
                  isActive
                    ? 'bg-botanical/95 border border-gold/70 shadow-gold-glow text-gold-shimmer'
                    : 'text-pearl/70 hover:text-pearl'
                }`}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Jump to ${m.label}`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-gold shadow-gold-glow scale-125'
                      : 'bg-gold/40'
                  }`}
                />
                <span
                  className={`text-[11px] font-display uppercase tracking-wider ${
                    isActive ? 'font-semibold text-gold-shimmer' : 'font-medium'
                  }`}
                >
                  {m.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
