import React from 'react';
import { Globe, Package, Plane, ArrowUpRight } from 'lucide-react';

const OtherServices: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6">
               <Globe className="w-3 h-3 text-zinc-400" />
               <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">Global Concierge</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Boundless Access. <br />
              <span className="text-zinc-500">Premium Purchasing Agency</span>
            </h2>
            
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed break-keep">
              명품 시계, 하이엔드 의류부터 건축 시공 자재까지. 
              PICKIT KOREA는 폭넓은 구매대행 서비스를 제공합니다. 
              전문적인 검수부터 배송까지, 안전하고 완벽하게 진행되는 프리미엄 솔루션을 경험하세요.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors">
                    <Plane className="w-8 h-8 text-white mb-4" />
                    <h4 className="text-white font-bold mb-2">Global Logistics</h4>
                    <p className="text-sm text-zinc-500">미국, 유럽, 일본 등 전 세계 주요 거점을 통한 신속하고 안전한 항공 배송 및 해상 운송.</p>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors">
                    <Package className="w-8 h-8 text-white mb-4" />
                    <h4 className="text-white font-bold mb-2">Secure Care</h4>
                    <p className="text-sm text-zinc-500">품목별 맞춤형 특수 포장 및 실시간 화물 추적 시스템으로 파손과 분실 걱정 없는 안심 서비스.</p>
                </div>
            </div>

            <a href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:text-zinc-300 transition-colors group">
                Start Sourcing Request 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Image / Visual */}
          <div className="order-1 lg:order-2 relative">
             <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-zinc-800 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                
                {/* Image Placeholder - Luxury Goods/Shipping */}
                <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Global Shopping" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                
                <div className="absolute bottom-0 left-0 p-8 z-20">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl inline-block max-w-[250px]">
                        <p className="text-xs text-zinc-300 mb-1 uppercase tracking-wider">Recent Shipment</p>
                        <p className="text-white font-medium">Limited Edition Timepiece</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Arrived in Seoul, KR
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-800/50 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OtherServices;