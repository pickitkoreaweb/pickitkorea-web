import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';

const LaunchPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for "do not show today" flag
    const hideUntil = localStorage.getItem('pickit_launch_popup_hide_until');
    const today = new Date().toDateString();

    if (hideUntil !== today) {
      // Add a small delay for better UX and animation effect
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem('pickit_launch_popup_hide_until', today);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
      <div className="relative w-full max-w-[400px] bg-[#0a0a0a] border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
        
        {/* Decorative Corner Borders */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]"></div>

        {/* Close Button (Top Right) */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content Area */}
        <div className="p-10 text-center relative z-10">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-8">
                <Bell className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">Coming Soon</span>
            </div>

            <h2 className="text-2xl font-serif text-white mb-2 tracking-wide">PICKIT OFFICIAL</h2>
            <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mb-8">Grand Opening Countdown</p>

            {/* D-DAY Display */}
            <div className="py-8 my-8 border-t border-b border-zinc-800 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent animate-shine"></div>
                 <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#FCE2C4] to-[#805e10] font-sans tracking-tighter drop-shadow-2xl">
                    D-30
                 </h1>
            </div>

            <div className="space-y-3 mb-8">
                <p className="text-white font-bold text-lg">2026. 03. 01 (SUN)</p>
                <div className="w-8 h-[1px] bg-zinc-700 mx-auto my-3"></div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                    사전 예약 고객 전원 <span className="text-[#D4AF37] font-bold">30% 할인</span> 혜택<br/>
                    지금 바로 멤버십에 가입하세요.
                </p>
            </div>

            <button 
                onClick={handleClose}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] hover:bg-[#FCE2C4] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] uppercase"
            >
                Enter Site
            </button>
        </div>

        {/* Footer Actions */}
        <div className="bg-zinc-900 border-t border-zinc-800 flex divide-x divide-zinc-800">
            <button 
                onClick={handleDontShowToday}
                className="flex-1 py-3 text-[10px] font-bold text-zinc-500 hover:text-white transition-colors"
            >
                오늘 하루 보지 않기
            </button>
            <button 
                onClick={handleClose}
                className="flex-1 py-3 text-[10px] font-bold text-zinc-500 hover:text-white transition-colors"
            >
                닫기
            </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPopup;