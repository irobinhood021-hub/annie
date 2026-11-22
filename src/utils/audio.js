// Audio player & sound effects manager

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.isScrapbookPlaying = false;
    this.activeTrack = 'birthday'; // 'birthday' | 'scrapbook'
    this.bgAudio = null;
    this.scrapbookAudio = null;
    this.musicTimer = null;
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifyStateChange() {
    this.subscribers.forEach(cb => {
      try {
        cb({
          isPlaying: this.isPlayingMusic,
          isScrapbookPlaying: this.isScrapbookPlaying,
          activeTrack: this.activeTrack
        });
      } catch (e) {}
    });
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
    }

    if (!this.scrapbookAudio && typeof window !== 'undefined') {
      this.scrapbookAudio = new Audio('/audio/scrapbook-song.mp3');
      this.scrapbookAudio.loop = true;
      this.scrapbookAudio.volume = 0.85;
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

  // Toggle Background Birthday Music
  toggleBackgroundMusic(onStateChange) {
    this.init();
    if (this.isPlayingMusic && this.activeTrack === 'birthday') {
      this.stopBackgroundMusic();
      if (onStateChange) onStateChange(false, 'birthday');
      return false;
    } else {
      this.startBackgroundMusic();
      if (onStateChange) onStateChange(true, 'birthday');
      return true;
    }
  }

  startBackgroundMusic() {
    this.init();
    // Stop scrapbook music if playing
    this.stopScrapbookMusic(false);

    this.isPlayingMusic = true;
    this.isScrapbookPlaying = false;
    this.activeTrack = 'birthday';

    if (this.bgAudio) {
      const playPromise = this.bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked/interaction needed:", err);
          this.startSynthMelody();
        });
      }
    } else {
      this.startSynthMelody();
    }
    this.notifyStateChange();
  }

  stopBackgroundMusic(notify = true) {
    if (this.activeTrack === 'birthday') {
      this.isPlayingMusic = false;
    }
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (notify) this.notifyStateChange();
  }

  // Scrapbook Section Dedicated Music
  toggleScrapbookMusic(onStateChange) {
    this.init();
    if (this.isScrapbookPlaying) {
      this.stopScrapbookMusic();
      if (onStateChange) onStateChange(false, 'scrapbook');
      return false;
    } else {
      this.startScrapbookMusic();
      if (onStateChange) onStateChange(true, 'scrapbook');
      return true;
    }
  }

  startScrapbookMusic() {
    this.init();
    // Stop birthday music so they do not overlap
    this.stopBackgroundMusic(false);

    this.isScrapbookPlaying = true;
    this.isPlayingMusic = true;
    this.activeTrack = 'scrapbook';

    if (this.scrapbookAudio) {
      const playPromise = this.scrapbookAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Scrapbook audio play err:", err);
        });
      }
    }
    this.notifyStateChange();
  }

  stopScrapbookMusic(notify = true) {
    this.isScrapbookPlaying = false;
    if (this.activeTrack === 'scrapbook') {
      this.isPlayingMusic = false;
    }
    if (this.scrapbookAudio) {
      this.scrapbookAudio.pause();
    }
    if (notify) this.notifyStateChange();
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
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlayingMusic || this.activeTrack !== 'birthday') return;
      const note = melody[noteIndex];
      this.playChime(note.f, note.d, 'triangle', 0.12);
      noteIndex = (noteIndex + 1) % melody.length;
      this.musicTimer = setTimeout(playNext, note.wait);
    };

    playNext();
  }
}

export const sounds = new SoundEffects();
