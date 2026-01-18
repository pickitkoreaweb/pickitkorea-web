import React, { useState } from 'react';
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
      glow: "group-hover:shadow-[0_0_100px_rgba(255,255,255,0.1)]",
      textColor: "text-white"
    },
    {
      id: 1,
      name: "STERLING SILVER",
      type: "Brushed Texture",
      desc: "순수한 금속의 본질. 세련되고 도시적인 헤어라인 텍스처.",
      color: "from-[#e3e3e3] to-[#9ca3af]",
      glow: "group-hover:shadow-[0_0_100px_rgba(227,227,227,0.3)]",
      textColor: "text-zinc-900"
    },
    {
      id: 2,
      name: "ROYAL GOLD",
      type: "24K Gold Plated",
      desc: "변치 않는 부의 상징. 실제 24K 골드 도금으로 완성된 압도적 화려함.",
      color: "from-[#FCD34D] to-[#B45309]",
      glow: "group-hover:shadow-[0_0_100px_rgba(252,211,77,0.3)]",
      textColor: "text-yellow-950"
    },
    {
      id: 3,
      name: "ROSE QUARTZ",
      type: "Pink Gold",
      desc: "우아함의 절정. 부드럽지만 강렬한 로즈 골드의 섬세한 컬러감.",
      color: "from-[#fda4af] to-[#be123c]",
      glow: "group-hover:shadow-[0_0_100px_rgba(253,164,175,0.3)]",
      textColor: "text-rose-950"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Glow based on active material */}
      <div 
        className={`absolute inset-0 opacity-20 transition-colors duration-1000 ease-in-out blur-[150px]`}
        style={{
            background: activeMaterial === 2 
                ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.2), transparent 70%)' 
                : activeMaterial === 3 
                ? 'radial-gradient(circle at center, rgba(244, 63, 94, 0.2), transparent 70%)'
                : activeMaterial === 1
                ? 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)'
                : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <span className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Materials</span>
                <h2 className="text-4xl md:text-6xl font-serif text-white leading-none">
                    Essence of <br/>
                    <span className="italic text-zinc-400">Pure Metal.</span>
                </h2>
            </div>
            <p className="text-zinc-400 max-w-sm text-sm leading-relaxed text-right md:text-left">
                우리는 타협하지 않습니다.<br/>
                항공우주 등급의 스테인리스 스틸을 베이스로,<br/>
                각기 다른 매력을 지닌 4가지 피니싱을 제안합니다.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
            {materials.map((mat, index) => (
                <div 
                    key={mat.id}
                    onMouseEnter={() => setActiveMaterial(index)}
                    className={`relative rounded-none border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 ease-out flex flex-col justify-end p-6 ${activeMaterial === index ? 'md:flex-[2] bg-zinc-900/40' : 'md:flex-[1] bg-black hover:bg-zinc-900/20'}`}
                >
                    {/* Metal Texture Representation */}
                    <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${mat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-soft-light`}></div>
                    <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${mat.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 transition-colors duration-300 ${activeMaterial === index ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-serif mb-4 transition-all duration-300 ${activeMaterial === index ? 'text-white translate-y-0' : 'text-zinc-500 translate-y-4 group-hover:text-zinc-300'}`}>
                            {mat.name.split(' ')[0]}<br/>
                            {mat.name.split(' ')[1]}
                        </h3>
                        
                        <div className={`overflow-hidden transition-all duration-500 ${activeMaterial === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
                            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                                {mat.desc}
                            </p>
                            <span className="text-xs text-white border-b border-white pb-0.5 inline-flex items-center gap-1">
                                VIEW DETAILS <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                    
                    {/* Active Border */}
                    <div className={`absolute inset-0 border border-white/20 transition-all duration-500 ${activeMaterial === index ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsGallery;