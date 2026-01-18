import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.5 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Completely remove from DOM after fade out is done (3.5s total)
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative">
        {/* Logo Animation */}
        <div className="w-16 h-16 bg-gradient-to-br from-white to-zinc-500 rounded-none transform rotate-45 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-pulse">
            <div className="w-6 h-6 bg-black rounded-full transform -rotate-45"></div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold tracking-[0.5em] text-white mb-2 animate-fade-in-up">PICKIT</h1>
        <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase animate-pulse">Premium Metal Interface</p>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-[1px] bg-zinc-900 overflow-hidden">
        <div className="h-full bg-white w-full animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  );
};

export default Preloader;