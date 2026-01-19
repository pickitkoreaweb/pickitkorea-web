import React from 'react';
import { Layers, Globe, Building2, ArrowRight, ArrowLeft } from 'lucide-react';

interface BusinessDomainsProps {
  category?: 'metal' | 'trade' | 'realty';
  onBack?: () => void;
}

const BusinessDomains: React.FC<BusinessDomainsProps> = ({ category, onBack }) => {
  const domains = [
    {
      id: 'metal',
      icon: <Layers className="w-8 h-8 text-[#D4AF37]" />,
      title: "PICKIT METAL",
      subtitle: "Premium Manufacturing",
      desc: "항공우주 등급의 스테인리스 스틸 소재와 초정밀 레이저 각인 기술을 결합하여, 단순한 결제 수단을 넘어선 개인의 아이덴티티를 담은 메탈 카드와 명함을 제작합니다.",
      features: [
        "Custom Metal Card Production (주문제작)",
        "High-Precision Laser Engraving (초정밀 각인)",
        "B2B Corporate Identity Solutions (법인 솔루션)"
      ],
      image: "https://images.unsplash.com/photo-1622675363311-ac97f3598473?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 'trade',
      icon: <Globe className="w-8 h-8 text-[#D4AF37]" />,
      title: "PICKIT TRADE",
      subtitle: "Overseas Purchasing Agency",
      desc: "전 세계 제조 네트워크를 기반으로 최적의 단가와 품질을 보장하는 해외 구매대행 서비스를 제공합니다. 복잡한 통관, 물류, 검수 과정을 원스톱으로 해결하여 귀사의 원가 경쟁력을 극대화합니다.",
      features: [
        "Overseas Purchasing Service (해외 구매대행)",
        "Logistics Optimization (물류 최적화)",
        "Quality Control Management (품질 관리)"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 'realty',
      icon: <Building2 className="w-8 h-8 text-[#D4AF37]" />,
      title: "PICKIT REALTY",
      subtitle: "Real Estate Consulting",
      desc: "철저한 시장 조사와 데이터 분석을 바탕으로 부동산 개발 및 투자에 관한 전문적인 컨설팅을 제공합니다. 사업 참여 제안서 작성부터 상품성 분석까지, 성공적인 프로젝트를 위한 전략적 파트너가 되어드립니다.",
      features: [
        "Market Research & Analysis (시장 조사)",
        "Project Proposal Development (사업 제안서)",
        "Investment Feasibility Study (타당성 분석)"
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  const filteredDomains = category 
    ? domains.filter(d => d.id === category) 
    : domains;

  return (
    <section className="py-24 px-6 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_#D4AF37_0%,_transparent_20%)] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Our Business</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                {category ? filteredDomains[0].title : "Business Domains"}
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                {category 
                  ? filteredDomains[0].subtitle 
                  : "PICKIT은 메탈 카드 제조를 넘어, 무역과 부동산 컨설팅을 아우르는\n종합 비즈니스 솔루션 그룹을 지향합니다."
                }
            </p>
        </div>

        {/* Back Button for Single Category View */}
        {category && onBack && (
            <div className="mb-12 animate-fade-in-up">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </button>
            </div>
        )}

        {/* Domain Cards */}
        <div className={category ? "" : "space-y-32"}>
            {filteredDomains.map((domain, index) => (
                <div 
                    key={domain.id} 
                    className={`flex flex-col lg:flex-row gap-16 items-center group ${!category && index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 relative animate-fade-in-up">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl bg-zinc-900">
                            <img 
                                src={domain.image} 
                                alt={domain.title} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                            
                            {/* Floating Icon Badge */}
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#0a0a0a] border border-zinc-800 rounded-full flex items-center justify-center shadow-2xl z-20 group-hover:scale-110 transition-transform duration-500">
                                {domain.icon}
                            </div>
                        </div>
                        
                        {/* Decorative Background Box */}
                        <div className={`absolute -inset-4 border border-zinc-800/50 rounded-2xl -z-10 transition-transform duration-700 ${!category && index % 2 === 0 ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 animate-fade-in-up delay-100">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-5xl font-serif font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">
                                {category ? '01' : `0${index + 1}`}
                            </span>
                            <div className="h-px bg-zinc-800 flex-1"></div>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{domain.title}</h3>
                        <p className="text-[#D4AF37] font-serif italic mb-6 text-lg">{domain.subtitle}</p>
                        
                        <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base break-keep">
                            {domain.desc}
                        </p>

                        <div className="space-y-4 mb-10">
                            {domain.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 group/item">
                                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover/item:bg-[#D4AF37] transition-colors"></div>
                                    <span className="text-zinc-300 font-medium tracking-wide text-sm group-hover/item:text-white transition-colors">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => document.getElementById('contact-btn')?.click()}
                            className="group inline-flex items-center gap-3 px-8 py-3 border border-zinc-700 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-white hover:text-black transition-all"
                        >
                            Inquire for {domain.title.split(' ')[1]}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Closing Statement (Only show on main overview page) */}
        {!category && (
            <div className="mt-32 pt-20 border-t border-zinc-900 text-center animate-fade-in-up">
                <h3 className="text-2xl font-serif text-white mb-6">Ready to Partner with PICKIT?</h3>
                <p className="text-zinc-500 mb-8 max-w-2xl mx-auto">
                    우리는 단순한 거래처가 아닌, 당신의 비즈니스 성공을 위한 전략적 파트너입니다.<br/>
                    지금 바로 PICKIT GROUP과 함께 새로운 기회를 창출하세요.
                </p>
                <button 
                    onClick={() => document.getElementById('contact-btn')?.click()}
                    className="px-10 py-4 bg-[#D4AF37] text-black font-bold text-sm tracking-widest hover:bg-[#FCE2C4] transition-colors shadow-lg shadow-[#D4AF37]/20"
                >
                    CONTACT US
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default BusinessDomains;