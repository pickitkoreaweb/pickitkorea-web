import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  setPage: (page: string) => void;
  bgImage?: string;
}

const Hero: React.FC<HeroProps> = ({ setPage, bgImage }) => {
  const backgroundUrl = bgImage || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2500&auto=format&fit=crop';

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Ambient Spotlight Effect - Cinematic & Deep */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[120%] h-[100vh] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none z-0 blur-3xl"></div>
      
      {/* 3D Background with Fallback */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         {/* Fallback Image - Visible if iframe fails to load or takes time */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transition-all duration-1000"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
         ></div>
         
         <div className="w-full h-full md:w-full md:h-full flex items-center justify-center opacity-80 md:opacity-100 relative z-10 scale-[0.8] md:scale-100">
             <iframe 
                src='https://my.spline.design/metalcryptocreditcard-0N6iUXg47n3Zg8qjTcdGsG8X/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="w-full h-full pointer-events-auto scale-[0.7] md:scale-105 lg:scale-115"
                title="Spline 3D Metal Card"
                loading="lazy"
              ></iframe>
         </div>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-[#050505]/40 pointer-events-none z-20"></div>
      </div>

      {/* Content - Editorial Layout */}
      <div className="relative z-30 text-center px-6 max-w-7xl mx-auto mt-0 md:mt-12 pointer-events-none w-full">
        
        <div className="inline-flex items-center gap-4 mb-10 animate-fade-in-up">
          <div className="h-[1px] w-8 bg-[#D4AF37] opacity-60"></div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] drop-shadow-md">Premium Metal Solution</span>
          <div className="h-[1px] w-8 bg-[#D4AF37] opacity-60"></div>
        </div>
        
        {/* Luxury Typography - Massive, Tight Tracking */}
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter mb-6 text-white animate-fade-in-up delay-100 drop-shadow-2xl leading-[0.85] mix-blend-overlay opacity-90">
          IMPRINT
        </h1>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-medium tracking-tight mb-10 text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 animate-fade-in-up delay-200">
          Yourself.
        </h2>
        
        <p className="text-xl md:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300 font-medium tracking-wide break-keep drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            당신을 돌아보게 만드는 특별함. <br className="md:hidden" />
            <strong className="text-[#D4AF37] font-bold">PICKIT KOREA</strong>가 <br className="md:hidden" />
            세상에 당신을 깊이 '각인'합니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto animate-fade-in-up delay-300 w-full sm:w-auto px-6 sm:px-0">
          <button 
            onClick={() => setPage('metal-custom')}
            className="w-full sm:w-auto group relative px-12 py-4 bg-white text-black font-bold tracking-[0.2em] text-[10px] transition-all hover:bg-[#D4AF37] flex items-center justify-center gap-4 overflow-hidden border border-transparent hover:border-[#D4AF37]"
          >
            <span className="relative z-10">CUSTOMIZE NOW</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform relative z-10" />
          </button>
          
          <button 
            onClick={() => setPage('materials')}
            className="w-full sm:w-auto px-12 py-4 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors bg-black/20 backdrop-blur-sm font-bold tracking-[0.2em] text-[10px]"
          >
             DISCOVER MATERIALS
          </button>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-700 flex-col items-center gap-4 pointer-events-none z-30">
        <span className="text-[9px] tracking-[0.3em] uppercase opacity-60">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-800 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;