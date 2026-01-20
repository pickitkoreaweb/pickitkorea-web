import React from 'react';
import { Fingerprint, UserCheck, Star, ShieldCheck, ScanLine, Smartphone } from 'lucide-react';

const BusinessCardShowcase: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden perspective-1000">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-zinc-900/30 to-transparent pointer-events-none"></div>

      {/* Floating 3D Cubes (Background Decoration) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-20 h-20 border border-white/5 bg-white/5 backdrop-blur-sm transform rotate-45 animate-float-delayed"></div>
          <div className="absolute bottom-40 right-[20%] w-32 h-32 border border-white/5 bg-transparent transform -rotate-12 animate-float"></div>
          <div className="absolute top-1/2 left-[40%] w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-sm animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-semibold tracking-wide uppercase text-yellow-500">Premium Business Edition</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.1] text-white">
                당신을 증명하는 <br />
                <span className="text-zinc-500">단 하나의 메탈 명함.</span>
             </h2>
             
             <p className="text-lg text-zinc-400 mb-8 leading-relaxed break-keep">
                비즈니스의 시작은 명함을 건네는 순간부터입니다. <br className="hidden md:block"/>
                종이 명함으로는 담을 수 없는 무게감과 신뢰를 전달하세요. 
                PICKIT 프리미엄 메탈 명함은 단순한 정보 전달을 넘어, 
                당신의 품격을 대변하는 가장 강력한 비즈니스 도구입니다.
             </p>

             <ul className="space-y-4 mb-10 text-left">
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
                        <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Smart NFC Technology</h4>
                        <p className="text-sm text-zinc-400 mt-1">스마트폰 태깅으로 포트폴리오와 연락처를 즉시 전송하세요.</p>
                    </div>
                </li>
             </ul>

             <a href="#process" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
                Create Business Card
             </a>
          </div>

          {/* Visual Content - Single High-Quality Metal Business Card */}
          <div className="flex-1 w-full order-1 lg:order-2 flex justify-center items-center py-10">
             <div className="relative w-[340px] md:w-full max-w-[440px] aspect-[1.586/1] perspective-1000 group">
                
                {/* 3D Depth Layers for Thickness - Tighter radius for sharp metal look */}
                <div className="absolute inset-0 bg-zinc-800 rounded-lg transform translate-y-2 translate-x-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-500 shadow-2xl"></div>

                {/* Main Card Surface with Float Animation */}
                <div className="absolute inset-0 rounded-lg overflow-hidden border border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.7)] animate-float hover:animate-none transition-all duration-500 bg-[#121212]">
                    
                    {/* Metal Texture Base - Brushed Aluminum Dark */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] opacity-40 mix-blend-overlay"></div>
                    
                    {/* Design Layout: Asymmetrical Split */}
                    <div className="absolute inset-0 flex">
                        
                        {/* Left Content Area (Info) - 65% width */}
                        <div className="w-[65%] h-full p-6 md:p-8 flex flex-col justify-center relative z-10">
                            {/* Decorative Line */}
                            <div className="absolute top-8 left-8 w-8 h-[2px] bg-[#D4AF37]"></div>

                            {/* Name & Title */}
                            <div className="mt-4 mb-8 md:mb-10">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide mb-2 drop-shadow-md">Jeny Kim</h3>
                                <p className="text-[10px] text-[#D4AF37] font-bold tracking-[0.2em] uppercase">Executive Director</p>
                            </div>
                            
                            {/* Contact Details - Clean List */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-3 group/link cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center group-hover/link:border-[#D4AF37] transition-colors">
                                        <span className="text-[8px] text-zinc-500 group-hover/link:text-[#D4AF37]">M</span>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-zinc-400 font-medium tracking-wider group-hover/link:text-white transition-colors">+82 10 1234 5678</span>
                                </div>
                                <div className="flex items-center gap-3 group/link cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center group-hover/link:border-[#D4AF37] transition-colors">
                                        <span className="text-[8px] text-zinc-500 group-hover/link:text-[#D4AF37]">E</span>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-zinc-400 font-medium tracking-wider group-hover/link:text-white transition-colors">jeny.kim@pickit.com</span>
                                </div>
                                <div className="flex items-center gap-3 group/link cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center group-hover/link:border-[#D4AF37] transition-colors">
                                        <span className="text-[8px] text-zinc-500 group-hover/link:text-[#D4AF37]">W</span>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] text-zinc-400 font-medium tracking-wider group-hover/link:text-white transition-colors">www.pickit-korea.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content Area (Brand & Tech) - 35% width */}
                        <div className="w-[35%] h-full bg-gradient-to-br from-[#1a1a1a] to-black border-l border-zinc-800 flex flex-col items-center justify-between p-6 relative overflow-hidden">
                             {/* Subtle Pattern */}
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                             
                             {/* Gold Glow Effect */}
                             <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4AF37] rounded-full blur-[90px] opacity-10 pointer-events-none"></div>

                             {/* Top Logo Mark */}
                             <div className="relative z-10 w-full flex justify-end">
                                 <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center transform rotate-45">
                                     <div className="w-4 h-4 bg-[#D4AF37] transform rotate-45"></div>
                                 </div>
                             </div>

                             {/* Vertical Brand Text */}
                             <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                                <span className="text-zinc-700 font-bold text-[24px] md:text-[32px] opacity-20 transform -rotate-90 whitespace-nowrap tracking-[0.3em] absolute">PICKIT</span>
                             </div>
                             
                             {/* QR Code Area */}
                             <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 p-0.5 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-sm shadow-lg">
                                 <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
                                     <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-60 mix-blend-multiply scale-50"></div>
                                     <ScanLine className="absolute w-full h-full text-black opacity-20 p-2" />
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Dynamic Lighting/Sheen Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out"></div>
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