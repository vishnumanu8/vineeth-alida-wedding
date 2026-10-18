import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  id: string;
  targetId: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 'couple-milestone',
    targetId: 'invitation-story',
    label: 'The Couple',
    icon: (isActive) => (
      <Heart className={`w-3.5 h-3.5 ${isActive ? 'text-gold fill-gold/40' : 'text-botanical/80'}`} />
    ),
  },
  {
    id: 'reception-milestone',
    targetId: 'reception',
    label: 'The Reception',
    icon: (isActive) => (
      <Calendar className={`w-3.5 h-3.5 ${isActive ? 'text-gold fill-gold/25' : 'text-botanical/80'}`} />
    ),
  },
  {
    id: 'celebration-milestone',
    targetId: 'wishes',
    label: 'Blessings',
    icon: (isActive) => (
      <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-gold fill-gold/40' : 'text-botanical/80'}`} />
    ),
  },
];

export const TheLivingGoldenThread: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Setup SVG dash properties for progressive drawing
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate line drawing linked to overall scroll progress
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Fade-in thread once scrolling past hero
      ScrollTrigger.create({
        trigger: document.body,
        start: '80px top',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      // ScrollTriggers to detect active milestone
      milestones.forEach((m) => {
        ScrollTrigger.create({
          trigger: `#${m.targetId}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveMilestone(m.id),
          onEnterBack: () => setActiveMilestone(m.id),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed left-2 sm:left-4 md:left-6 top-0 bottom-0 z-30 pointer-events-none flex flex-col items-center justify-between py-24 select-none transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
      }`}
      aria-hidden="true"
    >
      {/* Golden Thread SVG Path */}
      <svg
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 10 1000"
      >
        <defs>
          <linearGradient id="goldThreadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C89D54" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#D4A359" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#F0D49E" stopOpacity="1" />
            <stop offset="100%" stopColor="#B88A45" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Background Guide Line */}
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="1000"
          stroke="#E8D7C2"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
        />

        {/* Active Drawn Golden Thread */}
        <path
          ref={pathRef}
          d="M 5,0 L 5,1000"
          fill="none"
          stroke="url(#goldThreadGrad)"
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
              className="group pointer-events-auto flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => scrollToSection(m.targetId)}
                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-botanical border-gold scale-110 shadow-gold-glow ring-2 ring-gold/30'
                    : 'bg-pearl/95 border-gold/45 hover:border-gold hover:scale-105 shadow-sm'
                }`}
                title={`Jump to ${m.label}`}
                aria-label={`Jump to ${m.label}`}
              >
                {m.icon(isActive)}
              </button>

              {/* Tooltip label */}
              <span
                className={`hidden md:inline-block text-[11px] font-display uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md shadow-sm ${
                  isActive
                    ? 'text-botanical font-semibold bg-pearl/95 border border-gold/50 opacity-100 shadow-sm translate-x-0'
                    : 'text-charcoal/70 bg-pearl/90 border border-gold/25 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
