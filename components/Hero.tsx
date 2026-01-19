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
      {/* Ambient Spotlight Effect */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-white/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none z-0"></div>
      
      {/* 3D Background with Fallback */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         {/* Fallback Image - Visible if iframe fails to load or takes time */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen transition-all duration-1000"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
         ></div>
         
         <div className="w-full h-full md:w-full md:h-full flex items-center justify-center opacity-70 md:opacity-100 relative z-10">
             <iframe 
                src='https://my.spline.design/metalcryptocreditcard-0N6iUXg47n3Zg8qjTcdGsG8X/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="w-full h-full pointer-events-auto scale-[0.55] md:scale-110"
                title="Spline 3D Metal Card"
                loading="lazy"
              ></iframe>
         </div>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none z-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl mx-auto mt-0 md:mt-20 pointer-events-none w-full">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 md:mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300">The Black Edition</span>
        </div>
        
        {/* Luxury Typography - Refined Gradients */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 animate-fade-in-up delay-100 drop-shadow-2xl leading-[1.2] md:leading-[0.9] pb-2">
          UNBREAKABLE<br />
          <span className="font-light opacity-90 text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Authority.</span>
        </h1>
        
        <p className="text-sm md:text-xl text-zinc-400 mb-8 md:mb-12 max-w-xs md:max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light tracking-wide break-keep">
          무게가 주는 신뢰, 그 차가운 감각.<br/>
          PICKIT 프리미엄 메탈 카드로 당신의 격조를 완성하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pointer-events-auto animate-fade-in-up delay-300 w-full sm:w-auto px-6 sm:px-0">
          <button 
            onClick={() => setPage('metal-custom')}
            className="w-full sm:w-auto group relative px-8 md:px-10 py-4 bg-white text-black rounded-none font-bold tracking-widest text-xs transition-all hover:bg-[#D4AF37] hover:text-black flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] group-hover:animate-shine z-10"></div>
            <span className="relative z-20">CUSTOMIZE NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-20" />
          </button>
          
          <button 
            onClick={() => setPage('materials')}
            className="w-full sm:w-auto px-8 md:px-10 py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors bg-black/40 backdrop-blur-md font-bold tracking-widest text-xs rounded-none"
          >
             DISCOVER MORE
          </button>
        </div>
      </div>

      {/* Elegant Scroll Indicator - Refined */}
      <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600 flex-col items-center gap-2 pointer-events-none z-30">
        <span className="text-[9px] tracking-[0.3em] uppercase opacity-40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;