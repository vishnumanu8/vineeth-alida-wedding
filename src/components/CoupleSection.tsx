import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../config/weddingConfig';
import { WeddingImage } from './WeddingImage';

gsap.registerPlugin(ScrollTrigger);

export const CoupleSection: React.FC = () => {
  const { couple, family } = weddingConfig;

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
      className="relative py-14 sm:py-24 px-4 sm:px-6 bg-pearl text-charcoal overflow-hidden"
    >
      {/* Subtle top transition gradient from hero dark emerald */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      {/* Subtle radiant background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-champagne/45 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            FAMILY INVITATION HEADLINE & MESSAGE
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-8 sm:mb-12 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display italic text-xs sm:text-sm text-gold tracking-widest uppercase font-medium">
              {family.invitationHeadline}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight leading-tight">
            Our New Journey Begins
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-slate mt-3 leading-relaxed">
            {family.invitationMessage}
          </p>

          {/* ===================================================================
              ANIMATED DUBAI ✈ KERALA FLIGHT ROUTE (Scroll-Linked Scrub)
              =================================================================== */}
          {couple.originJourney && (
            <div
              ref={flightRouteRef}
              className="mt-6 w-full max-w-xs sm:max-w-sm flex flex-col items-center select-none"
              aria-label="Flight journey from Dubai to Kerala"
            >
              <svg
                viewBox="0 0 320 80"
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

                {/* Animated Gold Flight Path (Progressively draws on scroll) */}
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
                    y="38"
                    textAnchor="middle"
                    className="font-display italic text-[10px] fill-[#B88A45]"
                  >
                    Departure
                  </text>
                  <text
                    x="35"
                    y="72"
                    textAnchor="middle"
                    className="font-sans font-semibold text-[11px] fill-[#11211A] tracking-wider uppercase"
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
                    stroke="#315B4B"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                  <circle
                    cx="285"
                    cy="52"
                    r="3.5"
                    fill="#315B4B"
                    stroke="#F0D49E"
                    strokeWidth="1.2"
                  />
                  <text
                    x="285"
                    y="38"
                    textAnchor="middle"
                    className="font-display italic text-[10px] fill-[#315B4B]"
                  >
                    Destination
                  </text>
                  <text
                    x="285"
                    y="72"
                    textAnchor="middle"
                    className="font-sans font-semibold text-[11px] fill-[#11211A] tracking-wider uppercase"
                  >
                    {couple.originJourney.to}
                  </text>
                </g>

                {/* Traveling Authentic Passenger Airplane Icon */}
                <g
                  ref={planeRef}
                  className="will-change-transform pointer-events-none"
                >
                  {/* Luminous engine trail / contrail */}
                  <circle cx="-14" cy="-3" r="1.2" fill="#F0D49E" opacity="0.75" />
                  <circle cx="-20" cy="-3" r="0.8" fill="#D4A359" opacity="0.45" />
                  <circle cx="-14" cy="3" r="1.2" fill="#F0D49E" opacity="0.75" />
                  <circle cx="-20" cy="3" r="0.8" fill="#D4A359" opacity="0.45" />

                  {/* Authentic Passenger Airliner Silhouette */}
                  <path
                    d="M 15 0 C 14.2 -0.8 12.5 -1.8 8.5 -1.8 L 3 -1.8 L -2 -13 C -2.6 -13.8 -4 -13.8 -4.5 -12.8 L -3 -1.8 L -8.5 -1.8 L -11.5 -7 C -12 -7.7 -13.2 -7.6 -13.4 -6.8 L -12.5 -1.5 L -15.5 -1 C -16.2 -0.5 -16.2 0.5 -15.5 1 L -12.5 1.5 L -13.4 6.8 C -13.2 7.6 -12 7.7 -11.5 7 L -8.5 1.8 L -3 1.8 L -4.5 12.8 C -4 13.8 -2.6 13.8 -2 13 L 3 1.8 L 8.5 1.8 C 12.5 1.8 14.2 0.8 15 0 Z"
                    fill="url(#flightPlaneGrad)"
                    stroke="#FFFDF7"
                    strokeWidth="0.85"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_8px_rgba(200,157,84,0.75)]"
                  />

                  {/* Twin Jet Engines under main wings */}
                  <rect x="-2.2" y="-4.8" width="4.5" height="1.8" rx="0.9" fill="#B88A45" stroke="#FFFDF7" strokeWidth="0.5" />
                  <rect x="-2.2" y="3.0" width="4.5" height="1.8" rx="0.9" fill="#B88A45" stroke="#FFFDF7" strokeWidth="0.5" />

                  {/* Cockpit Window Accent */}
                  <path
                    d="M 10 -0.8 Q 12 0 10 0.8 Z"
                    fill="#07130E"
                  />
                </g>
              </svg>

              {/* Note below flight trajectory */}
              <p className="text-slate/75 text-[11px] sm:text-xs font-sans mt-1.5 tracking-wide font-light">
                • {couple.originJourney.note} •
              </p>
            </div>
          )}
        </motion.div>

        {/* ===================================================================
            COUPLE PROFILE CARDS WITH PORTRAITS & SUBTLE ONE-LINERS
            =================================================================== */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-pearl border border-champagne-border/90 shadow-wedding flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/50 transition-colors"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/45 mb-4 shadow-sm">
              <WeddingImage
                src={couple.groom.portrait}
                alt={couple.groom.fullName}
                fallbackTitle={couple.groom.name}
                fallbackSubtitle={couple.groom.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">
              {couple.groom.title}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
              {couple.groom.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-3">
              {couple.groom.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.groom.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/80 px-3.5 py-2 rounded-xl border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.groom.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-pearl border border-champagne-border/90 shadow-wedding flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/50 transition-colors"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/45 mb-4 shadow-sm">
              <WeddingImage
                src={couple.bride.portrait}
                alt={couple.bride.fullName}
                fallbackTitle={couple.bride.name}
                fallbackSubtitle={couple.bride.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">
              {couple.bride.title}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
              {couple.bride.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-3">
              {couple.bride.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.bride.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/80 px-3.5 py-2 rounded-xl border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.bride.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>
        </div>

        {/* ===================================================================
            FAMILY BLESSINGS NOTE
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-rose mb-2">
            <Heart className="w-4 h-4 fill-rose text-rose" />
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <Heart className="w-4 h-4 fill-rose text-rose" />
          </div>
          <p className="font-display italic text-sm sm:text-base text-slate">
            {family.warmClosing}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2.5 text-xs font-medium text-botanical">
            {family.hosts.map((host, idx) => (
              <span key={idx} className="px-4 py-1.5 rounded-full bg-champagne/45 border border-gold/25">
                {host}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
