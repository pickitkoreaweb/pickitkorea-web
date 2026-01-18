import React from 'react';
import { Globe, Watch, Container, Building2, ArrowRight } from 'lucide-react';

interface OtherServicesProps {
  category?: 'luxury' | 'materials' | 'solutions';
}

const OtherServices: React.FC<OtherServicesProps> = ({ category }) => {
  const services = {
    luxury: {
      icon: <Watch className="w-10 h-10 text-white" />,
      titleEn: "Luxury Masterpieces",
      titleKo: "명품 시계 & 의류",
      description: "국내에서 구하기 힘든 하이엔드 타임피스와 럭셔리 의류를 전 세계 부티크 네트워크를 통해 소싱합니다. PICKIT KOREA만의 글로벌 네트워크를 통해 당신이 원하는 단 하나의 아이템을 찾아드립니다. 전문 감정사의 철저한 정품 검수와 특수 보안 배송으로 제품을 수령하는 그 순간까지 완벽한 안심을 약속합니다.",
      features: ["Global Boutique Network", "Expert Authentication", "Secure Logistics"],
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2000&auto=format&fit=crop"
    },
    materials: {
      icon: <Container className="w-10 h-10 text-white" />,
      titleEn: "Site Essentials Sourcing",
      titleKo: "현장 잡자재 해외 구매대행",
      description: "고급 마감재는 취급하지 않습니다. 오직 현장에서 매일 쓰이고 교체되는 이동식 화장실, 핸드카(구르마), 리어카 등 필수 잡자재만을 전문적으로 소싱합니다. 해외 공장 직거래를 통한 구매대행 서비스로 불필요한 유통 마진을 획기적으로 줄였습니다. 자잘한 자재비부터 아끼는 것이 현장 원가 절감의 핵심입니다.",
      features: ["Global Sourcing (해외 구매대행)", "Volume Discount (박리다매)", "Site Essentials (현장 필수재)"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
    },
    solutions: {
      icon: <Building2 className="w-10 h-10 text-white" />,
      titleEn: "Corporate Development & Advisory",
      titleKo: "부동산 개발 & 법률 자문",
      description: "대기업 주도의 대규모 개발 사업을 다수 성공시킨 실무진의 노하우와 전문 변호사 그룹의 법률 자문이 만났습니다. 단순한 개발 대행을 넘어, 법적 리스크를 사전에 차단하고 사업성을 극대화하는 독보적인 솔루션을 제공합니다. 인허가부터 분양, PF 금융 구조화까지 검증된 전문가와 함께 프로젝트를 성공으로 이끄십시오.",
      features: ["Corporate Portfolio (대기업 프로젝트)", "Legal Advisory (법률 자문)", "Risk Management (리스크 관리)"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop"
    }
  };

  const activeService = category ? services[category] : null;

  if (!activeService) return null;

  return (
    <section className="py-24 px-6 bg-zinc-950 min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 via-zinc-900/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Side */}
            <div className="order-2 lg:order-1 relative group">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-zinc-800 shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                        src={activeService.image} 
                        alt={activeService.titleEn} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-8 left-8 z-20">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                           {activeService.icon}
                        </div>
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-800/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6">
                   <Globe className="w-3 h-3 text-zinc-400" />
                   <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">PICKIT Business</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                    {activeService.titleEn}
                </h2>
                <h3 className="text-xl font-bold text-zinc-500 mb-8 font-sans">{activeService.titleKo}</h3>
                
                <p className="text-zinc-400 text-lg mb-10 leading-relaxed break-keep border-l-2 border-zinc-800 pl-6">
                    {activeService.description}
                </p>

                <div className="space-y-4 mb-10">
                    {activeService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <span className="text-zinc-300 font-medium tracking-wide">{feature}</span>
                        </div>
                    ))}
                </div>

                <button className="group inline-flex items-center gap-3 text-white font-semibold hover:text-zinc-300 transition-colors">
                    <span className="border-b border-zinc-700 pb-1 group-hover:border-white transition-colors">Inquire Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;