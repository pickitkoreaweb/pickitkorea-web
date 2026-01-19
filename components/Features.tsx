import React, { useState } from 'react';
import { PenTool, Gem, ShieldCheck, Cpu, Scale, ScanLine, Ruler, Layers, Search, Zap, AlertCircle } from 'lucide-react';

interface FeaturesProps {
  qcImage?: string;
}

const Features: React.FC<FeaturesProps> = ({ qcImage }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = qcImage || "https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop";

  return (
    <section id="features" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/10 skew-x-12 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6">
             <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
             <span className="text-xs font-semibold tracking-wide uppercase text-[#D4AF37]">Product Specification</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white leading-tight">
            Engineering <br className="hidden md:block"/>
            <span className="text-zinc-500">Perfection.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            단순한 금속 조각이 아닙니다. 소재 선정부터 마감까지,<br className="md:hidden"/>
            0.01mm의 오차도 허용하지 않는 집요한 공정으로 완성됩니다.
          </p>
        </div>

        {/* 1. Technical Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                <Layers className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Material</h4>
                <p className="text-white text-lg font-bold">304 Stainless Steel</p>
                <p className="text-zinc-600 text-xs mt-1">Surgical Grade</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                <Scale className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Weight</h4>
                <p className="text-white text-lg font-bold">18g ~ 21g</p>
                <p className="text-zinc-600 text-xs mt-1">Heavy Weight Feel</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                <Ruler className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Thickness</h4>
                <p className="text-white text-lg font-bold">0.8mm</p>
                <p className="text-zinc-600 text-xs mt-1">ISO Standard</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                <ScanLine className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Finishing</h4>
                <p className="text-white text-lg font-bold">PVD Coating</p>
                <p className="text-zinc-600 text-xs mt-1">Anti-Scratch</p>
            </div>
        </div>

        {/* 2. Main Visual: Quality Control (Gloved Hand) - Fixed Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="relative order-2 lg:order-1 group">
                {/* Image Container with Fallback Background */}
                <div className="relative aspect-[4/5] md:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-800 flex items-center justify-center">
                    {!imgError ? (
                        <img 
                            src={imageUrl} 
                            alt="Quality Control with Black Gloves" 
                            className="w-full h-full object-cover filter brightness-[0.5] contrast-125 grayscale-[0.3] group-hover:scale-105 transition-transform duration-1000"
                            loading="lazy"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-600 p-8 text-center">
                            <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-xs uppercase tracking-widest">Image Unavailable</p>
                        </div>
                    )}
                    
                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Final Inspection</span>
                        </div>
                        <p className="text-white font-serif text-xl italic">
                            "Zero Fingerprints Allowed."
                        </p>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-zinc-700 rounded-tl-3xl opacity-50 hidden md:block"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-zinc-700 rounded-br-3xl opacity-50 hidden md:block"></div>
            </div>

            <div className="order-1 lg:order-2">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800">
                    <Search className="text-white w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    Uncompromising <br/>
                    Quality Control.
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8 break-keep">
                    모든 PICKIT 메탈 카드는 출고 전 전문 엔지니어의 엄격한 검수를 거칩니다.
                    미세한 스크래치나 도장 불량을 육안과 장비로 이중 체크하며, 
                    <strong className="text-white"> 라텍스 장갑을 착용한 상태에서</strong> 최종 패키징되어 
                    고객님의 손에 닿을 때까지 지문 하나 없는 완벽한 상태를 유지합니다.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-1 shrink-0">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Strict Hygiene Standards</h4>
                            <p className="text-zinc-500 text-sm mt-1">먼지와 지문을 원천 차단하는 클린룸 환경에서 패키징됩니다.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-1 shrink-0">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Perfect Edge Finishing</h4>
                            <p className="text-zinc-500 text-sm mt-1">카드의 모서리는 정밀하게 다이아몬드 커팅되어 날카롭지 않고 부드럽습니다.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        {/* 3. Laser Engraving Section */}
        <div className="relative rounded-3xl bg-[#0a0a0a] border border-zinc-800 overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-16 flex flex-col justify-center relative z-10">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800">
                        <Cpu className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">Programmed Precision.</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8 break-keep">
                        사람의 손으로는 불가능한 영역입니다. <br/>
                        PICKIT의 레이저 각인 시스템은 컴퓨터 프로그래밍을 통해 
                        <strong className="text-white"> 1000 DPI 이상의 고해상도</strong>로 이미지를 구현합니다.
                        머리카락 굵기의 1/10 수준인 초정밀 레이저 빔이 금속 표면을 영구적으로 조각하여, 
                        세월이 흘러도 지워지지 않는 당신만의 시그니처를 남깁니다.
                    </p>
                    
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#D4AF37]" /> Vector Based
                        </div>
                        <div className="px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                            > 0.001mm Accuracy
                        </div>
                    </div>
                </div>

                {/* Visual Representation of Laser */}
                <div className="relative min-h-[400px] bg-black flex items-center justify-center overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* The Card */}
                    <div className="relative w-64 h-40 bg-zinc-800 rounded-lg border border-zinc-700 shadow-2xl flex items-center justify-center z-10 overflow-hidden group">
                        {/* Metal Texture (Pure CSS) */}
                        <div className="absolute inset-0 opacity-40" style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.05) 2px, rgba(255, 255, 255, 0.05) 4px),
                                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.05) 2px, rgba(255, 255, 255, 0.05) 4px)
                            `
                        }}></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900"></div>

                        {/* Engraved Content */}
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 font-bold text-2xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>
                                PICKIT
                            </span>
                        </div>

                        {/* Laser Beam Effect */}
                        <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-green-400 to-white opacity-80 blur-[1px] animate-pulse"></div>
                        
                        {/* Laser Point */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_20px_#4ade80] animate-ping absolute"></div>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full relative z-20"></div>
                        </div>
                        
                        {/* Scanning Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/50 shadow-[0_0_15px_#4ade80] animate-[scan_2s_linear_infinite]"></div>
                    </div>
                    
                    {/* Floating Code UI */}
                    <div className="absolute bottom-6 right-6 p-3 bg-black/80 backdrop-blur border border-zinc-800 rounded-lg">
                        <div className="flex flex-col gap-1 font-mono text-[10px]">
                            <span className="text-zinc-500">// LASER_CONFIG</span>
                            <span className="text-green-500">POWER: 85%</span>
                            <span className="text-green-500">SPEED: 2000mm/s</span>
                            <span className="text-blue-400">FREQ: 35kHz</span>
                            <span className="text-zinc-400 animate-pulse">STATUS: ENGRAVING...</span>
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