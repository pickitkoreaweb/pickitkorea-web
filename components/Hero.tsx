import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToUpload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Ambient Spotlight Effect */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         <div className="w-full h-full md:w-full md:h-full flex items-center justify-center opacity-80 md:opacity-100">
             <iframe 
                src='https://my.spline.design/metalcryptocreditcard-0N6iUXg47n3Zg8qjTcdGsG8X/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="w-full h-full pointer-events-auto scale-100 md:scale-110"
                title="Spline 3D Metal Card"
              ></iframe>
         </div>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20 pointer-events-none">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300">The Black Edition</span>
        </div>
        
        {/* Luxury Typography */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 animate-fade-in-up delay-100 drop-shadow-2xl leading-[0.9]">
          UNBREAKABLE<br />
          <span className="italic font-light opacity-90">Authourity.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light tracking-wide">
          무게가 주는 신뢰, 그 차가운 감각.<br/>
          PICKIT 프리미엄 메탈 카드로 당신의 격조를 완성하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto animate-fade-in-up delay-300">
          <a href="#process" onClick={scrollToUpload} className="group relative px-10 py-4 bg-white text-black rounded-none font-bold tracking-widest text-xs transition-all hover:bg-zinc-200 active:scale-95 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            CUSTOMIZE NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#features" onClick={scrollToFeatures} className="px-10 py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors bg-black/40 backdrop-blur-md font-bold tracking-widest text-xs rounded-none">
             DISCOVER MORE
          </a>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-600 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;