import React, { useState, useEffect } from 'react';
import { MousePointerClick, Layers, CreditCard, UserSquare2 } from 'lucide-react';

interface MaterialItem {
  id: number;
  name: string;
  type: string;
  desc: string;
  image: string; // URL for the texture image
}

// Updated Default Materials: Fixed Static URLs for Consistency
const DEFAULT_MATERIALS: MaterialItem[] = [
    {
      id: 0,
      name: "STS304 MIRROR",
      type: "Super Mirror Finish",
      desc: "완벽하게 연마된 거울 같은 표면. 8K급 고해상도 반사율을 자랑하는 스테인리스 스틸의 가장 화려한 마감입니다. 지문 방지 코팅이 더해져 관리가 용이합니다.",
      // Liquid Chrome / Silver Reflection
      image: "https://images.unsplash.com/photo-1629804257639-6539a2b726aa?q=80&w=2000&auto=format&fit=crop" 
    },
    {
      id: 1,
      name: "STS304 HAIRLINE",
      type: "Directional Satin",
      desc: "한 방향으로 뻗은 미세한 결이 특징인 헤어라인 마감. 빛의 각도에 따라 은은하게 변화하는 광택이 고급스러움을 더하며, 생활 스크래치에 강합니다.",
      // Classic Brushed Metal with horizontal lines
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "STS304 BRUSHED",
      type: "Vibration Finish",
      desc: "불규칙한 연마 자국이 만들어내는 독특한 빈티지 텍스처. 거친 듯 부드러운 질감으로 금속 본연의 물성을 가장 잘 표현한 인더스트리얼 마감입니다.",
      // Rough Sandblasted / Vintage Texture
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop"
    }
];

const MaterialsGallery: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'business'>('card');

  useEffect(() => {
    // Load from LocalStorage or use defaults
    // Changed key to v3 to force refresh with new images
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
          {/* We use a blurred version of the texture as background ambience */}
          <img 
            src={currentMat.image} 
            className="w-full h-full object-cover filter blur-[100px] opacity-30" 
            alt="Ambience" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 md:gap-24 items-center">
            
            {/* Left Column: Text & Selector */}
            <div className="w-full xl:w-1/3">
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
                            onClick={() => {
                                setActiveMaterialIndex(index);
                                setIsFlipped(false); // Reset flip on material change
                            }}
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

            {/* Right Column: Visualizer */}
            <div className="w-full xl:w-2/3 flex flex-col items-center justify-center relative min-h-[500px]">
                
                {/* View Mode Toggle */}
                <div className="flex gap-4 mb-12 bg-zinc-900/50 p-1.5 rounded-full border border-zinc-800 backdrop-blur-sm relative z-20">
                    <button 
                        onClick={() => { setViewMode('card'); setIsFlipped(false); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === 'card' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-zinc-400 hover:text-white'}`}
                    >
                        <CreditCard className="w-4 h-4" /> Credit Card
                    </button>
                    <button 
                        onClick={() => { setViewMode('business'); setIsFlipped(false); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === 'business' ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-zinc-400 hover:text-white'}`}
                    >
                        <UserSquare2 className="w-4 h-4" /> Business Card
                    </button>
                </div>

                {/* Interactive Flippable Card */}
                <div className="relative perspective-1000 group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-50">Physical Preview</div>
                    
                    {/* Interaction Hint */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-widest animate-pulse">
                            <MousePointerClick className="w-4 h-4" />
                            <span>CLICK TO FLIP</span>
                        </div>
                    </div>

                    {/* Card Container */}
                    <div 
                        className={`relative preserve-3d transition-transform duration-700 cursor-pointer shadow-2xl ${
                            viewMode === 'card' 
                                ? 'w-[320px] h-[200px] md:w-[420px] md:h-[265px]' // Landscape
                                : 'w-[200px] h-[320px] md:w-[265px] md:h-[420px]' // Portrait (Business Card)
                        }`}
                        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* FRONT FACE */}
                        <div 
                            className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl border border-white/10 transition-colors duration-500 bg-zinc-900"
                        >
                            {/* Material Texture Background */}
                            <div className="absolute inset-0">
                                <img src={currentMat.image} alt="Texture" className="w-full h-full object-cover opacity-80" />
                            </div>
                            
                            {/* Metallic Sheen Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>

                            {/* CONDITIONAL CONTENT */}
                            {viewMode === 'card' ? (
                                /* --- CREDIT CARD LAYOUT --- */
                                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between text-white drop-shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-9 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-md border border-zinc-400 flex items-center justify-center shadow-md opacity-90">
                                            <div className="w-7 h-5 border border-zinc-600 rounded-sm opacity-50"></div>
                                        </div>
                                        <span className="text-sm font-bold tracking-widest opacity-80">PICKIT</span>
                                    </div>
                                    <div className="text-center transform translate-y-2">
                                        <h3 className="text-xl md:text-2xl font-mono tracking-[0.2em] font-bold shadow-black drop-shadow-sm">
                                            4567 8901 2345 6789
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[8px] opacity-80 uppercase tracking-wider mb-0.5">Card Holder</p>
                                            <p className="font-bold tracking-wider text-sm md:text-base">KIM JENY</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] opacity-80 uppercase tracking-wider mb-0.5">Valid Thru</p>
                                            <p className="font-bold tracking-wider text-sm md:text-base">09/29</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* --- BUSINESS CARD LAYOUT (VERTICAL) --- */
                                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col items-center justify-between text-white drop-shadow-md text-center">
                                    <div className="pt-4">
                                        <div className="w-8 h-8 border border-white/50 rotate-45 flex items-center justify-center mx-auto mb-2">
                                            <div className="w-4 h-4 bg-white/80 rotate-45"></div>
                                        </div>
                                        <span className="text-[10px] tracking-[0.4em] font-bold opacity-80">PICKIT</span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">KIM JUNG WOO</h3>
                                        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">CEO / Founder</p>
                                        <div className="w-8 h-[1px] bg-white/30 mx-auto my-3"></div>
                                        <p className="text-[10px] md:text-xs opacity-80 tracking-wider">010 8282 1043</p>
                                        <p className="text-[8px] md:text-[10px] opacity-60 tracking-wider">pickit.korea.official@gmail.com</p>
                                    </div>

                                    <div className="w-full border-t border-white/20 pt-4 flex justify-between items-end">
                                        <span className="text-[8px] opacity-50 tracking-widest">STS304 ORIGINAL</span>
                                        <Layers className="w-4 h-4 opacity-50" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* BACK FACE */}
                        <div 
                            className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl border border-white/10 transition-colors duration-500 bg-zinc-900"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            {/* Material Texture (Same as Front) */}
                            <div className="absolute inset-0">
                                <img src={currentMat.image} alt="Texture" className="w-full h-full object-cover opacity-80" />
                            </div>
                            
                            {viewMode === 'card' ? (
                                /* Credit Card Back */
                                <>
                                    <div className="w-full h-12 md:h-14 bg-black mt-8 relative z-10">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                                    </div>
                                    <div className="p-6 md:p-8 relative z-10 text-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="w-2/3 h-10 bg-white/90 flex items-center justify-end px-2 skew-x-[-10deg]">
                                                <span className="font-mono text-black px-2 py-0.5 italic text-sm font-bold skew-x-[10deg]">123</span>
                                            </div>
                                            <div className="w-12 h-12 opacity-60 grayscale border rounded p-1 border-current">
                                                <Layers className="w-full h-full" />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-center">
                                            <p className="text-[10px] font-bold tracking-[0.3em] opacity-80">PICKIT.KOREA.OFFICIAL</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Business Card Back */
                                <div className="h-full flex flex-col items-center justify-center relative z-10 p-8">
                                    <div className="w-24 h-24 border border-white/20 flex items-center justify-center mb-6">
                                        <div className="text-center">
                                            <span className="block text-[8px] text-[#D4AF37] tracking-widest mb-1">SCAN ME</span>
                                            <div className="w-16 h-16 bg-white p-1">
                                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://pickit-korea.com" alt="QR" className="w-full h-full opacity-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-[0.2em] mb-1">PICKIT</h3>
                                    <p className="text-[9px] text-zinc-400 tracking-widest uppercase">Premium Metal Interface</p>
                                    <div className="absolute bottom-8 text-[8px] text-zinc-600 tracking-[0.3em]">
                                        COPYRIGHT 2026
                                    </div>
                                </div>
                            )}
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