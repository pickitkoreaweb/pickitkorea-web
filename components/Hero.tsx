import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
         <iframe 
            src='https://my.spline.design/metalcryptocreditcard-0N6iUXg47n3Zg8qjTcdGsG8X/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full scale-100 md:scale-110 lg:scale-100 pointer-events-auto"
            title="Spline 3D Metal Card"
          ></iframe>
          {/* Overlay to ensure text readability if the 3D model gets too bright/busy, 
              but specifically fading out the bottom to blend with the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide uppercase text-zinc-300">New Collection Available</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 animate-fade-in-up delay-100">
          Unbreakable. <br />
          <span className="font-serif italic font-light text-white">Unmistakable.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          플라스틱을 넘어선 압도적인 무게감. <br/>
          PICKIT 프리미엄 메탈 카드로 당신의 지갑을 정의하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto animate-fade-in-up delay-300">
          <a href="#upload" className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            Customize Yours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#features" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-md">
            View Gallery
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
        <ChevronDown />
      </div>
    </section>
  );
};

export default Hero;