import confetti from 'canvas-confetti';

/**
 * Fires an elegant, refined wedding-themed confetti explosion
 * with Antique Gold, Botanical Green, Champagne, and Rose Petal tones.
 */
export function fireWeddingCelebration() {
  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
    colors: ['#B88A45', '#D4A359', '#315B4B', '#C77F83', '#F4E8D8', '#FFF9F1'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-tier elegant burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
