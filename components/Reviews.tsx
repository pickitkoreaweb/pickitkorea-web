import React from 'react';
import { Quote, Star, ThumbsUp } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      text: "거래처 미팅 때 메탈 명함 건네니 분위기가 완전히 달라졌어요. NFC로 제 정보 바로 뜨는거 보고 다들 감탄하네요. 저를 확실하게 각인시킨 기분입니다.",
      author: "정*훈 대표",
      tier: "SIGNATURE GOLD",
      date: "2026.01.28",
      tag: "#비즈니스필수템"
    },
    {
      text: "결제할 때 직원분이 카드 뭐냐고 물어보시네요 ㅋㅋ 묵직한 그립감 때문에 다시는 플라스틱 카드로 못 돌아갈 것 같아요. 실물이 사진보다 훨씬 고급스럽습니다.",
      author: "최지훈",
      tier: "BLACK EDITION",
      date: "2025.12.10",
      tag: "#실물깡패"
    },
    {
      text: "DIY라 칩 옮기는 거 걱정했는데 가이드 영상 보고 3분 만에 끝냈어요. 애플페이 주로 쓰지만 실물 카드 꺼낼 일이 기다려지네요. 로즈골드 색감 진짜 예쁩니다.",
      author: "김서연",
      tier: "ROSE GOLD",
      date: "2026.01.05",
      tag: "#로즈골드"
    },
    {
      text: "친구들이 다 어디서 했냐고 물어봐요. 테이블에 던질 때 나는 '챙-' 하는 금속 소리가 진짜 쾌감 쩌네요. 나를 위한 선물로 최고입니다. 고민은 배송만 늦출 뿐.",
      author: "이현우",
      tier: "SILVER BRUSHED",
      date: "2026.01.12",
      tag: "#하차감"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#080808] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
           <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Community</span>
           <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Real Reviews</h2>
           <p className="text-zinc-500 max-w-2xl mx-auto font-light">
             먼저 경험한 분들의 솔직한 이야기.<br/>
             <span className="text-zinc-400">#PICKIT</span> 해시태그로 당신의 카드를 자랑해주세요.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-2xl relative group hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-500 hover:-translate-y-2 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-bold text-white border border-zinc-600">
                    {review.author[0]}
                  </div>
                  <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                  </div>
              </div>
              
              <div className="mb-6 min-h-[80px]">
                 <span className="text-[11px] text-[#D4AF37] font-bold mb-2 block">{review.tag}</span>
                 <p className="text-zinc-300 text-sm leading-relaxed font-normal break-keep">
                   "{review.text}"
                 </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                <div>
                   <h4 className="text-white font-bold text-sm truncate max-w-[80px]">{review.author}님</h4>
                   <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">{review.date}</span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] font-bold text-zinc-400 border border-zinc-700 px-2 py-1 rounded bg-black/50 block">
                    {review.tier}
                    </span>
                </div>
              </div>

              {/* Like Button Simulation */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ThumbsUp className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;