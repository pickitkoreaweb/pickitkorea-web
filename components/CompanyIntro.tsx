import React from 'react';
import { Download } from 'lucide-react';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Editorial Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-zinc-900 z-10"></div>

      {/* Background Kinetic Element: Slow Spinning Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 border border-zinc-800 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-10 border border-zinc-800/50 rounded-full animate-spin-reverse-slow"></div>
          <div className="absolute inset-32 border border-zinc-900 rounded-full animate-spin-slow duration-[30s]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 border border-zinc-800 rounded-full text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-8 bg-zinc-950">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Not just a Card,<br/>
                It's a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCE2C4] to-[#D4AF37] animate-shine bg-[length:200%_auto]">Statement.</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-lg font-light leading-relaxed text-zinc-400">
            <div className="text-right md:pr-12 border-r-0 md:border-r border-zinc-900 pt-8">
                <p className="mb-8">
                    <strong className="text-white font-medium">PICKIT KOREA</strong>는 '소유'의 가치를 재정의합니다. 
                    손끝에 닿는 차가운 금속의 감촉, 빛을 머금은 정교한 각인. 
                    우리는 단순한 지불 수단을 넘어, 당신의 페르소나를 완성하는 오브제를 만듭니다.
                </p>
                <p>
                    플라스틱이 줄 수 없는 18g의 묵직함. <br/>
                    테이블 위에 카드를 내려놓는 그 짧은 순간, <br/>
                    당신을 바라보는 시선이 달라집니다.
                </p>
            </div>
            <div className="text-left md:pl-12 pt-8">
                <p className="mb-8">
                    우리는 당신이 원하는 그 어떤 디자인이든, <br/>
                    가장 완벽한 형태의 금속으로 구현해냅니다. <br/>
                    오직 당신만을 위해 존재하는 단 하나의 마스터피스.
                </p>
                <div className="mt-16">
                    <p className="text-2xl text-zinc-500 mb-4 font-light">Sincerely,</p>
                    <div className="relative inline-block">
                         {/* White Script Signature */}
                        <h3 className="text-4xl md:text-5xl font-signature text-white font-normal tracking-wide transform -rotate-2" style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                            김 정 우
                        </h3>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent mt-2"></div>
                    </div>
                    <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mt-4">CEO, PICKIT KOREA</p>
                </div>
            </div>
        </div>

        {/* Brand Identity / Instagram Profile Asset */}
        <div className="mt-32 pt-20 border-t border-zinc-900 flex flex-col items-center">
            <h4 className="text-white font-serif text-2xl mb-8">Brand Identity</h4>
            <p className="text-zinc-500 text-sm mb-12 max-w-md text-center">
                PICKIT의 공식 브랜드 심볼입니다. <br/>
                인스타그램 및 소셜 미디어 프로필에 최적화된 디자인입니다.
            </p>
            
            <div className="relative group perspective-1000">
                {/* The Logo Container - Designed to be screenshotted */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-y-6 overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    
                    {/* The Icon */}
                    <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#D4AF37] to-[#805e10] rounded-none transform rotate-45 flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] mb-8">
                         <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-950 rounded-full transform -rotate-45 border border-[#D4AF37]/50"></div>
                         {/* Shine */}
                         <div className="absolute inset-0 bg-white/20 blur-md rounded-none transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                    </div>

                    {/* Text */}
                    <h1 className="relative z-10 text-2xl md:text-3xl font-bold tracking-[0.4em] text-white pl-2 drop-shadow-lg">
                        PICKIT
                    </h1>
                    <span className="relative z-10 text-[8px] md:text-[10px] text-[#D4AF37] tracking-[0.6em] uppercase mt-2 font-medium">
                        KOREA
                    </span>

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#D4AF37]/50"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#D4AF37]/50"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#D4AF37]/50"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#D4AF37]/50"></div>
                </div>

                <div className="absolute -bottom-12 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-zinc-500 flex items-center justify-center gap-2">
                        <Download className="w-3 h-3" /> Right click to save image
                    </span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;