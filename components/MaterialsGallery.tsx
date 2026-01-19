import React, { useState, useRef } from 'react';
import { ArrowRight, RotateCcw, MousePointerClick, Layers } from 'lucide-react';

const MaterialsGallery: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const materials = [
    {
      id: 0,
      name: "OBSIDIAN BLACK",
      type: "Mirror Finish",
      desc: "빛을 완벽하게 흡수하고 반사하는 심연의 블랙. 다이아몬드 코팅(DLC)으로 완성된 압도적인 내구성과 거울 같은 광택을 자랑합니다.",
      // Metal Sphere CSS
      sphere: {
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(80,80,80,1) 10%, rgba(10,10,10,1) 40%, #000000 100%)",
        reflection: "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.8) 51%, rgba(0,0,0,0.9) 100%)",
        shadow: "rgba(0,0,0,0.8)"
      },
      // Card CSS
      card: {
        bg: "bg-[#111]",
        texture: "https://www.transparenttextures.com/patterns/stardust.png",
        border: "border-zinc-700",
        text: "text-zinc-300",
        highlight: "from-white/10 to-transparent"
      }
    },
    {
      id: 1,
      name: "STERLING SILVER",
      type: "Brushed Texture",
      desc: "순수한 스테인리스 스틸의 본질. 수만 번의 헤어라인 가공을 통해 완성된 차가우면서도 세련된 인더스트리얼 무드.",
      sphere: {
        background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d5db 20%, #9ca3af 50%, #4b5563 100%)",
        reflection: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, #374151 51%, #1f2937 100%)",
        shadow: "rgba(255,255,255,0.2)"
      },
      card: {
        bg: "bg-[#e5e7eb]",
        texture: "https://www.transparenttextures.com/patterns/brushed-alum.png",
        border: "border-zinc-300",
        text: "text-zinc-800",
        highlight: "from-white/40 to-transparent"
      }
    },
    {
      id: 2,
      name: "ROYAL GOLD",
      type: "24K Real Plating",
      desc: "변치 않는 부의 상징. 실제 24K 골드 도금 처리를 통해 깊이 있는 황금빛 광채와 묵직한 존재감을 선사합니다.",
      sphere: {
        background: "radial-gradient(circle at 30% 30%, #fffbeb 0%, #fcd34d 20%, #b45309 60%, #451a03 100%)",
        reflection: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 40%, rgba(253, 224, 71, 0.4) 50%, #78350f 51%, #451a03 100%)",
        shadow: "rgba(251, 191, 36, 0.3)"
      },
      card: {
        bg: "bg-[#E6C673]",
        texture: "https://www.transparenttextures.com/patterns/cubes.png",
        border: "border-[#d4af37]",
        text: "text-yellow-950",
        highlight: "from-yellow-100/30 to-transparent"
      }
    },
    {
      id: 3,
      name: "ROSE QUARTZ",
      type: "Pink Gold",
      desc: "우아함의 절정. 구리와 금의 완벽한 비율로 탄생한 로즈 골드는 부드럽지만 강렬한 인상을 남깁니다.",
      sphere: {
        background: "radial-gradient(circle at 30% 30%, #fff1f2 0%, #fda4af 20%, #be123c 60%, #4c0519 100%)",
        reflection: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 40%, rgba(255, 200, 200, 0.4) 50%, #881337 51%, #4c0519 100%)",
        shadow: "rgba(244, 63, 94, 0.3)"
      },
      card: {
        bg: "bg-[#fda4af]",
        texture: "https://www.transparenttextures.com/patterns/stardust.png",
        border: "border-rose-400",
        text: "text-rose-950",
        highlight: "from-white/30 to-transparent"
      }
    }
  ];

  const currentMat = materials[activeMaterial];

  return (
    <section className="py-24 md:py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 blur-[150px] opacity-10 pointer-events-none"
        style={{ background: currentMat.sphere.background }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 md:gap-24 items-start">
            
            {/* Left Column: Text & Selector */}
            <div className="w-full xl:w-1/3">
                <span className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Material Library</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-none mb-6">
                    Essence of <br/>
                    <span className="text-zinc-500">Pure Metal.</span>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-12">
                    항공우주 등급의 304 스테인리스 스틸을 베이스로, <br/>
                    각기 다른 공정을 거쳐 탄생한 4가지 시그니처 피니싱.<br/>
                    단순한 색상이 아닌, 금속 본연의 물성을 경험하세요.
                </p>

                {/* Material Selector List */}
                <div className="space-y-4">
                    {materials.map((mat, index) => (
                        <div 
                            key={mat.id}
                            onClick={() => setActiveMaterial(index)}
                            className={`group relative p-6 border rounded-xl cursor-pointer transition-all duration-500 overflow-hidden ${activeMaterial === index ? 'bg-zinc-900 border-[#D4AF37]' : 'bg-transparent border-zinc-800 hover:border-zinc-600'}`}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${activeMaterial === index ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </div>
                                    <h3 className={`text-lg font-bold transition-colors ${activeMaterial === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                                        {mat.name}
                                    </h3>
                                </div>
                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeMaterial === index ? 'bg-[#D4AF37] scale-125' : 'bg-zinc-800'}`}></div>
                            </div>
                            
                            {/* Expandable Description */}
                            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${activeMaterial === index ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <p className="text-zinc-400 text-xs leading-relaxed">
                                        {mat.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Visualizer */}
            <div className="w-full xl:w-2/3 flex flex-col md:flex-row gap-12 items-center justify-center relative min-h-[500px]">
                
                {/* 1. Photorealistic Sphere */}
                <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-50">Raw Material</div>
                    
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full relative shadow-2xl transition-all duration-500">
                        {/* Base PBR Gradient */}
                        <div 
                            className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
                            style={{ background: currentMat.sphere.background }}
                        ></div>

                        {/* Horizon Reflection (The key to metal look) */}
                        <div 
                            className="absolute inset-0 rounded-full opacity-80 mix-blend-overlay transition-all duration-700"
                            style={{ background: currentMat.sphere.reflection }}
                        ></div>
                        
                        {/* Inner Shadow for Mass */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.5)]"></div>

                        {/* Specular Highlight (Sharp) */}
                        <div className="absolute top-[20%] left-[20%] w-[15%] h-[10%] bg-white rounded-[50%] blur-[2px] opacity-90 mix-blend-overlay filter brightness-150"></div>
                        <div className="absolute top-[22%] left-[22%] w-[5%] h-[3%] bg-white rounded-[50%] blur-[1px]"></div>

                        {/* Rim Light (Edge) */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4)] mix-blend-overlay"></div>

                        {/* Orbiting Rings */}
                        <div className="absolute -inset-8 border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
                        <div className="absolute -inset-16 border border-white/5 rounded-full animate-spin-reverse-slow pointer-events-none opacity-50"></div>
                    </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden md:flex flex-col items-center gap-2 text-zinc-600 opacity-50">
                     <Layers className="w-4 h-4" />
                     <div className="w-16 h-[1px] bg-zinc-700"></div>
                     <span className="text-[9px] uppercase tracking-widest">Process</span>
                </div>

                {/* 2. Interactive Flippable Card */}
                <div className="relative perspective-1000 group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-50">Finished Product</div>
                    
                    {/* Interaction Hint */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">
                            <MousePointerClick className="w-4 h-4" />
                            <span>CLICK TO FLIP</span>
                        </div>
                    </div>

                    <div 
                        className={`w-[320px] h-[200px] md:w-[380px] md:h-[240px] relative preserve-3d transition-transform duration-700 cursor-pointer shadow-2xl ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* FRONT FACE */}
                        <div className={`absolute inset-0 backface-hidden rounded-xl overflow-hidden border ${currentMat.card.bg} ${currentMat.card.border} shadow-xl`}>
                            {/* Material Texture */}
                            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${currentMat.card.texture})` }}></div>
                            
                            {/* Metallic Sheen Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${currentMat.card.highlight} opacity-50`}></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

                            {/* Card Elements */}
                            <div className={`relative z-10 h-full p-6 flex flex-col justify-between ${currentMat.card.text}`}>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-6 bg-yellow-200/80 rounded-sm overflow-hidden relative border border-yellow-400/50">
                                        <div className="absolute inset-0 border border-black/20 rounded-sm"></div>
                                        <div className="w-full h-1/2 border-b border-black/10"></div>
                                        <div className="w-1/2 h-full border-r border-black/10 absolute top-0 left-0"></div>
                                    </div>
                                    <span className="text-xs font-bold tracking-widest opacity-70">PICKIT</span>
                                </div>
                                
                                <div className="text-center transform translate-y-2">
                                     <h3 className="text-lg md:text-xl font-mono tracking-[0.2em] drop-shadow-md">4567 8901 2345 6789</h3>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[8px] opacity-60 uppercase tracking-wider mb-0.5">Card Holder</p>
                                        <p className="font-bold tracking-wider text-sm">KIM JENY</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] opacity-60 uppercase tracking-wider mb-0.5">Valid Thru</p>
                                        <p className="font-bold tracking-wider text-sm">09/29</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BACK FACE */}
                        <div className={`absolute inset-0 backface-hidden rounded-xl overflow-hidden border rotate-y-180 bg-zinc-900 border-zinc-700`}>
                            {/* Magnetic Stripe */}
                            <div className="w-full h-10 bg-black mt-6 relative">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                            </div>

                            <div className="p-6 relative">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-2/3 h-8 bg-white/10 flex items-center justify-end px-2">
                                        <span className="font-mono text-black bg-white px-2 py-0.5 italic text-sm font-bold skew-x-[-10deg]">123</span>
                                    </div>
                                    <div className="w-8 h-8 opacity-50 grayscale">
                                        <Layers className="w-full h-full text-zinc-500" />
                                    </div>
                                </div>
                                
                                <p className="text-[8px] text-zinc-500 leading-relaxed text-justify">
                                    This card is issued by PICKIT KOREA Inc. pursuant to license by Visa International. 
                                    Use of this card is subject to the agreement, as amended, 
                                    which constitutes the holder's acceptance of these terms.
                                </p>
                                
                                <div className="mt-4 flex justify-center">
                                    <p className="text-zinc-600 text-xs font-bold tracking-widest">PICKIT.KOREA.OFFICIAL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsGallery;