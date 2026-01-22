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
      {/* Ambient Spotlight Effect - More subtle and dispersed */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[800px] bg-white/3 rounded-full blur-[180px] pointer-events-none z-0"></div>
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505]/60 pointer-events-none z-20"></div>
      </div>

      {/* Content - Big Tech Typography */}
      <div className="relative z-30 text-center px-6 max-w-7xl mx-auto mt-0 md:mt-24 pointer-events-none w-full">
        
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl mb-8 animate-fade-in-up shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-200">The New Standard of Luxury</span>
        </div>
        
        {/* Luxury Typography - Massive, Tight Tracking */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 animate-fade-in-up delay-100 drop-shadow-2xl leading-[0.85]">
          UNBREAKABLE<br />
          <span className="font-serif font-medium italic opacity-90 text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">Authority.</span>
        </h1>
        
        <p className="text-sm md:text-lg text-zinc-400 mb-12 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200 font-light tracking-wide break-keep">
            무게가 주는 압도적인 신뢰. <br className="md:hidden" />
            PICKIT 프리미엄 메탈 카드로 <br className="md:hidden" />
            당신의 비즈니스에 품격을 더하십시오.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pointer-events-auto animate-fade-in-up delay-300 w-full sm:w-auto px-6 sm:px-0">
          <button 
            onClick={() => setPage('metal-custom')}
            className="w-full sm:w-auto group relative px-10 py-4 bg-white text-black font-bold tracking-[0.15em] text-xs transition-all hover:bg-[#D4AF37] flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">CUSTOMIZE NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
          </button>
          
          <button 
            onClick={() => setPage('materials')}
            className="w-full sm:w-auto px-10 py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors bg-black/40 backdrop-blur-md font-bold tracking-[0.15em] text-xs"
          >
             DISCOVER MATERIALS
          </button>
        </div>
      </div>

      {/* Elegant Scroll Indicator - Refined */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-600 flex-col items-center gap-3 pointer-events-none z-30 opacity-60">
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-800 via-zinc-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;