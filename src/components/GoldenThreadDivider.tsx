import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GoldenThreadDividerProps {
  label?: string;
  targetId?: string;
  icon?: React.ReactNode;
}

export const GoldenThreadDivider: React.FC<GoldenThreadDividerProps> = ({
  label,
  targetId,
  icon,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: 0.3,
        },
      });

      if (markerRef.current) {
        gsap.fromTo(
          markerRef.current,
          { scale: 0.9, opacity: 0.7 },
          {
            scale: 1.05,
            opacity: 1,
            boxShadow: '0 0 16px rgba(212, 163, 89, 0.4)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center my-4 sm:my-6 pointer-events-auto select-none"
    >
      {/* SVG In-Page Progressive Thread */}
      <svg
        className="w-4 h-14 sm:h-18"
        viewBox="0 0 10 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="70"
          stroke="#D4A359"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
        />
        <path
          ref={pathRef}
          d="M 5,0 L 5,70"
          stroke="url(#inPageGoldThreadGrad)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="inPageGoldThreadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C89D54" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F0D49E" stopOpacity="1" />
            <stop offset="100%" stopColor="#B88A45" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Refined In-Page Chapter Marker */}
      {label && (
        <button
          type="button"
          onClick={handleClick}
          ref={markerRef}
          className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pearl border border-gold/40 text-botanical text-[11px] font-display uppercase tracking-widest shadow-sm hover:border-gold hover:text-gold-dark transition-all cursor-pointer"
          aria-label={`Jump to ${label}`}
        >
          {icon}
          <span>{label}</span>
        </button>
      )}
    </div>
  );
};
