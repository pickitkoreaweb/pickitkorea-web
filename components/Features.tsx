import React from 'react';
import { PenTool, Gem } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Beyond Plastic.
          </h2>
          <p className="text-xl text-zinc-400 max-w-xl">
            가벼운 플라스틱 카드는 잊으세요. <br />
            항공우주 등급의 스테인리스 스틸과 정밀한 레이저 각인으로 완성됩니다.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Feature 1: Main Large with Image Background */}
          <div className="md:col-span-3 row-span-1 md:row-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
            {/* Background Image - Real Stainless Steel Texture */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" 
                    alt="Brushed Stainless Steel Texture" 
                    className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105 opacity-60"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/10 shadow-lg">
                <Gem className="text-white w-6 h-6" />
              </div>
              
              <div className="max-w-2xl mt-auto">
                <h3 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">Premium Material</h3>
                <p className="text-zinc-200 leading-relaxed text-lg drop-shadow-md">
                  최고급 304 스테인리스 스틸을 사용하여 부식에 강하고, 묵직한 무게감을 자랑합니다. 
                  손끝에서 느껴지는 차가운 금속의 헤어라인 텍스처는 결코 모방할 수 없습니다. 
                  단순한 결제 수단을 넘어, 당신의 아이덴티티를 대변하는 오브제가 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Wide */}
          <div className="md:col-span-3 rounded-3xl p-8 bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group relative overflow-hidden">
             {/* Subtle background glow */}
             <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-700/10 rounded-full blur-[80px]"></div>

             <div className="flex-1 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5">
                  <PenTool className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Laser Engraving</h3>
                <p className="text-zinc-400">
                  0.01mm 오차 범위의 초정밀 레이저 각인 기술로 당신만의 시그니처, 로고, 패턴을 카드에 새겨드립니다. <br/>
                  지워지지 않는 영원한 가치를 경험하세요.
                </p>
             </div>
             
             {/* Visual representation of laser engraving */}
             <div className="w-full md:w-1/3 h-full min-h-[200px] bg-black rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden relative group-hover:border-zinc-700 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black"></div>
                
                {/* Laser beam effect */}
                <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent to-white opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse"></div>
                
                <div className="z-10 text-center">
                  <span className="text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 opacity-20">PICKIT</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;