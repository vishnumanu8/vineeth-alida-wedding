import React, { useMemo } from 'react';

interface AmbientDustParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
}

export const AmbientDustParticles: React.FC<AmbientDustParticlesProps> = ({
  count = 16,
  className = '',
}) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.floor(5 + Math.random() * 90),
      top: Math.floor(5 + Math.random() * 90),
      size: 2 + (i % 3) * 1.5,
      duration: 10 + (i % 5) * 3,
      delay: -(i * 1.5),
      opacity: 0.25 + (i % 4) * 0.15,
      driftX: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 10)),
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#F0D49E] shadow-[0_0_8px_#D4A359]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `ambientFloat ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
            transform: `translate3d(0, 0, 0)`,
          }}
        />
      ))}
      <style>{`
        @keyframes ambientFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          50% {
            transform: translate3d(12px, -35px, 0) scale(1.15);
          }
          100% {
            transform: translate3d(-10px, -70px, 0) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};
