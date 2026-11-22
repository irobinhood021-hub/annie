import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Sparkles, Smile, Phone, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function PhoneChat({ data }) {
  const [messages, setMessages] = useState(data.chat.initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    sounds.playPop();

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Trigger cute heart confetti
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.75 },
      colors: ['#f43f5e', '#fb7185', '#fda4af']
    });

    // Simulate cute auto-reply from Annie after 1.2s
    setTimeout(() => {
      sounds.playChime(659.25, 0.4, 'sine', 0.15);
      const replies = [
        "Awww you're the absolute sweetest!! 🥹💖",
        "This is officially the best birthday surprise ever! 🎉🥰",
        "Stop making me blush!! Love you to the moon and back ✨",
        "Can't wait to celebrate together! 🍰🥂"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'them',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <section id="chat" className="py-20 px-4 bg-[#F8F4EC] select-none">
      <div className="max-w-md mx-auto text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C2735]">
          A Midnight Conversation
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#2B2321] mt-1">
          Birthday Texts
        </h2>
        <p className="text-xs text-[#7A6C65] mt-1">
          Send a sweet birthday text to Annie directly in the chat below
        </p>
      </div>

      {/* Realistic iPhone Device Mockup matching the video */}
      <div className="max-w-[340px] sm:max-w-[360px] mx-auto bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[#2E2827]">
        {/* Screen Bezel */}
        <div className="bg-[#181414] rounded-[40px] overflow-hidden flex flex-col h-[620px] relative text-white">
          {/* Top Status Bar & Dynamic Island */}
          <div className="pt-3 px-6 flex items-center justify-between text-[11px] font-medium text-white/80 z-20">
            <span>11:11</span>
            {/* Dynamic Island */}
            <div className="w-24 h-6 rounded-full bg-black flex items-center justify-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Chat Header */}
          <div className="px-4 py-3 bg-[#241E1E]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-rose-400">
                <img
                  src={data.chat.avatar}
                  alt={data.chat.contactName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white leading-tight">
                  {data.chat.contactName}
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {data.chat.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
              <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs scrollbar-none flex flex-col">
            <div className="text-center my-1">
              <span className="text-[10px] text-white/40 bg-white/5 px-2.5 py-0.5 rounded-full font-mono">
                Midnight Birthday Thread
              </span>
            </div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-br-xs shadow-md'
                      : 'bg-[#2E2727] text-zinc-100 rounded-bl-xs border border-white/5'
                  }`}
                >
                  <p className="leading-relaxed font-sans">{msg.text}</p>
                </div>
                <span className="text-[9px] text-zinc-500 mt-1 px-1">
                  {msg.time}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-3 py-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {["I love you! 💖", "Happy Birthday! 🎂", "You look gorgeous ✨"].map((pill, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(pill)}
                className="whitespace-nowrap text-[10px] bg-white/10 hover:bg-white/20 text-rose-200 px-2.5 py-1 rounded-full border border-white/10 transition-colors cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#241E1E] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Send a birthday wish..."
              className="flex-1 bg-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="pb-2 pt-1 flex justify-center bg-[#241E1E]">
            <div className="w-32 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

