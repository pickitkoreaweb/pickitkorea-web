import React from 'react';
import { Fingerprint, UserCheck, Star, ShieldCheck } from 'lucide-react';

const BusinessCardShowcase: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden perspective-1000">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-zinc-900/30 to-transparent pointer-events-none"></div>

      {/* Floating 3D Cubes (Background Decoration) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-20 h-20 border border-white/5 bg-white/5 backdrop-blur-sm transform rotate-45 animate-float-delayed"></div>
          <div className="absolute bottom-40 right-[20%] w-32 h-32 border border-white/5 bg-transparent transform -rotate-12 animate-float"></div>
          <div className="absolute top-1/2 left-[40%] w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-sm animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-semibold tracking-wide uppercase text-yellow-500">Premium Business Edition</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.1] text-white">
                당신을 증명하는 <br />
                <span className="text-zinc-500">단 하나의 메탈 명함.</span>
             </h2>
             
             <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                비즈니스의 시작은 명함을 건네는 순간부터입니다. <br />
                종이 명함으로는 담을 수 없는 무게감과 신뢰를 전달하세요. 
                PICKIT 프리미엄 메탈 명함은 단순한 정보 전달을 넘어, 
                당신의 품격을 대변하는 가장 강력한 비즈니스 도구입니다.
             </p>

             <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Unforgettable First Impression</h4>
                        <p className="text-sm text-zinc-400 mt-1">건네는 순간, 상대방의 기억에 강렬하게 각인됩니다.</p>
                    </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                        <Fingerprint className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Unique Identity</h4>
                        <p className="text-sm text-zinc-400 mt-1">레이저 각인으로 완성되는 나만의 아이덴티티.</p>
                    </div>
                </li>
             </ul>

             <a href="#process" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
                Create Business Card
             </a>
          </div>

          {/* Visual Content - Single High-Quality Metal Card */}
          <div className="flex-1 w-full order-1 lg:order-2 flex justify-center items-center py-10">
             <div className="relative w-full max-w-[420px] aspect-[1.586/1] perspective-1000 group transform scale-[0.85] md:scale-100">
                
                {/* 3D Depth Layers for Thickness */}
                <div className="absolute inset-0 bg-zinc-700 rounded-xl transform translate-y-1 translate-x-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500"></div>
                <div className="absolute inset-0 bg-zinc-800 rounded-xl transform translate-y-0.5 translate-x-0.5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 duration-500"></div>

                {/* Main Card Surface with Float Animation */}
                <div className="absolute inset-0 rounded-xl overflow-hidden flex flex-col justify-between p-8 bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-700 animate-float hover:animate-none transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                    
                    {/* Metal Texture Base */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-[#111] to-black"></div>

                    {/* Anisotropic Shine (Metal effect) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-80 pointer-events-none"></div>
                    <div className="absolute -inset-full top-[-100%] left-[-100%] block w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)] rotate-45 transform pointer-events-none group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-1000"></div>

                    {/* Top Section */}
                    <div className="flex justify-between items-center z-10 relative">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full border border-zinc-600 bg-gradient-to-b from-zinc-700 to-zinc-800 flex items-center justify-center shadow-inner">
                                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                             </div>
                             <span className="text-zinc-500 text-xs tracking-[0.2em] font-medium">PICKIT METAL</span>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono tracking-widest border border-zinc-800 px-2 py-1 rounded">
                            MEMBER SINCE 2026
                        </div>
                    </div>

                    {/* Middle Section - Name & Title */}
                    <div className="z-10 relative my-auto">
                        <h3 className="text-3xl md:text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-md tracking-tight mb-2">
                            KIM JENY
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-zinc-700"></div>
                            <p className="text-xs font-semibold text-zinc-400 tracking-[0.3em] uppercase">CEO</p>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end z-10 relative">
                        <div className="text-[9px] text-zinc-500 font-medium tracking-wider space-y-1">
                           <p>+82 10 1234 5678</p>
                           <p>JENY.KIM@PICKIT.COM</p>
                           <p>SEOUL, KOREA</p>
                        </div>
                        
                        {/* QR / Logo Area */}
                        <div className="w-12 h-12 border border-zinc-800 bg-black/50 p-1 rounded flex items-center justify-center">
                             <div className="w-full h-full border border-zinc-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* Added Process Section */}
        <div className="mt-24 pt-12 border-t border-zinc-900/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">01. Order</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">고객이 원하는 디자인으로 주문 즉시 제작에 들어갑니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">02. Production</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">제작기간은 2~3일 소요되며 이후 순차적으로 발송됩니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">03. Inspection</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">제품 발송 전 검수된 제품의 실사 이미지를 전달드립니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">04. Warranty</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        구매 후 6개월간 무상 A/S를 지원합니다. <br/>
                        (당사 귀책사유 외 파손/변질은 불가)
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCardShowcase;