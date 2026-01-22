import React, { useState, useEffect } from 'react';
import { ZoomIn, Filter, Layers } from 'lucide-react';

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

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [portfolio, setPortfolio] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const storedGallery = localStorage.getItem('pickit_gallery');
    if (storedGallery) {
        setPortfolio(JSON.parse(storedGallery));
    } else {
        // Initialize with default data if empty
        setPortfolio(DEFAULT_PORTFOLIO);
        localStorage.setItem('pickit_gallery', JSON.stringify(DEFAULT_PORTFOLIO));
    }
  }, []);

  const filteredItems = filter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <section className="py-24 px-6 bg-[#050505] min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-900/30 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Masterpiece Archive</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                THE GALLERY
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
                오직 PICKIT만이 구현할 수 있는 디테일.<br/>
                실제 출고된 고객님들의 마스터피스를 감상하세요.
            </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-100">
            {['all', 'black', 'gold', 'silver', 'rose'].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type as FilterType)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                        filter === type 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
            {filteredItems.map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer border border-zinc-800">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-100"
                    />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase mb-2 block">{item.desc}</span>
                            <h3 className="text-white text-xl font-serif font-bold">{item.title}</h3>
                        </div>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover:translate-y-0 border border-white/20">
                        <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                </div>
            ))}
            
            {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-zinc-600">
                    <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No items found in this category.</p>
                </div>
            )}
        </div>

        <div className="mt-20 text-center border-t border-zinc-900 pt-10">
            <p className="text-zinc-500 text-sm mb-6">당신만의 디자인을 실현할 준비가 되셨나요?</p>
            <button 
                onClick={() => document.location.href='#/metal-custom'} // Ideally use routing
                className="px-10 py-4 bg-[#D4AF37] text-black font-bold text-xs tracking-widest hover:bg-[#FCE2C4] transition-colors shadow-lg"
            >
                START CUSTOMIZING
            </button>
        </div>

      </div>
    </section>
  );
};

export default Gallery;