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
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         <div className="w-full h-full md:w-full md:h-full flex items-center justify-center">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 md:mt-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide uppercase text-zinc-300">New Collection Available</span>
        </div>
        
        {/* Updated Typography: Uniform Bold Style */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white animate-fade-in-up delay-100 drop-shadow-2xl leading-none">
          UNBREAKABLE. <br />
          UNMISTAKABLE.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-md">
          플라스틱을 넘어선 압도적인 무게감. <br/>
          PICKIT 프리미엄 메탈 카드로 당신의 지갑을 정의하세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto animate-fade-in-up delay-300">
          <a href="#process" onClick={scrollToUpload} className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            Customize Yours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#features" onClick={scrollToFeatures} className="px-8 py-4 rounded-full border border-white/20 bg-black/30 hover:bg-white/10 transition-colors backdrop-blur-md">
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