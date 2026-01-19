import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const MaterialsGallery: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<number>(0);

  const materials = [
    {
      id: 0,
      name: "OBSIDIAN BLACK",
      type: "Mirror Finish",
      desc: "깊이 있는 블랙 미러 마감. 빛을 흡수하고 반사하는 신비로운 매력.",
      color: "from-zinc-900 to-black",
      textColor: "text-white",
      // Complex gradient for deep gloss black with sharp highlights
      sphereGradient: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(100,100,100,1) 10%, rgba(20,20,20,1) 40%, rgba(0,0,0,1) 85%)",
      innerShadow: "inset -10px -10px 30px rgba(255,255,255,0.1), inset 10px 10px 30px rgba(0,0,0,0.8)",
      shadowColor: "rgba(0,0,0,0.8)"
    },
    {
      id: 1,
      name: "STERLING SILVER",
      type: "Brushed Texture",
      desc: "순수한 금속의 본질. 세련되고 도시적인 헤어라인 텍스처.",
      color: "from-[#e3e3e3] to-[#9ca3af]",
      textColor: "text-zinc-900",
      // Metallic silver with anisotropic-like bands
      sphereGradient: "radial-gradient(circle at 30% 30%, #ffffff 0%, #e0e0e0 20%, #a0a0a0 50%, #505050 100%)",
      innerShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
      shadowColor: "rgba(255,255,255,0.15)"
    },
    {
      id: 2,
      name: "ROYAL GOLD",
      type: "24K Gold Plated",
      desc: "변치 않는 부의 상징. 실제 24K 골드 도금으로 완성된 압도적 화려함.",
      color: "from-[#FCD34D] to-[#B45309]",
      textColor: "text-yellow-950",
      // Rich gold with warm lowlights
      sphereGradient: "radial-gradient(circle at 35% 35%, #fffef0 0%, #fcd34d 25%, #b45309 60%, #451a03 100%)",
      innerShadow: "inset -5px -5px 20px rgba(0,0,0,0.4), inset 5px 5px 20px rgba(255,255,220,0.5)",
      shadowColor: "rgba(251, 191, 36, 0.25)"
    },
    {
      id: 3,
      name: "ROSE QUARTZ",
      type: "Pink Gold",
      desc: "우아함의 절정. 부드럽지만 강렬한 로즈 골드의 섬세한 컬러감.",
      color: "from-[#fda4af] to-[#be123c]",
      textColor: "text-rose-950",
      // Soft copper/pink gold
      sphereGradient: "radial-gradient(circle at 35% 35%, #fff1f2 0%, #fda4af 25%, #be123c 60%, #500724 100%)",
      innerShadow: "inset -5px -5px 20px rgba(0,0,0,0.4), inset 5px 5px 20px rgba(255,200,200,0.4)",
      shadowColor: "rgba(244, 63, 94, 0.25)"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div 
        className={`absolute inset-0 opacity-20 transition-colors duration-1000 ease-in-out blur-[150px]`}
        style={{
            background: materials[activeMaterial].shadowColor.replace('0.25', '0.08').replace('0.15', '0.05')
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-end mb-20">
            <div className="flex-1">
                <span className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Materials</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-none mb-6">
                    Essence of <br/>
                    <span className="text-zinc-400">Pure Metal.</span>
                </h2>
                <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
                    항공우주 등급의 스테인리스 스틸을 베이스로,<br/>
                    각기 다른 매력을 지닌 4가지 피니싱을 제안합니다.
                </p>
            </div>
            
            {/* 3D Sphere Visualizer */}
            <div className="flex-1 flex justify-center lg:justify-end relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
                    {/* The Sphere Container */}
                    <div className="relative w-full h-full animate-float">
                        
                        {/* Main Sphere Render */}
                        <div 
                            className="absolute inset-0 rounded-full transition-all duration-1000 ease-in-out"
                            style={{
                                background: materials[activeMaterial].sphereGradient,
                                boxShadow: `0 30px 60px -15px ${materials[activeMaterial].shadowColor}, ${materials[activeMaterial].innerShadow}`
                            }}
                        >
                             {/* Specular Highlight (Rim Light - Back) */}
                             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/30 opacity-50 mix-blend-overlay"></div>
                             
                             {/* Anisotropic / Brushed Texture Overlay (Only for Silver) */}
                             {activeMaterial === 1 && (
                                <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
                             )}

                             {/* Sharp Specular Highlight (Front) */}
                             <div className="absolute top-[15%] left-[15%] w-[25%] h-[15%] bg-white rounded-[50%] blur-xl opacity-60 filter mix-blend-overlay"></div>
                             <div className="absolute top-[25%] left-[25%] w-[10%] h-[5%] bg-white rounded-[50%] blur-sm opacity-90"></div>
                        </div>

                    </div>
                    
                    {/* Orbital Rings - Enhanced */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-spin-slow pointer-events-none transition-all duration-1000" style={{ borderColor: materials[activeMaterial].textColor.includes('white') ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.05)' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full animate-spin-reverse-slow pointer-events-none">
                         <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
            {materials.map((mat, index) => (
                <MaterialCard 
                    key={mat.id} 
                    material={mat} 
                    index={index} 
                    isActive={activeMaterial === index} 
                    setActive={setActiveMaterial} 
                />
            ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component for individual interaction handling
const MaterialCard: React.FC<{ material: any, index: number, isActive: boolean, setActive: (idx: number) => void }> = ({ material, index, isActive, setActive }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <div 
            ref={cardRef}
            onMouseEnter={() => setActive(index)}
            onMouseMove={handleMouseMove}
            className={`relative rounded-none border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 ease-out flex flex-col justify-end p-6 ${isActive ? 'md:flex-[2] bg-zinc-900/40' : 'md:flex-[1] bg-black hover:bg-zinc-900/20'}`}
        >
            {/* Base Gradient */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${material.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-soft-light`}></div>
            
            {/* Interactive Shine Effect */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3), transparent 40%)`
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 pointer-events-none">
                <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-300 ${isActive ? 'text-white translate-y-0' : 'text-zinc-500 translate-y-4 group-hover:text-zinc-300'}`}>
                    {material.name.split(' ')[0]}<br/>
                    {material.name.split(' ')[1]}
                </h3>
                
                <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                        {material.desc}
                    </p>
                    <span className="text-xs text-white border-b border-white pb-0.5 inline-flex items-center gap-1">
                        VIEW DETAILS <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
            
            {/* Active Border */}
            <div className={`absolute inset-0 border border-white/20 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
}

export default MaterialsGallery;