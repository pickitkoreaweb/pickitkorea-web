import React from 'react';
import { Globe, Watch, Container, Building2, ArrowUpRight } from 'lucide-react';

const OtherServices: React.FC = () => {
  const services = [
    {
      icon: <Watch className="w-8 h-8 text-white" />,
      titleEn: "Luxury Masterpieces",
      titleKo: "명품 시계 & 의류",
      description: "국내에서 구하기 힘든 하이엔드 타임피스와 럭셔리 의류를 전 세계 부티크 네트워크를 통해 소싱합니다. 철저한 정품 검수와 안전한 배송으로 최상의 만족을 드립니다.",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      icon: <Container className="w-8 h-8 text-white" />,
      titleEn: "Global Materials",
      titleKo: "건축 & 시공 자재",
      description: "최고급 건축 자재와 인테리어 마감재의 해외 직수입부터 현장 조달까지. 복잡한 통관 절차와 물류 프로세스를 원스톱으로 해결하여 공기를 단축시킵니다.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      icon: <Building2 className="w-8 h-8 text-white" />,
      titleEn: "Real Estate Solutions",
      titleKo: "부동산 개발 & 자문",
      description: "부동산 개발 사업의 기획 단계부터 복잡한 인허가 절차, 그리고 전문적인 자문 서비스까지. 성공적인 프로젝트를 위한 전략적 파트너십을 제공합니다.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6">
               <Globe className="w-3 h-3 text-zinc-400" />
               <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">Business Expansion</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Beyond the Card. <br />
              <span className="text-zinc-500">Comprehensive Solutions.</span>
            </h2>
          </div>
          <p className="hidden md:block text-zinc-400 max-w-sm text-right leading-relaxed break-keep">
            PICKIT KOREA는 라이프스타일과 비즈니스를 아우르는 <br/>
            다양한 영역에서 최상의 가치를 제안합니다.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-colors duration-500">
              
              {/* Image Area */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.titleEn} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 z-20">
                   <div className="w-14 h-14 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                      {service.icon}
                   </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8 relative z-20 -mt-10">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#fcf6ba] transition-colors">{service.titleEn}</h3>
                <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">{service.titleKo}</h4>
                <p className="text-zinc-400 leading-relaxed text-sm break-keep">
                  {service.description}
                </p>
                
                <div className="mt-8 flex items-center text-white text-sm font-semibold gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OtherServices;