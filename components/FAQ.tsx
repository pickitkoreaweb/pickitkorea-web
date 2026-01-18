import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

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
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 transition-all duration-300 ${isOpen ? 'rotate-180 bg-white text-black' : 'text-zinc-500 group-hover:bg-zinc-700'}`}>
           <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2">
            <div className="h-px w-full bg-zinc-800/50 mb-4"></div>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {answer}
            </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "교통카드 기능도 사용 가능한가요?",
      answer: "대부분의 신용/체크카드의 교통카드(RF) 기능은 플라스틱 카드 본체 내부에 안테나 코일 형태로 매립되어 있습니다. \n\nIC 칩만 떼어내어 메탈 카드로 이식하는 경우, 안테나 코일이 없으므로 교통카드 및 비접촉 결제(NFC) 기능을 사용할 수 없습니다. 이 점 꼭 유의하여 주시기 바랍니다."
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
      question: "ATM 기기에서 사용할 수 있나요?",
      answer: "대부분의 IC 전용 ATM 기기에서 사용이 가능합니다. \n\n단, 메탈 소재 특성상 일반 플라스틱 카드보다 무게가 무겁고(약 15~20g) 두께감이 있어, 일부 노후된 기기나 민감한 흡입식 기기에서는 인식이 원활하지 않거나 배출 시 걸림 현상이 발생할 수 있으니 주의가 필요합니다."
    },
    {
      question: "제작 기간과 배송은 얼마나 걸리나요?",
      answer: "주문 및 디자인 시안 확정 후, 정밀 레이저 각인 작업에 약 2~3영업일이 소요됩니다. \n\n검수 과정을 거쳐 발송되며, 택배사 사정에 따라 배송에는 1~2일이 추가로 소요될 수 있습니다. 전체적으로 주문 후 수령까지 약 4~6일을 예상하시면 됩니다."
    },
    {
      question: "A/S 및 환불 규정은 어떻게 되나요?",
      answer: "주문 제작 상품(커스텀 각인) 특성상 제작이 시작된 이후에는 단순 변심으로 인한 환불이 불가능합니다. \n\n단, 수령 직후 발견된 제품 자체의 불량(각인 오류, 소재 불량 등)에 대해서는 6개월간 무상 A/S 또는 재제작을 지원합니다. \n\n※ 구매자의 이식 과정 실수나 사용 중 부주의로 인한 파손/변질은 A/S 대상이 아닙니다."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen relative overflow-hidden">
       {/* Background */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/20 blur-[100px] pointer-events-none"></div>

       <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 mb-6">
                <HelpCircle className="w-3 h-3 text-zinc-400" />
                <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">Support Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                메탈 카드 제작부터 사용까지, 고객님들이 가장 궁금해하시는 점들을 모았습니다. <br />
                더 궁금한 점이 있으시다면 언제든 문의해 주세요.
              </p>
          </div>

          <div className="space-y-4 animate-fade-in-up delay-100">
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

          <div className="mt-20 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center animate-fade-in-up delay-200">
            <MessageCircle className="w-8 h-8 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-zinc-400 mb-6">찾으시는 답변이 없다면 직접 문의해 주세요.</p>
            <button 
                onClick={() => document.getElementById('contact-btn')?.click()} // Trick to trigger nav or just use href
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
            >
                <a href="/?page=contact">Contact Support</a>
            </button>
          </div>
       </div>
    </section>
  );
};

export default FAQ;