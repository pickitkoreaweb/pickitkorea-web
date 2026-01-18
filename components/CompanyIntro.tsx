import React from 'react';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <span className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-6 block animate-fade-in-up">About Us</span>
        
        {/* Changed from font-serif to font-sans (or removed serif class) to ensure Korean text renders with Noto Sans KR */}
        <h2 className="text-3xl md:text-5xl font-medium text-white mb-12 leading-tight animate-fade-in-up delay-100 font-sans">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">PICKIT KOREA</span>는 <br />
          당신을 가장 우아하게 빛내줄 <br />
          {/* Removed italic, added font-bold for unified look */}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">단 하나의 프리미엄 서비스</span>를 제공합니다.
        </h2>

        <div className="space-y-6 text-zinc-400 text-lg md:text-xl font-light leading-relaxed animate-fade-in-up delay-200 break-keep">
          <p>
            우리는 '소유'의 가치를 재정의합니다. <br />
            손끝에 닿는 차가운 금속의 감촉, 빛을 머금은 정교한 각인, <br />
            그리고 당신이 원하는 그 어떤 것이든 세계 어디서든 찾아내는 집요함까지.
          </p>
          <p>
            PICKIT KOREA는 단순한 커스텀 카드 제조사를 넘어, <br />
            당신의 라이프스타일 전반을 아우르는 하이엔드 컨시어지가 되고자 합니다.
          </p>
          <p>
            남들과 다른 무게감을 원하신다면, <br />
            가장 빛나는 선택은 언제나 PICKIT입니다.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center animate-fade-in-up delay-300">
          <div className="w-px h-16 bg-gradient-to-b from-zinc-800 to-transparent mb-8"></div>
          <p className="text-zinc-300 font-serif italic text-xl mb-2">Sincerely,</p>
          <h3 className="text-2xl font-bold tracking-widest text-white uppercase mb-1">KIM JEONG WOO</h3>
          <p className="text-sm text-zinc-500 tracking-wider">CEO, PICKIT KOREA</p>
          <p className="mt-6 text-zinc-400 text-sm font-medium tracking-wide">PICKIT KOREA 대표 김정우 배상</p>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;