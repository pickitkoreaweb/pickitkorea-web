import React from 'react';
import { Package, Gift, Award } from 'lucide-react';

const PackagingShowcase: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Visual Part: Simulated 3D Box Layout */}
            <div className="w-full lg:w-1/2 perspective-1000 group">
                <div className="relative w-3/4 mx-auto aspect-square transition-transform duration-700 transform group-hover:rotate-x-12 group-hover:rotate-y-12 preserve-3d">
                    
                    {/* Box Base Shadow */}
                    <div className="absolute top-full left-0 w-full h-10 bg-black/50 blur-xl transform scale-90 translate-y-4"></div>

                    {/* Box Lid (Top) */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[#111] border border-zinc-800 rounded-lg shadow-2xl flex items-center justify-center transform transition-all duration-1000 origin-top group-hover:-rotate-x-[40deg] group-hover:-translate-y-20 z-20">
                         {/* Texture */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                         {/* Logo */}
                         <div className="w-20 h-20 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center">
                             <div className="w-16 h-16 bg-[#D4AF37] rotate-0 mask-image"></div>
                         </div>
                         <span className="absolute bottom-10 text-[#D4AF37] text-xs tracking-[0.5em] font-bold">PICKIT</span>
                    </div>

                    {/* Box Body (Inside) */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[#050505] rounded-lg border border-zinc-900 flex items-center justify-center transform translate-z-[-20px] shadow-inner z-10">
                         <div className="w-[80%] h-[80%] bg-[#0a0a0a] rounded inset-shadow flex items-center justify-center relative">
                             {/* High Density Foam Texture */}
                             <div className="absolute inset-0 bg-[radial-gradient(circle,_#1a1a1a_0%,_#0a0a0a_100%)] opacity-90"></div>
                             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>
                             
                             {/* The Card Inside */}
                             <div className="w-[60%] h-[35%] bg-gradient-to-br from-zinc-700 to-black rounded border border-zinc-600 shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative z-10 transform group-hover:translate-z-10 group-hover:scale-105 transition-transform duration-1000">
                                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
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
                
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    A Gift for <br/>
                    <span className="italic text-zinc-500">Your Success.</span>
                </h2>
                
                <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                    단순한 배송이 아닙니다. PICKIT을 만나는 첫 순간부터 압도적인 경험을 선사합니다. 
                    최고급 블랙 하드 케이스와 카드 형태에 딱 맞게 재단된 맞춤형 고밀도 보호 폼이 제품을 완벽하게 보호합니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/30">
                        <Package className="w-6 h-6 text-white mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">Premium Hard Case</h4>
                            <p className="text-sm text-zinc-500">충격으로부터 제품을 보호하는 견고한 하드 케이스.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/30">
                        <Award className="w-6 h-6 text-white mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">Authenticity</h4>
                            <p className="text-sm text-zinc-500">고유 시리얼 넘버가 기재된 정품 보증서 동봉.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingShowcase;