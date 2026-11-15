import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GoldenThreadDividerProps {
  className?: string;
}

export const GoldenThreadDivider: React.FC<GoldenThreadDividerProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const leafLeftRef = useRef<SVGPathElement>(null);
  const leafRightRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate vertical thread on scroll
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

      // Subtle botanical leaves sway & draw in
      if (leafLeftRef.current && leafRightRef.current) {
        const leftLen = leafLeftRef.current.getTotalLength();
        const rightLen = leafRightRef.current.getTotalLength();
        gsap.set([leafLeftRef.current, leafRightRef.current], {
          strokeDasharray: Math.max(leftLen, rightLen),
          strokeDashoffset: Math.max(leftLen, rightLen),
        });

        gsap.to([leafLeftRef.current, leafRightRef.current], {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center my-3 sm:my-5 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG In-Page Progressive Thread with Botanical Leaves */}
      <svg
        className="w-6 h-12 sm:h-16 overflow-visible"
        viewBox="0 0 20 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Guide Line */}
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="70"
          stroke="#D4A359"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="3 3"
        />

        {/* Left Botanical Leaf Flourish */}
        <path
          ref={leafLeftRef}
          d="M 10 26 Q 2 20 5 13 Q 9 18 10 26"
          stroke="url(#threadGold)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right Botanical Leaf Flourish */}
        <path
          ref={leafRightRef}
          d="M 10 44 Q 18 38 15 31 Q 11 36 10 44"
          stroke="url(#threadGold)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Active Animated Golden Thread */}
        <path
          ref={pathRef}
          d="M 10 0 L 10 70"
          stroke="url(#inPageGoldThreadGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="inPageGoldThreadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C89D54" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F0D49E" stopOpacity="1" />
            <stop offset="100%" stopColor="#B88A45" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="threadGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C89D54" />
            <stop offset="100%" stopColor="#F0D49E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
