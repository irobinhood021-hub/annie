import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, QrCode, ShieldCheck, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function LanyardBadge({ data }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate 3D tilt
    const rotateX = -(mouseY / (card.height / 2)) * 14;
    const rotateY = (mouseX / (card.width / 2)) * 14;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 px-4 bg-[#F5EFE4] border-t border-[#E5DAC8] text-center select-none overflow-hidden">
      <div className="max-w-md mx-auto mb-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C2735]">
          All Access VIP Pass
        </span>
        <h2 className="text-3xl font-serif text-[#2B2321] mt-1">
          Exclusive Birthday Access
        </h2>
        <p className="text-xs text-[#7A6C65] mt-1">
          Move your mouse to interact with the hanging lanyard badge
        </p>
      </div>

      <div
        className="relative max-w-sm mx-auto flex flex-col items-center pt-8 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => sounds.playPop()}
        style={{ perspective: 1000 }}
      >
        {/* Hanging Lanyard Strap / Cord */}
        <div className="w-6 h-36 bg-gradient-to-b from-[#2A2321] to-[#1C1818] shadow-md relative flex items-center justify-center">
          <div className="w-1 h-full border-l border-dashed border-white/20" />
          <span className="text-[7px] text-white/50 tracking-widest uppercase rotate-90 whitespace-nowrap font-mono">
            VIP • VIP • VIP
          </span>
        </div>

        {/* Silver Metal Swivel Clip */}
        <div className="w-10 h-7 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-400 rounded-sm shadow-md border border-zinc-400 flex items-center justify-center -mt-1 z-10">
          <div className="w-3 h-3 rounded-full bg-zinc-600/30" />
        </div>

        {/* 3D Tilting Plastic Badge Container */}
        <motion.div
          animate={{
            rotateX: rotate.x,
            rotateY: rotate.y,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          className="relative w-64 sm:w-72 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E7] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#E3D7C4] text-left mt-[-2px]"
        >
          {/* Top ID slot cut-out */}
          <div className="w-16 h-3 rounded-full bg-[#E5DAC8] mx-auto mb-4 shadow-inner" />

          {/* Badge Header */}
          <div className="flex items-center justify-between border-b border-[#E8DFC9] pb-3 mb-4">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#8C2735] font-bold">
                BIRTHDAY SPECIAL
              </div>
              <div className="text-xs font-serif font-bold text-[#2B2321]">
                {data.lanyard.title}
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>

          {/* Photo & Pass Info */}
          <div className="flex gap-3 items-center mb-4">
            <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-200 border border-[#D5C7B0] flex-shrink-0 shadow-sm">
              <img
                src={data.lanyard.photo}
                alt="VIP Pass Photo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#8A7B73]">PASS HOLDER</div>
              <div className="text-lg font-serif font-black text-[#1C1818] tracking-wider">
                {data.lanyard.name}
              </div>
              <div className="text-[11px] font-sans font-semibold text-rose-600">
                {data.lanyard.access}
              </div>
              <div className="text-[9px] font-mono text-[#998980]">
                {data.lanyard.validity}
              </div>
            </div>
          </div>

          {/* Hologram Bar & Barcode */}
          <div className="rounded-lg bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 p-2 text-center shadow-inner mb-3">
            <div className="text-[9px] font-mono tracking-widest uppercase text-zinc-800 font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              AUTHENTICATED WITH LOVE
              <Sparkles className="w-3 h-3 text-amber-600" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E8DFC9] text-[9px] font-mono text-[#8C7A70]">
            <span>ID: {data.lanyard.badgeNumber}</span>
            <span className="flex items-center gap-1 text-rose-600">
              <Heart className="w-3 h-3 fill-rose-600" /> 100% Love
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

