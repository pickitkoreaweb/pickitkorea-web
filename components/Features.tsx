import React, { useState } from 'react';
import { PenTool, Gem, ShieldCheck, Cpu, Scale, ScanLine, Ruler, Layers, Search, Zap, AlertCircle } from 'lucide-react';

interface FeaturesProps {
  qcImage?: string;
}

const Features: React.FC<FeaturesProps> = ({ qcImage }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = qcImage || "https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop";

  return (
    <section id="features" className="py-24 md:py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/10 skew-x-12 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border-b border-[#D4AF37] pb-2">
             <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
             <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37]">Specification</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white leading-tight">
            Engineering <br className="hidden md:block"/>
            <span className="text-zinc-600">Perfection.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light">
            단순한 금속 조각이 아닙니다. 소재 선정부터 마감까지,<br className="md:hidden"/>
            0.01mm의 오차도 허용하지 않는 집요한 공정으로 완성됩니다.
          </p>
        </div>

        {/* 1. Technical Specs Grid - Clean & Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-t border-zinc-900 pt-12">
            <div className="group">
                <Layers className="w-6 h-6 text-[#D4AF37] mb-4 opacity-80" />
                <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Material</h4>
                <p className="text-white text-xl md:text-2xl font-serif font-medium">304 Stainless</p>
                <p className="text-zinc-600 text-xs mt-1 tracking-wide">Aerospace Grade</p>
            </div>
            <div className="group">
                <Scale className="w-6 h-6 text-[#D4AF37] mb-4 opacity-80" />
                <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Weight</h4>
                <p className="text-white text-xl md:text-2xl font-serif font-medium">21g (Heavy)</p>
                <p className="text-zinc-600 text-xs mt-1 tracking-wide">vs Plastic 5g</p>
            </div>
            <div className="group">
                <Ruler className="w-6 h-6 text-[#D4AF37] mb-4 opacity-80" />
                <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Thickness</h4>
                <p className="text-white text-xl md:text-2xl font-serif font-medium">0.8mm</p>
                <p className="text-zinc-600 text-xs mt-1 tracking-wide">ISO Standard</p>
            </div>
            <div className="group">
                <ScanLine className="w-6 h-6 text-[#D4AF37] mb-4 opacity-80" />
                <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">Finishing</h4>
                <p className="text-white text-xl md:text-2xl font-serif font-medium">PVD Coating</p>
                <p className="text-zinc-600 text-xs mt-1 tracking-wide">Anti-Scratch</p>
            </div>
        </div>

        {/* 2. Main Visual: Quality Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
            <div className="relative order-2 lg:order-1 group">
                <div className="relative aspect-[4/5] md:aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-zinc-900">
                    {!imgError ? (
                        <img 
                            src={imageUrl} 
                            alt="Quality Control" 
                            className="w-full h-full object-cover filter brightness-[0.6] contrast-125 grayscale-[0.2] group-hover:scale-105 transition-transform duration-[2000ms]"
                            loading="lazy"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-600 p-8 text-center h-full">
                            <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-xs uppercase tracking-widest">Image Unavailable</p>
                        </div>
                    )}
                    
                    {/* Minimal Overlay */}
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                         <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mix-blend-difference">Final Inspection</span>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                    Uncompromising <br/>
                    Quality Control.
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10 break-keep font-light">
                    모든 PICKIT 메탈 카드는 출고 전 전문 엔지니어의 엄격한 검수를 거칩니다.
                    미세한 스크래치나 도장 불량을 육안과 장비로 이중 체크하며, 
                    <strong className="text-white font-medium"> 라텍스 장갑을 착용한 상태에서</strong> 최종 패키징되어 
                    고객님의 손에 닿을 때까지 지문 하나 없는 완벽한 상태를 유지합니다.
                </p>
                <div className="space-y-6 border-l border-zinc-800 pl-6">
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">Strict Hygiene Standards</h4>
                        <p className="text-zinc-500 text-sm">먼지와 지문을 원천 차단하는 클린룸 패키징 시스템.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">Perfect Edge Finishing</h4>
                        <p className="text-zinc-500 text-sm">다이아몬드 커팅으로 날카롭지 않고 부드러운 엣지 마감.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Laser Engraving Section - Gold Theme Update */}
        <div className="relative rounded-xl bg-[#080808] border border-zinc-900 overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                    <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-zinc-800">
                        <Cpu className="text-[#D4AF37] w-5 h-5" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-6">Programmed Precision.</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8 break-keep font-light">
                        타협하지 않는 퀄리티를 위해 레이저 각인 솔루션의 글로벌 리더, <strong className="text-white">Mr. Carve 정품 장비</strong>를 전격 도입했습니다. <br/><br/>
                        PICKIT은 <strong className="text-[#D4AF37]">0.0001mm (0.1µm)</strong> 수준의 초정밀 나노 각인 기술을 통해 
                        육안으로는 식별하기 힘든 미세한 디테일까지 완벽하게 구현합니다. 
                    </p>
                    
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-full border border-zinc-800 text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#D4AF37]" /> Powered by Mr. Carve
                        </div>
                    </div>
                </div>

                {/* Visual Representation of Laser - Gold/White Theme */}
                <div className="relative min-h-[400px] bg-black flex items-center justify-center overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* The Card */}
                    <div className="relative w-64 h-40 bg-zinc-900 rounded-lg border border-zinc-700 shadow-2xl flex items-center justify-center z-10 overflow-hidden group">
                        {/* Metal Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] opacity-50"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black opacity-90"></div>

                        {/* Engraved Content - Gold Tint */}
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#805e10] font-bold text-2xl drop-shadow-md font-serif tracking-widest">
                                PICKIT
                            </span>
                        </div>

                        {/* Laser Beam Effect - Gold/White */}
                        <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37] to-white opacity-80 blur-[1px] animate-pulse"></div>
                        
                        {/* Laser Point - Sparkle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_#D4AF37] animate-ping absolute"></div>
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full relative z-20 shadow-[0_0_15px_#D4AF37]"></div>
                        </div>
                        
                        {/* Scanning Line - Gold */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80 shadow-[0_0_15px_#D4AF37] animate-[scan_2s_linear_infinite]"></div>
                    </div>
                    
                    {/* Floating Code UI */}
                    <div className="absolute bottom-6 right-6 p-4 bg-black/90 backdrop-blur border border-zinc-800 rounded-lg shadow-xl">
                        <div className="flex flex-col gap-1.5 font-mono text-[9px] tracking-wider">
                            <span className="text-zinc-600">// LASER_CONFIG</span>
                            <span className="text-[#D4AF37]">EQUIP: MR.CARVE S4</span>
                            <span className="text-zinc-400">PRECISION: 0.1µm</span>
                            <span className="text-zinc-400">DEPTH: 0.05mm</span>
                            <span className="text-white animate-pulse mt-1">STATUS: ENGRAVING...</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};

export default Features;