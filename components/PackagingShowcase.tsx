import React, { useState } from 'react';
import { Package, Gift, Award, MousePointerClick, Sparkles } from 'lucide-react';

const PackagingShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Visual Part: Interactive 3D Box */}
            <div className="w-full lg:w-1/2 min-h-[400px] flex items-center justify-center perspective-1000">
                <div 
                    className="relative w-3/4 max-w-[400px] aspect-square transition-all duration-700 preserve-3d cursor-pointer group"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ transform: isOpen ? 'rotateX(10deg) translateY(20px)' : 'rotateX(10deg)' }}
                >
                    {/* Interaction Hint */}
                    <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce border border-[#D4AF37]">
                            <MousePointerClick className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase animate-pulse">Tap to Unbox</p>
                    </div>

                    {/* Box Base Shadow */}
                    <div className={`absolute top-[90%] left-[5%] w-[90%] h-12 bg-black/60 blur-2xl transition-all duration-1000 ${isOpen ? 'scale-110 opacity-80' : 'scale-90 opacity-50'}`}></div>

                    {/* Box Lid (Top) - The moving part */}
                    <div 
                        className={`absolute top-0 left-0 w-full h-full bg-[#111] border border-zinc-800 rounded-lg shadow-2xl flex items-center justify-center transform transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-top z-30 preserve-3d ${isOpen ? '-rotate-x-[110deg] -translate-y-24 opacity-10' : 'group-hover:-translate-y-2'}`}
                    >
                         {/* Lid Texture Outside */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 rounded-lg"></div>
                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>
                         
                         {/* Logo on Lid */}
                         <div className="w-24 h-24 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                             <div className="w-20 h-20 bg-[#D4AF37] rotate-0 mask-image"></div>
                         </div>
                         <span className="absolute bottom-12 text-[#D4AF37] text-xs tracking-[0.6em] font-bold">PICKIT</span>

                         {/* Lid Inside (Visible when open) */}
                         <div className="absolute inset-0 bg-zinc-900 transform rotate-x-180 translate-z-[-1px] rounded-lg border border-zinc-800 flex items-center justify-center backface-hidden">
                            <span className="text-zinc-600 font-serif text-lg italic">Welcome to the Club</span>
                         </div>
                    </div>

                    {/* Box Body (Inside) - The container */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[#050505] rounded-lg border border-zinc-900 flex items-center justify-center transform translate-z-[-20px] shadow-inner z-10 overflow-visible">
                         <div className="w-[90%] h-[90%] bg-[#080808] rounded inset-shadow flex items-center justify-center relative border border-zinc-800/50">
                             {/* High Density Foam Texture */}
                             <div className="absolute inset-0 bg-[radial-gradient(circle,_#1a1a1a_0%,_#050505_100%)] opacity-90 rounded"></div>
                             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
                             
                             {/* THE CARD INSIDE - Animates out when open */}
                             <div 
                                className={`relative w-[65%] aspect-[1.586/1] rounded-lg transition-all duration-[2000ms] ease-out z-20 preserve-3d ${isOpen ? 'translate-z-[80px] -translate-y-[40px] rotate-x-[-20deg] rotate-y-[10deg] scale-110 shadow-[0_20px_60px_rgba(212,175,55,0.25)]' : 'translate-z-0 shadow-none'}`}
                             >
                                 {/* Card Face */}
                                 <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-black to-zinc-900 rounded-lg border border-[#D4AF37]/50 overflow-hidden flex flex-col justify-between p-4">
                                     {/* Metal Shine */}
                                     <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-all duration-[2000ms] ${isOpen ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}`}></div>
                                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

                                     <div className="flex justify-between items-start z-10">
                                         <div className="w-8 h-5 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded opacity-80"></div>
                                         <span className="text-[8px] text-[#D4AF37] tracking-widest font-bold border border-[#D4AF37] px-1 rounded">BLACK</span>
                                     </div>

                                     <div className="z-10 text-center">
                                         <span className="text-[#D4AF37] text-lg font-bold tracking-widest drop-shadow-md">PICKIT</span>
                                     </div>

                                     <div className="z-10">
                                         <p className="text-[8px] text-zinc-500 tracking-[0.2em]">MEMBER</p>
                                         <p className="text-xs text-white tracking-widest font-medium">KIM JENY</p>
                                     </div>
                                 </div>
                                 
                                 {/* Card Sparkles */}
                                 {isOpen && (
                                    <>
                                        <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-[#D4AF37] animate-pulse" />
                                        <Sparkles className="absolute top-1/2 -left-6 w-4 h-4 text-white animate-pulse delay-75" />
                                    </>
                                 )}
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6">
                   <Gift className="w-3 h-3 text-[#D4AF37]" />
                   <span className="text-xs font-semibold tracking-wide uppercase text-[#D4AF37]">Unboxing Experience</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    A Gift for <br/>
                    <span className="text-zinc-500">Your Success.</span>
                </h2>
                
                <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                    단순한 배송이 아닙니다. PICKIT을 만나는 첫 순간부터 압도적인 경험을 선사합니다. 
                    최고급 블랙 하드 케이스와 카드 형태에 딱 맞게 재단된 맞춤형 고밀도 보호 폼이 제품을 완벽하게 보호합니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/30 transition-colors hover:bg-zinc-900/50">
                        <Package className="w-6 h-6 text-white mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">Premium Hard Case</h4>
                            <p className="text-sm text-zinc-500">충격으로부터 제품을 보호하는 견고한 하드 케이스.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/30 transition-colors hover:bg-zinc-900/50">
                        <Award className="w-6 h-6 text-white mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">Authenticity</h4>
                            <p className="text-sm text-zinc-500">고유 시리얼 넘버가 기재된 정품 보증서 동봉.</p>
                        </div>
                    </div>
                </div>
                
                {/* Reset Button (Visible only when open) */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className={`mt-8 text-xs text-zinc-600 hover:text-white underline transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    Close Box
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingShowcase;