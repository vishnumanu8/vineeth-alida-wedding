import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AnimatedMonogram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!svgRef.current) return;

      // Animate all ornamental paths with stroke-dashoffset draw-in
      const ornamentPaths = svgRef.current.querySelectorAll('.ornament-path');
      ornamentPaths.forEach((path) => {
        const el = path as SVGPathElement;
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Draw ornamental botanical frame
      ornamentPaths.forEach((path, i) => {
        const el = path as SVGPathElement;
        tl.to(el, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, i * 0.08);
      });

      // 2. Fade in monogram letters
      const letters = svgRef.current.querySelectorAll('.mono-letter');
      tl.fromTo(letters, {
        opacity: 0,
        y: 8,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, 0.4);

      // 3. Fade in the ampersand with gold glow
      const ampersand = svgRef.current.querySelector('.mono-amp');
      if (ampersand) {
        tl.fromTo(ampersand, {
          opacity: 0,
          scale: 0.7,
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, 0.55);
      }

      // 4. Ornamental underline
      const underline = svgRef.current.querySelector('.mono-underline');
      if (underline) {
        const ul = underline as SVGPathElement;
        const ulLen = ul.getTotalLength();
        gsap.set(ul, { strokeDasharray: ulLen, strokeDashoffset: ulLen });
        tl.to(ul, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, 0.9);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <svg
        ref={svgRef}
        viewBox="0 0 280 200"
        className="w-56 sm:w-72 h-auto overflow-visible"
        aria-label="V & A Monogram with botanical ornaments"
      >
        <defs>
          <linearGradient id="monoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C89D54" />
            <stop offset="50%" stopColor="#F0D49E" />
            <stop offset="100%" stopColor="#B88A45" />
          </linearGradient>
          <linearGradient id="monoGoldLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C89D54" stopOpacity="0" />
            <stop offset="50%" stopColor="#F0D49E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C89D54" stopOpacity="0" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top-left botanical corner */}
        <path
          className="ornament-path"
          d="M 30 50 Q 30 30 50 30 Q 65 30 70 40"
          stroke="url(#monoGold)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="ornament-path"
          d="M 35 55 Q 20 45 30 30 Q 35 20 50 22"
          stroke="url(#monoGold)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf sprout top-left */}
        <path
          className="ornament-path"
          d="M 42 35 Q 38 28 45 22 Q 50 28 45 34"
          stroke="#C89D54"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Top-right botanical corner */}
        <path
          className="ornament-path"
          d="M 250 50 Q 250 30 230 30 Q 215 30 210 40"
          stroke="url(#monoGold)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="ornament-path"
          d="M 245 55 Q 260 45 250 30 Q 245 20 230 22"
          stroke="url(#monoGold)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf sprout top-right */}
        <path
          className="ornament-path"
          d="M 238 35 Q 242 28 235 22 Q 230 28 235 34"
          stroke="#C89D54"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bottom-left botanical vine */}
        <path
          className="ornament-path"
          d="M 30 150 Q 30 170 50 170 Q 65 170 70 160"
          stroke="url(#monoGold)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="ornament-path"
          d="M 42 165 Q 38 172 45 178 Q 50 172 45 166"
          stroke="#C89D54"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bottom-right botanical vine */}
        <path
          className="ornament-path"
          d="M 250 150 Q 250 170 230 170 Q 215 170 210 160"
          stroke="url(#monoGold)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="ornament-path"
          d="M 238 165 Q 242 172 235 178 Q 230 172 235 166"
          stroke="#C89D54"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* V letter */}
        <text
          className="mono-letter"
          x="90"
          y="115"
          textAnchor="middle"
          style={{ fontSize: '56px', letterSpacing: '0.05em', opacity: 0 }}
          fill="url(#monoGold)"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="500"
          filter="url(#goldGlow)"
        >
          V
        </text>

        {/* & ampersand */}
        <text
          className="mono-amp"
          x="140"
          y="108"
          textAnchor="middle"
          style={{ fontSize: '36px', opacity: 0 }}
          fill="#F0D49E"
          fontFamily="Great Vibes, cursive"
          filter="url(#goldGlow)"
        >
          &amp;
        </text>

        {/* A letter */}
        <text
          className="mono-letter"
          x="192"
          y="115"
          textAnchor="middle"
          style={{ fontSize: '56px', letterSpacing: '0.05em', opacity: 0 }}
          fill="url(#monoGold)"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="500"
          filter="url(#goldGlow)"
        >
          A
        </text>

        {/* Ornamental underline curve */}
        <path
          className="mono-underline"
          d="M 60 135 Q 140 155 220 135"
          stroke="url(#monoGoldLight)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
