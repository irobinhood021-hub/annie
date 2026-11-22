import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function Footer({ data }) {
  const triggerCelebration = () => {
    sounds.playChime(523.25, 1.2, 'triangle', 0.25);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.8 },
      colors: ['#e11d48', '#fb7185', '#fbbf24', '#ffffff']
    });
  };

  return (
    <footer className="py-16 px-6 bg-[#211A1A] text-[#FFF8ED] text-center border-t border-amber-500/20 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-mono uppercase tracking-widest border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          To Another Incredible Year
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h3 className="text-4xl sm:text-5xl font-serif tracking-tight text-white">
          Happy Birthday {data.name}!
        </h3>

        <p className="text-sm sm:text-base text-zinc-300 font-serif italic max-w-lg mx-auto leading-relaxed">
          May your year ahead be filled with boundless joy, unforgettable memories, and dreams turning into reality.
        </p>

        <div className="pt-4">
          <button
            onClick={triggerCelebration}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-serif font-semibold text-sm tracking-wider shadow-lg hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Celebrate One More Time!</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-2">
          <span>Crafted with love for Annie's Special Day ❤️</span>
          <span>Birthday Special Edition • 2026</span>
        </div>
      </div>
    </footer>
  );
}

