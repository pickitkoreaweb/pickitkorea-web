import React from 'react';
import { Download, Globe } from 'lucide-react';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Editorial Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-zinc-900 z-10"></div>

      {/* Background Kinetic Element: Slow Spinning Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
          <div className="absolute inset-0 border border-zinc-800 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-20 border border-zinc-800/50 rounded-full animate-spin-reverse-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
            <span className="inline-block mb-6">
                <Globe className="w-6 h-6 text-zinc-600 mx-auto animate-pulse" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                Not just a Card,<br/>
                It's a <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCE2C4] to-[#D4AF37] animate-shine bg-[length:200%_auto] pr-2">Statement.</span>
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
                    <p className="text-2xl text-zinc-500 mb-4 font-light font-serif">Sincerely,</p>
                    <div className="relative inline-block">
                         {/* White Script Signature */}
                        <h3 className="text-4xl md:text-5xl font-signature text-white font-normal tracking-wide transform -rotate-2 opacity-90">
                            김 정 우
                        </h3>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent mt-2"></div>
                    </div>
                    <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mt-4">CEO, PICKIT KOREA</p>
                </div>
            </div>
        </div>

        {/* Aesthetic Rotating Brand Mark */}
        <div className="mt-32 pt-20 border-t border-zinc-900 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Rotating Text Circle */}
                <div className="absolute inset-0 animate-spin-slow">
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                        <defs>
                            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="10" fill="#52525b" fontWeight="bold" letterSpacing="2">
                            <textPath xlinkHref="#circle">
                                PICKIT PREMIUM METAL INTERFACE • EST. 2026 •
                            </textPath>
                        </text>
                    </svg>
                </div>
                {/* Center Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#805e10] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <span className="text-black font-bold text-lg">P</span>
                </div>
            </div>
            <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase mt-8">Seoul • New York • Tokyo</p>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;