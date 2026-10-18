/**
 * Audio manager that plays custom MP3 background music if provided,
 * or gracefully generates warm ambient acoustic celebration tones via Web Audio API.
 * Never autoplays without user interaction.
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
      // If user had initiated playback, switch to ambient synthesizer
      if (this.isPlayingState && !this.isSynthPlaying) {
        this.startAmbientSynth();
      }
    });
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
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
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlayingState = true;
          this.notify();
          return;
        }
      }
    } catch {
      // Audio file may not be uploaded yet or blocked by browser policy
      // Fallback to pleasant ambient acoustic harp tones
      this.startAmbientSynth();
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

  private startAmbientSynth() {
    if (this.isSynthPlaying || typeof window === 'undefined') return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isSynthPlaying = true;
      this.isPlayingState = true;
      this.notify();

      // Pentatonic warm chord progression (F# major / D# minor soothing harp frequencies)
      const notes = [277.18, 329.63, 369.99, 440.00, 554.37, 659.25, 739.99];
      let step = 0;

      const playChime = () => {
        if (!this.audioCtx || !this.isSynthPlaying) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        const freq = notes[step % notes.length];
        step = (step + 1) % notes.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 2.0);
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
