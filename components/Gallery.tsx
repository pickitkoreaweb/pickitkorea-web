import React, { useState, useEffect } from 'react';
import { ZoomIn, Filter, Layers, X, ChevronRight, MousePointerClick } from 'lucide-react';

type FilterType = 'all' | 'black' | 'gold' | 'silver' | 'rose';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
}

const DEFAULT_PORTFOLIO: GalleryItem[] = [
    {
      id: 1,
      title: "The Centurion Black",
      category: "black",
      image: "https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop",
      desc: "Full Vector Engraving"
    },
    {
      id: 2,
      title: "Royal Gold Signature",
      category: "gold",
      image: "https://images.unsplash.com/photo-1622675363311-ac97f3598473?q=80&w=1600&auto=format&fit=crop",
      desc: "24K Plating Finish"
    },
    {
      id: 3,
      title: "Sterling Silver Brush",
      category: "silver",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop",
      desc: "Industrial Hairline"
    },
    {
      id: 4,
      title: "Rose Gold Edition",
      category: "rose",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
      desc: "Deep Laser Etching"
    },
    {
      id: 5,
      title: "Matte Black Minimal",
      category: "black",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1600&auto=format&fit=crop",
      desc: "Hybrid Pattern"
    },
    {
      id: 6,
      title: "Custom Logo Project",
      category: "silver",
      image: "https://images.unsplash.com/photo-1535749767073-677bc9a2043e?q=80&w=1600&auto=format&fit=crop",
      desc: "Corporate Identity"
    },
];

interface GalleryProps {
  setPage?: (page: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setPage }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [portfolio, setPortfolio] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const storedGallery = localStorage.getItem('pickit_gallery');
    if (storedGallery) {
        try {
            setPortfolio(JSON.parse(storedGallery));
        } catch (e) {
            setPortfolio(DEFAULT_PORTFOLIO);
        }
    } else {
        setPortfolio(DEFAULT_PORTFOLIO);
        localStorage.setItem('pickit_gallery', JSON.stringify(DEFAULT_PORTFOLIO));
    }
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const filteredItems = filter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <section className="py-24 px-6 bg-[#050505] min-h-screen relative selection:bg-[#D4AF37] selection:text-black">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-zinc-900/40 to-transparent blur-[120px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-in-up border-b border-zinc-900 pb-10">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
                    <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">Masterpiece Archive</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-[0.9]">
                    The Gallery.
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                    PICKIT의 기술력은 디테일에서 증명됩니다.<br/>
                    실제 출고된 고객님들의 <span className="text-white font-medium">유일무이한 마스터피스</span>를 감상하세요.
                </p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0 justify-end">
                {['all', 'black', 'gold', 'silver', 'rose'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type as FilterType)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border backdrop-blur-sm ${
                            filter === type 
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                            : 'bg-zinc-900/30 text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up delay-200">
            {filteredItems.map((item) => (
                <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0a0a0a] cursor-none border border-zinc-800/50 hover:border-[#D4AF37]/50 transition-colors duration-500 shadow-lg"
                >
                    {/* Background Image - Scale & Grayscale Effect */}
                    <div className="w-full h-full overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter grayscale-[80%] group-hover:grayscale-0 brightness-[0.7] group-hover:brightness-100"
                        />
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* Content Reveal */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <div className="overflow-hidden mb-2">
                                <span className="inline-block text-[#D4AF37] text-[9px] font-bold tracking-[0.2em] uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.category} Edition
                                </span>
                            </div>
                            <h3 className="text-white text-2xl font-serif font-medium mb-2 leading-tight group-hover:text-white transition-colors">
                                {item.title}
                            </h3>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                <p className="text-zinc-400 text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-1">
                                    {item.desc}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                    View Detail <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Custom Cursor Indicator (Visual Only) */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                         <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            ))}
            
            {filteredItems.length === 0 && (
                <div className="col-span-full py-32 text-center text-zinc-600 border border-zinc-800 border-dashed rounded-2xl">
                    <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="font-serif italic text-lg">No items found in this collection.</p>
                </div>
            )}
        </div>

        {/* CTA Section */}
        <div className="mt-32 border-t border-zinc-900 pt-16 flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">Create Your Legacy</h3>
            <p className="text-zinc-500 text-sm mb-10 max-w-lg leading-relaxed">
                당신의 비즈니스와 라이프스타일에 걸맞은 단 하나의 카드.<br/>
                지금 바로 커스터마이징을 시작해보세요.
            </p>
            <button 
                onClick={() => setPage && setPage('metal-custom')}
                className="group relative px-10 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] overflow-hidden hover:bg-[#D4AF37] transition-colors duration-300"
            >
                <span className="relative z-10 flex items-center gap-2">
                    START CUSTOMIZING <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in-up"
            onClick={() => setSelectedItem(null)}
          >
              <button 
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-50 p-2"
                onClick={() => setSelectedItem(null)}
              >
                  <X className="w-8 h-8" />
              </button>

              <div 
                className="relative max-w-6xl w-full h-[90vh] flex flex-col md:flex-row gap-8 items-center justify-center" 
                onClick={(e) => e.stopPropagation()}
              >
                  {/* Image Container */}
                  <div className="w-full md:w-2/3 h-1/2 md:h-full relative flex items-center justify-center">
                      <img 
                          src={selectedItem.image} 
                          alt={selectedItem.title} 
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      />
                  </div>

                  {/* Info Sidebar */}
                  <div className="w-full md:w-1/3 text-left p-6 md:p-0">
                      <div className="w-12 h-[2px] bg-[#D4AF37] mb-6"></div>
                      <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{selectedItem.category} Edition</span>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{selectedItem.title}</h3>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 border-l border-zinc-800 pl-4">
                          {selectedItem.desc}<br/>
                          <span className="text-zinc-600 text-xs mt-2 block">
                              Designed & Crafted by PICKIT KOREA
                          </span>
                      </p>
                      
                      <button 
                        onClick={() => {
                            setSelectedItem(null);
                            if(setPage) setPage('metal-custom');
                        }}
                        className="px-8 py-3 border border-zinc-700 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black hover:border-white transition-all w-full md:w-auto"
                      >
                          ORDER THIS STYLE
                      </button>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};

export default Gallery;