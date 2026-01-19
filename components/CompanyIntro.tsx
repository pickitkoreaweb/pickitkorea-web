import React from 'react';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Editorial Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-zinc-900"></div>

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
                         {/* Gold Foil Signature Effect - Korean Name */}
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#805e10] tracking-wider" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' }}>
                            김 정 우
                        </h3>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2"></div>
                    </div>
                    <p className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase mt-4">CEO, PICKIT KOREA</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;