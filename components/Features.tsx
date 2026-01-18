import React from 'react';
import { Shield, Smartphone, PenTool, Gem, Layers, CreditCard } from 'lucide-react';

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
          
          {/* Feature 1: Main Large */}
          <div className="md:col-span-2 row-span-1 md:row-span-2 rounded-3xl p-8 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <Gem className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3">Premium Material</h3>
                <p className="text-zinc-400 leading-relaxed max-w-md">
                  최고급 304 스테인리스 스틸을 사용하여 부식에 강하고, 묵직한 무게감을 자랑합니다. 
                  손끝에서 느껴지는 차가운 금속의 질감은 결코 모방할 수 없습니다.
                </p>
              </div>
            </div>
            {/* Decorative abstract shape */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-tl from-zinc-700 to-zinc-900 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl p-8 bg-zinc-900 border border-zinc-800 flex flex-col justify-between group hover:border-zinc-700 transition-colors">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                <Shield className="text-zinc-200 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">RFID Blocking</h3>
                <p className="text-sm text-zinc-400">
                  데이터 도난 방지 기술이 내장되어 당신의 금융 정보를 안전하게 보호합니다.
                </p>
              </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl p-8 bg-zinc-900 border border-zinc-800 flex flex-col justify-between group hover:border-zinc-700 transition-colors">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                <Smartphone className="text-zinc-200 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">IC Chip Transfer</h3>
                <p className="text-sm text-zinc-400">
                  기존 카드의 IC 칩을 완벽하게 이식합니다. 결제 기능은 그대로, 품격은 더 높게.
                </p>
              </div>
          </div>

          {/* Feature 4: Wide */}
          <div className="md:col-span-3 rounded-3xl p-8 bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
             <div className="flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <PenTool className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Laser Engraving</h3>
                <p className="text-zinc-400">
                  0.01mm 오차 범위의 초정밀 레이저 각인 기술로 당신만의 시그니처, 로고, 패턴을 카드에 새겨드립니다. <br/>
                  지워지지 않는 영원한 가치를 경험하세요.
                </p>
             </div>
             <div className="w-full md:w-1/3 h-full min-h-[150px] bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <span className="text-6xl font-serif italic text-white/10">PICKIT</span>
                </div>
                <div className="z-10 bg-white/5 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10">
                  <span className="text-xs tracking-widest uppercase text-zinc-500">Preview</span>
                  <div className="mt-1 font-mono text-white">CUSTOM DESIGN</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;