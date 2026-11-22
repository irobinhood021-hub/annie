import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function VelvetCurtains({ data, isOpen, onOpen, onStartMusic }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [showAgeCelebration, setShowAgeCelebration] = useState(false);
  const [displayedAge, setDisplayedAge] = useState(data.previousAge || 17);
  const [isBurning, setIsBurning] = useState(false);

  // Countdown timer calculation to 23 Nov 2026
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = new Date(data.targetDate).getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [data.targetDate]);

  const handleOpenCurtains = () => {
    if (isOpen) return;

    sounds.playChime(440, 1.2, 'sine', 0.2);
    if (onStartMusic) onStartMusic();
    onOpen();

    // Trigger age reveal celebration
    setShowAgeCelebration(true);
    setIsBurning(false);
    setDisplayedAge(data.previousAge || 17);

    // Flip to 18
    setTimeout(() => {
      setDisplayedAge(data.targetAge || 18);
      sounds.playChime(659.25, 1.5, 'triangle', 0.25);

      // Fireworks Confetti burst
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#fbbf24', '#f43f5e', '#ffffff', '#ff8800']
      });
      setTimeout(() => {
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#f43f5e', '#fbbf24', '#ff8800']
        });
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#f43f5e', '#fbbf24', '#ff8800']
        });
      }, 300);
    }, 1100);

    // Trigger burning smooth disintegration after 2.8s
    setTimeout(() => {
      setIsBurning(true);
      sounds.playChime(280, 1.8, 'sawtooth', 0.08);
    }, 2800);

    // Completely close celebration modal once burned
    setTimeout(() => {
      setShowAgeCelebration(false);
      setIsBurning(false);
    }, 5000);
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={`relative ${isOpen ? 'pointer-events-none' : ''}`}>
      {/* Age Flip Animation Modal with Burning Disintegration Effect */}
      <AnimatePresence>
        {showAgeCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md pointer-events-auto overflow-hidden"
          >
            {/* Balloons flying upwards */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: '100vh', x: `${(i * 6.5) + (Math.random() * 4)}vw`, opacity: 0 }}
                  animate={{ y: '-20vh', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5 + Math.random() * 2, delay: i * 0.15, ease: 'easeOut' }}
                  className="absolute text-5xl"
                >
                  {['🎈', '🎈', '💖', '✨', '🎉', '🌸'][i % 6]}
                </motion.div>
              ))}
            </div>

            {/* Glowing Burning Embers & Fire Sparks rising when burning begins */}
            {isBurning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                {[...Array(42)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: `${40 + (Math.random() * 20 - 10)}vw`,
                      y: `${48 + (Math.random() * 15 - 7)}vh`,
                      scale: 1 + Math.random() * 1.5,
                      opacity: 1
                    }}
                    animate={{
                      y: `${10 - Math.random() * 35}vh`,
                      x: `${40 + (Math.random() * 30 - 15)}vw`,
                      scale: 0,
                      opacity: [1, 0.85, 0]
                    }}
                    transition={{
                      duration: 1.2 + Math.random() * 0.9,
                      ease: 'easeOut',
                      delay: Math.random() * 0.5
                    }}
                    className="absolute rounded-full"
                    style={{
                      width: `${3 + Math.random() * 6}px`,
                      height: `${3 + Math.random() * 6}px`,
                      backgroundColor: ['#FFD700', '#FF8C00', '#FF4500', '#FF2200', '#FFA500'][i % 5],
                      boxShadow: '0 0 10px #FF4500, 0 0 20px #FF8C00'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Main Level Up Display: Number + Name (Burns away smoothly) */}
            <div className={`text-center z-10 max-w-lg px-6 transition-all duration-300 ${isBurning ? 'burn-away' : ''}`}>
              <div className="text-amber-300 font-serif tracking-[0.25em] uppercase text-xs sm:text-sm mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Leveling Up • Officially 18</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>

              {/* Prominent Number 18 with 3D Flip & Burning Fire Glow */}
              <motion.div
                key={displayedAge}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className={`text-9xl sm:text-[11rem] font-serif font-black tracking-tight leading-none my-2 drop-shadow-[0_10px_35px_rgba(255,255,255,0.4)] ${
                  isBurning
                    ? 'text-transparent bg-clip-text bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 burning-glow'
                    : 'text-white'
                }`}
              >
                {displayedAge}
              </motion.div>

              {/* Name shown prominently with the number */}
              <div className="mt-4">
                <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wider ${
                  isBurning
                    ? 'text-transparent bg-clip-text bg-gradient-to-t from-orange-600 to-amber-300'
                    : 'text-amber-200'
                }`}>
                  {data.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-cream-100/80 mt-1">
                  {data.name} • 18th Birthday ✨
                </p>
                <p className="text-base text-cream-200/90 font-serif italic mt-3 max-w-sm mx-auto">
                  Wishing the most wonderful 18th milestone to {data.name}!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Fullscreen Velvet Curtains */}
      <div className={`fixed inset-0 z-40 overflow-hidden select-none transition-all duration-1000 ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        {/* Left Curtain */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isOpen ? '-105%' : '0%' }}
          transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
          className="absolute top-0 left-0 w-[53%] h-full z-20 origin-left"
        >
          <div className="w-full h-full curtain-fabric relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 curtain-shadow pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            {/* Tie-back golden rope on left */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-32 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-lg border border-amber-200/50" />
              <div className="w-6 h-8 rounded-full bg-amber-400 mt-1 shadow-md" />
            </div>
          </div>
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isOpen ? '105%' : '0%' }}
          transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
          className="absolute top-0 right-0 w-[53%] h-full z-20 origin-right"
        >
          <div className="w-full h-full curtain-fabric relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 curtain-shadow pointer-events-none" />

            {/* Tie-back golden rope on right */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-32 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-lg border border-amber-200/50" />
              <div className="w-6 h-8 rounded-full bg-amber-400 mt-1 shadow-md" />
            </div>

            <div className="absolute top-6 right-8 text-xs font-mono tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              special 18th edition
            </div>
          </div>
        </motion.div>

        {/* Center Golden Tie Crest / Seam */}
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.7 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="absolute w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Heading: Annie's Birthday */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs tracking-[0.25em] uppercase mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              A Special 18th Celebration
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-[#FFF8ED] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-tight">
              {data.name}'s Birthday
            </h1>
            <p className="text-amber-200/80 font-serif italic text-base sm:text-lg mt-2 tracking-wide">
              {data.name} • Turning 18 on 23 Nov 2026
            </p>
          </motion.div>

          {/* Split Flap Countdown Clocks to 23 Nov 2026 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-4"
          >
            {[
              { label: 'DAYS', value: pad(timeLeft.days) },
              { label: 'HOURS', value: pad(timeLeft.hours) },
              { label: 'MINS', value: pad(timeLeft.mins) },
              { label: 'SECS', value: pad(timeLeft.secs) },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-16 sm:w-24 md:w-28 h-20 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1E1919] via-[#2A2323] to-[#161212] border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.25)] pointer-events-none" />
                  <div className="absolute w-full h-[1.5px] bg-black/80 z-10 shadow-[0_1px_2px_rgba(255,255,255,0.1)]" />
                  <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F8F3E8] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {unit.value}
                  </span>
                </div>

                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-amber-200/70 mt-2 sm:mt-3 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Interactive Open Curtain Action Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-10"
          >
            <button
              onClick={handleOpenCurtains}
              className="relative group px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] text-white font-serif font-semibold text-base sm:text-lg tracking-wider shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:shadow-[0_15px_40px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Heart className="w-5 h-5 text-amber-200 fill-amber-200 animate-pulse" />
              <span>Tap to Open Stage</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </button>
            <p className="text-xs text-white/50 font-serif italic mt-3 tracking-wide">
              Click anywhere to draw the curtains & enter the celebration
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 cursor-pointer opacity-70 hover:opacity-100"
            onClick={handleOpenCurtains}
          >
            <ChevronDown className="w-8 h-8 text-amber-300" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
