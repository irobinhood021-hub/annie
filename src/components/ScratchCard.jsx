import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function ScratchCard({ data }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Golden silver luxury frosted overlay
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6D7C3');
    grad.addColorStop(0.5, '#F7F0E6');
    grad.addColorStop(1, '#D9C5AD');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative typography on scratch surface
    ctx.fillStyle = '#6E5D53';
    ctx.font = 'bold 24px Playfair Display, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Wishing you the best day', width / 2, height / 2 - 15);

    ctx.font = 'italic 16px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#8C2735';
    ctx.fillText('✨ Scratch here with your mouse ✨', width / 2, height / 2 + 20);

    // Subtle border pattern
    ctx.strokeStyle = 'rgba(140, 39, 53, 0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    setIsRevealed(false);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    checkRevealPercentage();
  };

  const handleMouseMove = (e) => {
    if (isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (isRevealed) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const checkRevealPercentage = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentCount = 0;
    const totalPixels = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) {
        transparentCount += 4;
      }
    }

    if (transparentCount / totalPixels > 0.45) {
      setIsRevealed(true);
      sounds.playChime(587.33, 1.2, 'triangle', 0.2);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fbbf24', '#fbcfe8']
      });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto text-center select-none">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C2735]">
          A Hidden Secret For You
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2321] mt-2">
          {data.scratchCard.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#73655E] mt-1">
          {data.scratchCard.subtitle}
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
        {/* Hidden Content underneath the scratch surface */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-50 to-amber-50">
          <img
            src={data.scratchCard.hiddenImage}
            alt="Secret Surprise"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="relative z-10 text-white max-w-xs text-center">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-400 mx-auto mb-2 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold mb-2">
              Happy Birthday {data.name}!
            </h3>
            <p className="font-cursive text-xl text-rose-200">
              {data.scratchCard.revealedMessage}
            </p>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={600}
          height={380}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Reset button */}
      <div className="mt-4">
        <button
          onClick={initCanvas}
          className="text-xs font-mono text-[#8A7A71] hover:text-[#2B2321] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Scratch Card</span>
        </button>
      </div>
    </section>
  );
}

