import React from 'react';
import { Quote, Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      text: "비즈니스 미팅에서 카드를 꺼내는 순간, 파트너의 눈빛이 달라지는 것을 느꼈습니다. 단순한 결제 수단이 아니라 저를 표현하는 가장 강력한 명함이 되었습니다.",
      author: "최지훈 대표",
      title: "Tech Startup CEO",
      tier: "BLACK EDITION",
      date: "2025.12.10"
    },
    {
      text: "처음에는 IC칩 이식이 걱정되었는데, 가이드 영상을 보고 따라하니 5분도 안 걸렸습니다. 결과물은 기대 이상입니다. 묵직한 무게감과 차가운 감촉이 정말 압도적입니다.",
      author: "김서연 원장",
      title: "Dermatologist",
      tier: "ROSE GOLD",
      date: "2026.01.05"
    },
    {
      text: "센츄리온 카드의 감성을 합리적인 가격에 소유할 수 있다는 점이 매력적입니다. 레이저 각인 디테일이 현미경으로 본 것처럼 정교해서 놀랐습니다.",
      author: "이현우 소장",
      title: "Senior Architect",
      tier: "SILVER BRUSHED",
      date: "2026.01.12"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#080808] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Voices of the Elite</span>
           <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Member Experiences</h2>
           <p className="text-zinc-500 max-w-2xl mx-auto font-light">
             PICKIT 멤버들이 직접 경험한, 무게가 주는 특별한 가치를 확인해보세요.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-zinc-900/20 border border-zinc-800/50 p-8 rounded-2xl relative group hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                  <Quote className="w-8 h-8 text-zinc-700 group-hover:text-white transition-colors" />
                  <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                  </div>
              </div>
              
              <p className="text-zinc-300 text-base leading-relaxed mb-8 font-light break-keep min-h-[80px]">
                "{review.text}"
              </p>
              
              <div className="flex items-end justify-between border-t border-zinc-800 pt-6">
                <div>
                   <h4 className="text-white font-bold">{review.author}</h4>
                   <span className="text-xs text-zinc-500 uppercase tracking-wider block mt-1">{review.title}</span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] font-bold text-zinc-400 border border-zinc-700 px-2 py-1 rounded bg-black/50 block mb-2">
                    {review.tier}
                    </span>
                    <span className="text-[9px] text-zinc-600 block">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;