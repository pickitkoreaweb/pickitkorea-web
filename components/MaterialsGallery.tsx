import React, { useState, useEffect } from 'react';
import { Layers, Maximize2, ExternalLink } from 'lucide-react';

interface MaterialItem {
  id: number;
  name: string;
  type: string;
  desc: string;
  image: string; // URL for the texture image
}

// Default Materials: High-Quality Abstract Textures (Sync with Admin)
const DEFAULT_MATERIALS: MaterialItem[] = [
    {
      id: 0,
      name: "STS304 MIRROR",
      type: "Super Mirror Finish",
      desc: "완벽하게 연마된 거울 같은 표면. 8K급 고해상도 반사율을 자랑하는 스테인리스 스틸의 가장 화려한 마감입니다. 지문 방지 코팅이 더해져 관리가 용이합니다.",
      image: "https://images.unsplash.com/photo-1629804257639-6539a2b726aa?q=80&w=2000&auto=format&fit=crop" // Liquid Chrome
    },
    {
      id: 1,
      name: "STS304 HAIRLINE",
      type: "Directional Satin",
      desc: "한 방향으로 뻗은 미세한 결이 특징인 헤어라인 마감. 빛의 각도에 따라 은은하게 변화하는 광택이 고급스러움을 더하며, 생활 스크래치에 강합니다.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" // Classic Brushed
    },
    {
      id: 2,
      name: "STS304 BRUSHED",
      type: "Vibration Finish",
      desc: "불규칙한 연마 자국이 만들어내는 독특한 빈티지 텍스처. 거친 듯 부드러운 질감으로 금속 본연의 물성을 가장 잘 표현한 인더스트리얼 마감입니다.",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop" // Sandblasted
    }
];

const MaterialsGallery: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState<number>(0);

  useEffect(() => {
    // Load from LocalStorage (Syncs with AdminDashboard)
    const storedMaterials = localStorage.getItem('pickit_materials_v3');
    if (storedMaterials) {
        try {
            setMaterials(JSON.parse(storedMaterials));
        } catch (e) {
            setMaterials(DEFAULT_MATERIALS);
        }
    } else {
        setMaterials(DEFAULT_MATERIALS);
        localStorage.setItem('pickit_materials_v3', JSON.stringify(DEFAULT_MATERIALS));
    }
  }, []);

  // Safe access to current material
  const currentMat = materials[activeMaterialIndex] || DEFAULT_MATERIALS[0];

  return (
    <section className="py-24 md:py-32 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience based on material image */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-20 pointer-events-none"
      >
          <img 
            src={currentMat.image} 
            className="w-full h-full object-cover filter blur-[100px] opacity-30" 
            alt="Ambience" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 md:gap-24 items-start">
            
            {/* Left Column: Text & Selector */}
            <div className="w-full xl:w-1/3 sticky top-32">
                <span className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Material Library</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-none mb-6">
                    Essence of <br/>
                    <span className="text-zinc-500">Pure Metal.</span>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-12">
                    항공우주 등급의 304 스테인리스 스틸을 베이스로, <br/>
                    각기 다른 공정을 거쳐 탄생한 시그니처 피니싱.<br/>
                    카드와 명함, 어떤 용도에도 완벽한 품격을 선사합니다.
                </p>

                {/* Material Selector List */}
                <div className="space-y-4">
                    {materials.map((mat, index) => (
                        <div 
                            key={mat.id}
                            onClick={() => setActiveMaterialIndex(index)}
                            className={`group relative p-6 border rounded-xl cursor-pointer transition-all duration-500 overflow-hidden ${activeMaterialIndex === index ? 'bg-zinc-900 border-[#D4AF37]' : 'bg-transparent border-zinc-800 hover:border-zinc-600'}`}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${activeMaterialIndex === index ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </div>
                                    <h3 className={`text-lg font-bold transition-colors ${activeMaterialIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                                        {mat.name}
                                    </h3>
                                </div>
                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeMaterialIndex === index ? 'bg-[#D4AF37] scale-125' : 'bg-zinc-800'}`}></div>
                            </div>
                            
                            {/* Expandable Description */}
                            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${activeMaterialIndex === index ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
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

            {/* Right Column: Pure Texture Display */}
            <div className="w-full xl:w-2/3">
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
                    
                    {/* The Texture Image */}
                    <img 
                        src={currentMat.image} 
                        alt={currentMat.name} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

                    {/* Corner Label */}
                    <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-2">
                            <Layers className="w-3 h-3 text-[#D4AF37]" />
                            High-Res Texture Preview
                        </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">{currentMat.name}</h3>
                        <p className="text-[#D4AF37] text-sm md:text-lg font-medium tracking-wide mb-6">{currentMat.type}</p>
                        
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Material</span>
                                <span className="text-sm text-zinc-300">STS 304</span>
                            </div>
                            <div className="w-px h-8 bg-zinc-700"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Grade</span>
                                <span className="text-sm text-zinc-300">Aerospace</span>
                            </div>
                            <div className="w-px h-8 bg-zinc-700"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Thickness</span>
                                <span className="text-sm text-zinc-300">0.8mm</span>
                            </div>
                        </div>
                    </div>

                    {/* Magnify Hint */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/30 backdrop-blur-md p-4 rounded-full border border-white/20">
                            <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center px-2">
                    <p className="text-zinc-500 text-xs">
                        * 실제 제품은 조명 환경에 따라 다르게 보일 수 있습니다.
                    </p>
                    <button 
                        onClick={() => {
                            const newWindow = window.open();
                            if (newWindow) {
                                newWindow.document.write(`<img src="${currentMat.image}" style="width:100%;height:auto;">`);
                            }
                        }}
                        className="text-xs text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
                    >
                        원본 보기 <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsGallery;