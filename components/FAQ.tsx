import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Star, Quote, ThumbsUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden transition-all duration-300 hover:border-zinc-700">
      <button 
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-sm md:text-base font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-zinc-800 transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 bg-white text-black' : 'text-zinc-500 group-hover:bg-zinc-700'}`}>
           <ChevronDown className="w-3 h-3" />
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2">
            <div className="h-px w-full bg-zinc-800/50 mb-4"></div>
            <p className="text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                {answer}
            </p>
        </div>
      </div>
    </div>
  );
};

interface FAQProps {
  setPage?: (page: string) => void;
}

const FAQ: React.FC<FAQProps> = ({ setPage }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "교통카드 기능도 사용 가능한가요?",
      answer: "대부분의 신용/체크카드의 교통카드(RF) 기능은 플라스틱 카드 본체 내부에 안테나 코일 형태로 매립되어 있습니다. \n\nIC 칩만 떼어내어 메탈 카드로 이식하는 경우, 안테나 코일이 없으므로 교통카드 및 비접촉 결제(NFC) 기능을 사용할 수 없습니다. 이 점 꼭 유의하여 주시기 바랍니다."
    },
    {
      question: "메탈 명함은 스마트폰 인식이 되나요? (NFC)",
      answer: "네, PICKIT 메탈 명함(Business Card)은 스마트 NFC 칩이 내장되어 있습니다. \n\n상대방의 스마트폰 뒷면에 명함을 가볍게 태그하면, 저장해둔 연락처, 포트폴리오, 회사 웹사이트 등으로 즉시 연결됩니다. 별도의 앱 설치 없이 아이폰과 갤럭시 모두 호환됩니다."
    },
    {
      question: "명함 제작 최소 수량은 어떻게 되나요?",
      answer: "PICKIT은 1장부터 주문 제작이 가능합니다. \n\n프리미엄 소량 생산을 원칙으로 하며, 단 1장의 명함이라도 최고급 공정을 거쳐 제작됩니다. 기업 로고 각인이 필요한 10장 이상의 단체 주문의 경우 B2B 전담팀을 통해 특별 할인이 적용됩니다."
    },
    {
      question: "IC 칩 이식은 어떻게 진행하나요?",
      answer: "PICKIT 메탈 카드는 'DIY (Do It Yourself)' 방식입니다. \n\n기존 플라스틱 카드에 열(헤어드라이어, 히팅건 등)을 가해 IC 칩을 유연하게 만든 뒤 조심스럽게 떼어내어, 배송받으신 메탈 카드의 칩 슬롯에 부착하시면 됩니다. 자세한 가이드는 구매 시 별도로 안내해 드립니다."
    },
    {
      question: "마그네틱 결제(긁는 방식)는 되나요?",
      answer: "메탈 카드의 경우 주로 IC 칩 삽입 결제 방식을 권장합니다. \n\n마그네틱 스트라이프(MS) 이식은 기술적으로 매우 까다로우며 성공률이 낮습니다. 최근 대부분의 매장에서는 IC 칩 우선 결제가 표준이므로 실사용에 큰 불편함은 없습니다."
    },
    {
      question: "제작 기간과 배송은 얼마나 걸리나요?",
      answer: "주문 및 디자인 시안 확정 후, 정밀 레이저 각인 작업에 약 2~3영업일이 소요됩니다. \n\n검수 과정을 거쳐 발송되며, 택배사 사정에 따라 배송에는 1~2일이 추가로 소요될 수 있습니다. 전체적으로 주문 후 수령까지 약 4~6일을 예상하시면 됩니다."
    }
  ];

  const reviews = [
    {
      text: "결제할 때 직원분이 카드 뭐냐고 물어보시네요 ㅋㅋ 묵직한 그립감 때문에 다시는 플라스틱 카드로 못 돌아갈 것 같아요.",
      author: "최지훈",
      tier: "BLACK",
      tag: "#실물깡패"
    },
    {
      text: "거래처 미팅 때 메탈 명함 건네니 분위기가 확 달라집니다. NFC로 제 포트폴리오 바로 뜨는거 보고 다들 감탄하네요. 저를 확실하게 각인시킨 기분입니다.",
      author: "정*훈 대표",
      tier: "SIGNATURE",
      tag: "#비즈니스필수템"
    },
    {
      text: "DIY라 칩 옮기는 거 걱정했는데 가이드 영상 보고 3분 만에 끝냈어요. 로즈골드 색감 진짜 예쁩니다.",
      author: "김서연",
      tier: "ROSE",
      tag: "#로즈골드"
    },
    {
      text: "친구들이 다 어디서 했냐고 물어봐요. 테이블에 던질 때 나는 '챙-' 하는 금속 소리가 진짜 쾌감 쩌네요.",
      author: "이현우",
      tier: "SILVER",
      tag: "#하차감"
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen relative overflow-hidden">
       {/* Background */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/20 blur-[100px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6">
                <HelpCircle className="w-3 h-3 text-zinc-400" />
                <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">Support & Community</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Help Center</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                자주 묻는 질문과 실제 사용자들의 생생한 후기를 확인하세요.
              </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: FAQ */}
            <div className="lg:col-span-7 animate-fade-in-up delay-100">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                    Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                    <FAQItem 
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                    ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-left">
                         <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-zinc-400" />
                         </div>
                         <div>
                            <p className="text-white font-bold text-sm">Still have questions?</p>
                            <p className="text-zinc-500 text-xs">직접 문의하시면 빠르게 답변해 드립니다.</p>
                         </div>
                    </div>
                    <button 
                        onClick={() => setPage && setPage('contact')} 
                        className="px-6 py-2.5 bg-white text-black font-bold text-xs rounded-lg hover:bg-zinc-200 transition-colors w-full md:w-auto"
                    >
                        CONTACT US
                    </button>
                </div>
            </div>

            {/* Right Column: Reviews */}
            <div className="lg:col-span-5 animate-fade-in-up delay-200">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-zinc-700 rounded-full"></span>
                    Customer Stories
                </h3>
                
                <div className="space-y-4 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-800 z-0"></div>

                    {reviews.map((review, idx) => (
                        <div key={idx} className="relative z-10 bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-xs font-bold text-zinc-400">
                                    {review.author[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
                                            ))}
                                        </div>
                                        <span className="text-[9px] font-bold text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded uppercase">{review.tier}</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed mb-3 break-keep">
                                        "{review.text}"
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-white">{review.author}님</span>
                                        <span className="text-[10px] text-[#D4AF37] font-bold">{review.tag}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed text-center">
                         <p className="text-zinc-500 text-sm mb-2">더 많은 후기가 궁금하신가요?</p>
                         <button 
                            onClick={() => window.open('https://www.instagram.com/pickit.korea.official/', '_blank')}
                            className="text-xs text-white underline hover:text-[#D4AF37] transition-colors"
                         >
                            인스타그램 @pickit.korea.official 확인하기
                         </button>
                    </div>
                </div>
            </div>

          </div>
       </div>
    </section>
  );
};

export default FAQ;