// Audio player & sound effects manager

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.bgAudio = null;
    this.musicTimer = null;
    this.onStateChangeCallbacks = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.bgAudio && typeof window !== 'undefined') {
      this.bgAudio = new Audio('/audio/birthday-song.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.75;

      this.bgAudio.addEventListener('ended', () => {
        if (this.isPlayingMusic) {
          this.bgAudio.currentTime = 0;
          this.bgAudio.play().catch(() => {});
        }
      });
    }
  }

  // Soft chime note
  playChime(freq = 523.25, duration = 0.8, type = 'sine', gainVal = 0.15) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Camera click sound for polaroids
  playCameraShutter() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Page turn rustle
  playPageTurn() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  // Cute pop when butterfly or note opens
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Toggle Background Music
  toggleBackgroundMusic(onStateChange) {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBackgroundMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startBackgroundMusic() {
    this.init();
    this.isPlayingMusic = true;

    if (this.bgAudio) {
      const playPromise = this.bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was blocked or audio failed, user interaction needed:", err);
          // Fallback to synth if mp3 fails
          this.startSynthMelody();
        });
      }
    } else {
      this.startSynthMelody();
    }
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  // Synthesizer melody fallback
  startSynthMelody() {
    if (!this.ctx) return;
    const melody = [
      { f: 261.63, d: 0.35, wait: 400 },
      { f: 261.63, d: 0.25, wait: 350 },
      { f: 293.66, d: 0.6, wait: 600 },
      { f: 261.63, d: 0.6, wait: 600 },
      { f: 349.23, d: 0.6, wait: 600 },
      { f: 329.63, d: 1.0, wait: 900 },
      { f: 261.63, d: 0.35, wait: 400 },
      { f: 261.63, d: 0.25, wait: 350 },
      { f: 293.66, d: 0.6, wait: 600 },
      { f: 261.63, d: 0.6, wait: 600 },
      { f: 392.00, d: 0.6, wait: 600 },
      { f: 349.23, d: 1.0, wait: 900 },
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const note = melody[noteIndex];
      this.playChime(note.f, note.d, 'triangle', 0.12);
      noteIndex = (noteIndex + 1) % melody.length;
      this.musicTimer = setTimeout(playNext, note.wait);
    };

    playNext();
  }
}

export const sounds = new SoundEffects();
