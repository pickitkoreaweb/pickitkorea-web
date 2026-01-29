import React from 'react';
import { Building2, Globe, Layers, ArrowRight, TrendingUp, Handshake, Landmark } from 'lucide-react';

interface CorporateHomeProps {
  setPage: (page: string) => void;
}

const CorporateHome: React.FC<CorporateHomeProps> = ({ setPage }) => {
  return (
    <div className="bg-[#050505] min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-tight">
                BEYOND<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200">MATERIAL.</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                우리는 단순한 제품을 넘어 비즈니스의 격을 높이는 <br/>
                <strong className="text-white">프리미엄 솔루션 그룹</strong>입니다.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button 
                    onClick={() => setPage('partnership')}
                    className="px-10 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
                >
                    Partner Inquiry <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-6 border-b border-zinc-900">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Vision</span>
                      <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                          Defining the<br/>
                          Standard of Luxury.
                      </h2>
                      <p className="text-zinc-400 text-lg leading-relaxed mb-8 break-keep">
                          PICKIT KOREA는 금속 가공 기술을 기반으로 시작하여, 
                          글로벌 소싱 및 부동산 개발 컨설팅까지 사업 영역을 확장하고 있습니다. 
                          각 분야 최고의 전문가들이 모여 고객의 비즈니스 성공을 위한 최적의 전략을 제시합니다.
                      </p>
                      <div className="flex gap-8">
                          <div>
                              <h4 className="text-3xl font-bold text-white mb-1">2026</h4>
                              <p className="text-zinc-600 text-xs uppercase tracking-wider">Established</p>
                          </div>
                          <div>
                              <h4 className="text-3xl font-bold text-white mb-1">3+</h4>
                              <p className="text-zinc-600 text-xs uppercase tracking-wider">Divisions</p>
                          </div>
                          <div>
                              <h4 className="text-3xl font-bold text-white mb-1">Global</h4>
                              <p className="text-zinc-600 text-xs uppercase tracking-wider">Network</p>
                          </div>
                      </div>
                  </div>
                  <div className="relative">
                      <div className="aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" alt="Office" className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000" />
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Divisions Grid */}
      <section className="py-32 px-6 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Divisions</h2>
                  <p className="text-zinc-500">PICKIT KOREA의 3대 핵심 사업 영역입니다.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Division 1: Metal (Main) */}
                  <div className="group bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-[#D4AF37]/50 transition-all hover:-translate-y-2">
                      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:border-[#D4AF37] transition-colors">
                          <Layers className="w-7 h-7 text-white group-hover:text-[#D4AF37]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">PICKIT METAL</h3>
                      <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6">Manufacturing</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8 h-20">
                          항공우주 등급 스테인리스 스틸 소재의 프리미엄 메탈 카드 및 명함 제조. 
                          초정밀 레이저 각인 기술로 압도적인 퀄리티를 제공합니다.
                      </p>
                      <button 
                        onClick={() => setPage('home')}
                        className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] transition-colors"
                      >
                          Go to Store
                      </button>
                  </div>

                  {/* Division 2: Trade */}
                  <div className="group bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-2">
                      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:border-blue-500 transition-colors">
                          <Globe className="w-7 h-7 text-white group-hover:text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">PICKIT TRADE</h3>
                      <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-6">Global Sourcing</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8 h-20">
                          전 세계 제조 네트워크를 통한 원자재 및 현장 잡자재 직수입 대행. 
                          불필요한 유통 마진을 제거하여 기업의 원가 경쟁력을 극대화합니다.
                      </p>
                      <button 
                        onClick={() => setPage('partnership')}
                        className="w-full py-4 border border-zinc-700 text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors"
                      >
                          B2B Inquiry
                      </button>
                  </div>

                  {/* Division 3: Realty */}
                  <div className="group bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-green-500/50 transition-all hover:-translate-y-2">
                      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-8 border border-zinc-800 group-hover:border-green-500 transition-colors">
                          <Landmark className="w-7 h-7 text-white group-hover:text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">PICKIT REALTY</h3>
                      <p className="text-green-500 text-xs font-bold tracking-widest uppercase mb-6">Development & Consulting</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-8 h-20">
                          부동산 개발 사업 타당성 분석 및 투자 컨설팅. 
                          전문 법률 자문단과 함께 성공적인 프로젝트 수행을 위한 전략적 솔루션을 제공합니다.
                      </p>
                      <button 
                        onClick={() => setPage('partnership')}
                        className="w-full py-4 border border-zinc-700 text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors"
                      >
                          Consulting
                      </button>
                  </div>

              </div>
          </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 border-t border-zinc-900 text-center">
          <div className="mb-4">
              <span className="text-2xl font-bold text-white tracking-widest">PICKIT KOREA</span>
          </div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
              © 2026 PICKIT KOREA Inc. All Rights Reserved.
          </p>
      </footer>

    </div>
  );
};

export default CorporateHome;