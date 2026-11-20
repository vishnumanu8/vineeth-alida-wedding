import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

export const CoupleSection: React.FC = () => {
  const { couple } = weddingConfig;

  const flightRouteRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  // Scroll-Linked Dubai-to-Kerala Flight Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const plane = planeRef.current;
      const container = flightRouteRef.current;
      if (!path || !plane || !container) return;

      const pathLength = path.getTotalLength();

      // Initially line is drawn to 0% (offset = full length)
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Place plane at Dubai start point
      const startPt = path.getPointAtLength(0);
      gsap.set(plane, {
        x: startPt.x,
        y: startPt.y,
        rotation: -25,
      });

      const flightProgress = { val: 0 };

      gsap.to(flightProgress, {
        val: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;

            // Draw line from Dubai to Kerala
            const currentOffset = pathLength * (1 - p);
            path.style.strokeDashoffset = `${currentOffset}`;

            // Move airplane along the trajectory arc
            const currentLen = p * pathLength;
            const pt = path.getPointAtLength(currentLen);

            // Calculate tangent angle for smooth airplane banking
            const sampleDist = 2;
            const nextLen = Math.min(pathLength, currentLen + sampleDist);
            const prevLen = Math.max(0, currentLen - sampleDist);
            const nextPt = path.getPointAtLength(nextLen);
            const prevPt = path.getPointAtLength(prevLen);
            const angle =
              Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x) *
              (180 / Math.PI);

            gsap.set(plane, {
              x: pt.x,
              y: pt.y,
              rotation: angle,
            });
          },
        },
      });
    }, flightRouteRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="invitation-story"
      className="relative py-10 sm:py-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            HIGH-CONTRAST SECTION HEADER
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-6 sm:mb-8 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111D4A] border border-gold/40 text-gold-shimmer text-xs uppercase tracking-widest font-semibold mb-2.5 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>The Journey Home</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAF6F0] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Our New Journey Begins
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#E5C158] mt-1.5 max-w-md mx-auto leading-relaxed tracking-wide">
            From the skylines of Dubai to the serene backwaters of Kerala, coming home to celebrate our beginning.
          </p>
        </motion.div>

        {/* ===================================================================
            ANIMATED DUBAI ✈ KERALA FLIGHT CARD (Scroll-Linked Scrub)
            =================================================================== */}
        {couple.originJourney && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md sm:max-w-lg rounded-3xl bg-[#FFFDF9] border border-gold/45 shadow-wedding-lg p-5 sm:p-8 flex flex-col items-center select-none relative overflow-hidden"
          >
            <div
              ref={flightRouteRef}
              className="w-full flex flex-col items-center"
              aria-label="Flight journey from Dubai to Kerala"
            >
              <svg
                viewBox="0 0 320 84"
                className="w-full h-auto overflow-visible drop-shadow-sm"
              >
                <defs>
                  <linearGradient
                    id="flightArcGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#C89D54" />
                    <stop offset="50%" stopColor="#F0D49E" />
                    <stop offset="100%" stopColor="#C89D54" />
                  </linearGradient>

                  <linearGradient
                    id="flightPlaneGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#C89D54" />
                    <stop offset="60%" stopColor="#F5E2B8" />
                    <stop offset="100%" stopColor="#D4A359" />
                  </linearGradient>
                </defs>

                {/* Background Dotted Flight Path */}
                <path
                  d="M 35 52 Q 160 8 285 52"
                  stroke="#E2CEB0"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Animated Gold Flight Path */}
                <path
                  ref={pathRef}
                  d="M 35 52 Q 160 8 285 52"
                  stroke="url(#flightArcGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  className="drop-shadow-[0_0_6px_rgba(240,212,158,0.85)]"
                />

                {/* Dubai Marker (Origin) */}
                <g>
                  <circle
                    cx="35"
                    cy="52"
                    r="8"
                    fill="none"
                    stroke="#D4A359"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                  <circle
                    cx="35"
                    cy="52"
                    r="3.5"
                    fill="#B88A45"
                    stroke="#FFF9F1"
                    strokeWidth="1.2"
                  />
                  <text
                    x="35"
                    y="36"
                    textAnchor="middle"
                    className="font-display italic text-[10px] fill-[#B88A45] font-medium"
                  >
                    Departure
                  </text>
                  <text
                    x="35"
                    y="72"
                    textAnchor="middle"
                    className="font-sans font-bold text-[11px] fill-[#0B1325] tracking-wider uppercase"
                  >
                    {couple.originJourney.from}
                  </text>
                </g>

                {/* Kerala Marker (Destination / Home) */}
                <g>
                  <circle
                    cx="285"
                    cy="52"
                    r="8"
                    fill="none"
                    stroke="#111D4A"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                  <circle
                    cx="285"
                    cy="52"
                    r="3.5"
                    fill="#111D4A"
                    stroke="#F0D49E"
                    strokeWidth="1.2"
                  />
                  <text
                    x="285"
                    y="36"
                    textAnchor="middle"
                    className="font-display italic text-[10px] fill-[#111D4A] font-medium"
                  >
                    Destination
                  </text>
                  <text
                    x="285"
                    y="72"
                    textAnchor="middle"
                    className="font-sans font-bold text-[11px] fill-[#0B1325] tracking-wider uppercase"
                  >
                    {couple.originJourney.to}
                  </text>
                </g>

                {/* Traveling Authentic Passenger Airplane Icon */}
                <g
                  ref={planeRef}
                  className="will-change-transform pointer-events-none"
                >
                  <circle cx="-14" cy="-3" r="1.2" fill="#F0D49E" opacity="0.75" />
                  <circle cx="-20" cy="-3" r="0.8" fill="#D4A359" opacity="0.45" />
                  <circle cx="-14" cy="3" r="1.2" fill="#F0D49E" opacity="0.75" />
                  <circle cx="-20" cy="3" r="0.8" fill="#D4A359" opacity="0.45" />

                  <path
                    d="M 15 0 C 14.2 -0.8 12.5 -1.8 8.5 -1.8 L 3 -1.8 L -2 -13 C -2.6 -13.8 -4 -13.8 -4.5 -12.8 L -3 -1.8 L -8.5 -1.8 L -11.5 -7 C -12 -7.7 -13.2 -7.6 -13.4 -6.8 L -12.5 -1.5 L -15.5 -1 C -16.2 -0.5 -16.2 0.5 -15.5 1 L -12.5 1.5 L -13.4 6.8 C -13.2 7.6 -12 7.7 -11.5 7 L -8.5 1.8 L -3 1.8 L -4.5 12.8 C -4 13.8 -2.6 13.8 -2 13 L 3 1.8 L 8.5 1.8 C 12.5 1.8 14.2 0.8 15 0 Z"
                    fill="url(#flightPlaneGrad)"
                    stroke="#FFFDF7"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(200,157,84,0.75)]"
                  />

                  <rect x="-2.2" y="-4.8" width="4.5" height="1.8" rx="0.9" fill="#B88A45" stroke="#FFFDF7" strokeWidth="0.5" />
                  <rect x="-2.2" y="3.0" width="4.5" height="1.8" rx="0.9" fill="#B88A45" stroke="#FFFDF7" strokeWidth="0.5" />

                  <path d="M 10 -0.8 Q 12 0 10 0.8 Z" fill="#0B1325" />
                </g>
              </svg>

              {/* =============================================================
                  "TWO WORLDS, ONE HEART" SIGNATURE QUOTES BLOCK
                  ============================================================= */}
              <div className="mt-5 pt-4 border-t border-gold/30 w-full flex flex-col items-center">
                {/* Micro Header */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-gold/70" />
                  <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8C6D37] font-semibold">
                    Two Worlds, One Heart
                  </span>
                  <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-gold/70" />
                </div>

                {/* Dual Quote Cards */}
                <div className="w-full flex flex-col gap-2.5">
                  {/* Alida Quote */}
                  <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#FAF6EE] border border-gold/30 shadow-xs text-left">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A359] to-[#8C6D37] text-[#FFFDF7] flex items-center justify-center font-display font-bold text-[11px] shrink-0 shadow-xs">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-display font-semibold text-[12px] sm:text-[13px] text-[#0B1325] tracking-tight">
                          {couple.bride.name}
                        </span>
                        <span className="text-gold/70 text-[10px]">✦</span>
                        <span className="font-serif italic text-[11px] sm:text-xs text-[#16255C] leading-snug">
                          &ldquo;{couple.bride.oneLiner}&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vineeth Quote */}
                  <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#FAF6EE] border border-gold/30 shadow-xs text-left">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A359] to-[#8C6D37] text-[#FFFDF7] flex items-center justify-center font-display font-bold text-[11px] shrink-0 shadow-xs">
                      V
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-display font-semibold text-[12px] sm:text-[13px] text-[#0B1325] tracking-tight">
                          {couple.groom.name}
                        </span>
                        <span className="text-gold/70 text-[10px]">✦</span>
                        <span className="font-serif italic text-[11px] sm:text-xs text-[#16255C] leading-snug">
                          &ldquo;{couple.groom.oneLiner}&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
