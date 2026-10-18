/**
 * Audio manager that plays custom MP3 background music if provided,
 * or gracefully generates warm ambient acoustic celebration tones via Web Audio API.
 * Never autoplays without user interaction.
 * Supports smooth volume fade-in synchronised with the opening door reveal.
 */

class WeddingAudioManager {
  private audioEl: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isSynthPlaying = false;
  private synthInterval: number | null = null;
  private isPlayingState = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private hasMp3Loaded = false;
  private srcUrl: string = '';
  private masterGain: GainNode | null = null;

  init(src: string) {
    this.srcUrl = src;
    if (typeof window === 'undefined') return;

    this.audioEl = new Audio();
    this.audioEl.src = src;
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';

    this.audioEl.addEventListener('play', () => {
      this.isPlayingState = true;
      this.notify();
    });

    this.audioEl.addEventListener('pause', () => {
      this.isPlayingState = false;
      this.notify();
    });

    this.audioEl.addEventListener('canplaythrough', () => {
      this.hasMp3Loaded = true;
    });

    this.audioEl.addEventListener('error', () => {
      this.hasMp3Loaded = false;
      if (this.isPlayingState && !this.isSynthPlaying) {
        this.startAmbientSynth(true);
      }
    });
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlayingState));
  }

  get isPlaying(): boolean {
    return this.isPlayingState;
  }

  get isMp3Loaded(): boolean {
    return this.hasMp3Loaded;
  }

  async play(): Promise<void> {
    if (!this.audioEl && this.srcUrl) {
      this.init(this.srcUrl);
    }

    try {
      if (this.audioEl) {
        this.audioEl.volume = 0.65;
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlayingState = true;
          this.notify();
          return;
        }
      }
    } catch {
      this.startAmbientSynth(false);
    }
  }

  /**
   * Starts playback with an elegant volume fade-in timed to the door reveal.
   */
  async playWithFadeIn(fadeDurationMs = 2200, targetVolume = 0.65): Promise<void> {
    if (!this.audioEl && this.srcUrl) {
      this.init(this.srcUrl);
    }

    try {
      if (this.audioEl) {
        this.audioEl.volume = 0;
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlayingState = true;
          this.notify();

          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / fadeDurationMs);
            if (this.audioEl) {
              this.audioEl.volume = progress * targetVolume;
            }
            if (progress < 1 && this.isPlayingState) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          return;
        }
      }
    } catch {
      this.startAmbientSynth(true);
    }
  }

  pause(): void {
    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }
    this.stopAmbientSynth();
    this.isPlayingState = false;
    this.notify();
  }

  toggle(): void {
    if (this.isPlayingState) {
      this.pause();
    } else {
      this.play().catch(() => {});
    }
  }

  private startAmbientSynth(fadeIn = false) {
    if (this.isSynthPlaying || typeof window === 'undefined') return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.masterGain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      if (fadeIn) {
        this.masterGain.gain.setValueAtTime(0.0001, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.7, now + 2.0);
      } else {
        this.masterGain.gain.setValueAtTime(0.7, now);
      }

      this.masterGain.connect(this.audioCtx.destination);

      this.isSynthPlaying = true;
      this.isPlayingState = true;
      this.notify();

      // Pentatonic warm chord frequencies (soothing romantic harp arpeggios)
      const notes = [277.18, 329.63, 369.99, 440.0, 554.37, 659.25, 739.99];
      let step = 0;

      const playChime = () => {
        if (!this.audioCtx || !this.isSynthPlaying || !this.masterGain) return;
        const chimeTime = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        const freq = notes[step % notes.length];
        step = (step + 1) % notes.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeTime);

        noteGain.gain.setValueAtTime(0.0001, chimeTime);
        noteGain.gain.exponentialRampToValueAtTime(0.08, chimeTime + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 1.8);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(chimeTime);
        osc.stop(chimeTime + 2.0);
      };

      playChime();
      this.synthInterval = window.setInterval(playChime, 1800);
    } catch {
      this.isSynthPlaying = false;
      this.isPlayingState = false;
      this.notify();
    }
  }

  private stopAmbientSynth() {
    this.isSynthPlaying = false;
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {
        // ignore
      }
      this.audioCtx = null;
    }
  }
}

export const weddingAudio = new WeddingAudioManager();
