import React from 'react';
import { Sparkles, Music, Volume2, VolumeX, Heart } from 'lucide-react';

export default function Navbar({ isMusicPlaying, onToggleMusic, onReopenCurtains }) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#F8F4EC]/85 border-b border-[#E8DEC8]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-xs sm:text-sm tracking-wider uppercase font-medium text-[#574B46]">
        {/* Left Links matching Screenshot 2 */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <a href="#home" className="hover:text-rose-600 transition-colors relative py-1 border-b-2 border-rose-500 font-semibold text-[#2D2727]">
            Home
          </a>
          <a href="#ribbon" className="hover:text-rose-600 transition-colors">
            Moments
          </a>
          <a href="#scrapbook" className="hover:text-rose-600 transition-colors">
            Wishes
          </a>
        </nav>

        {/* Center Brand Monogram */}
        <div className="flex items-center gap-2 font-serif text-lg lowercase tracking-widest text-[#2D2727] select-none">
          <span className="font-bold uppercase tracking-wider text-sm font-sans">A</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span className="font-bold uppercase tracking-wider text-sm font-sans">18</span>
        </div>

        {/* Right Links matching Screenshot 2 & Audio Toggle */}
        <nav className="flex items-center gap-5 sm:gap-7">
          <a href="#scrapbook" className="hover:text-rose-600 transition-colors hidden md:inline-block">
            About
          </a>
          <a href="#magazine" className="hover:text-rose-600 transition-colors hidden md:inline-block">
            Services
          </a>
          <a href="#magazine" className="hover:text-rose-600 transition-colors hidden sm:inline-block">
            Contact
          </a>

          {/* Re-curtain trigger */}
          <button
            onClick={onReopenCurtains}
            title="Stage Intro"
            className="text-[11px] font-mono tracking-widest px-2.5 py-1 rounded-md border border-[#D5C7B0] hover:bg-[#EBE0CD] transition-all cursor-pointer text-[#4A3E39]"
          >
            Curtains
          </button>

          {/* Music button */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isMusicPlaying
                ? 'bg-rose-100/80 border-rose-300 text-rose-700 shadow-sm'
                : 'bg-white/60 border-[#D5C7B0] text-[#695D56] hover:bg-white'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                <span className="text-[11px] font-mono font-medium lowercase">melody on</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8A7C75]" />
                <span className="text-[11px] font-mono lowercase">music</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

