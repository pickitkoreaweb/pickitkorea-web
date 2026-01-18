import React, { useState } from 'react';
import { MessageSquare, X, Send, Crown, ArrowRight, Loader2 } from 'lucide-react';

const PrivateConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    request: ''
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury service processing time
    setTimeout(() => {
        // Construct Mailto Link
        const subject = `[VIP Concierge Request] ${formData.name}님의 상담 신청`;
        const body = `
=========================================
      VIP PRIVATE CONCIERGE REQUEST
=========================================

고객명 (Name): ${formData.name}
연락처 (Phone): ${formData.phone}

[요청 사항]
${formData.request}

=========================================
* 빠른 시일 내에 연락 부탁드립니다.
        `;

        // Open Email Client
        window.location.href = `mailto:PICKIT.KOREA.OFFICIAL@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setIsSubmitting(false);
        setStep('success');
        
        // Reset form data but keep success screen
        setFormData({ name: '', phone: '', request: '' });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, placeholder } = e.target;
      // Simple mapping based on placeholder as we didn't use name attribute in original design
      if (placeholder.includes('Name')) setFormData(prev => ({ ...prev, name: value }));
      if (placeholder.includes('Phone')) setFormData(prev => ({ ...prev, phone: value }));
      if (placeholder.includes('요청사항')) setFormData(prev => ({ ...prev, request: value }));
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        onClick={toggleOpen}
        className={`fixed bottom-8 right-8 z-[90] flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] interactable group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Crown className="w-6 h-6" />
        <div className="absolute -top-2 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black"></div>
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-black border border-zinc-800 px-3 py-1 rounded text-xs text-[#D4AF37] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
           VIP Concierge
        </div>
      </button>

      {/* Modal Interface */}
      <div className={`fixed bottom-8 right-8 z-[91] w-[350px] md:w-[400px] bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#805e10] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-black font-bold">
                <Crown className="w-5 h-5" />
                <span className="text-sm tracking-wider uppercase">Private Concierge</span>
            </div>
            <button onClick={toggleOpen} className="text-black/70 hover:text-black transition-colors interactable">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[300px] flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            
            {step === 'intro' && (
                <div className="flex flex-col h-full animate-fade-in-up">
                    <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-2 uppercase">Welcome, VIP</p>
                    <h3 className="text-white text-xl font-serif mb-4">특별한 당신만을 위한<br/>1:1 비스포크 상담</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        기업 대량 주문, 커스텀 로고 디자인, 혹은 세상에 하나뿐인 골드바 카드 제작까지. <br/>
                        VIP 전담 매니저가 24시간 이내에 직접 연락드립니다.
                    </p>
                    <button 
                        onClick={() => setStep('form')}
                        className="mt-auto w-full py-3 bg-white/10 border border-white/20 text-white text-sm font-bold rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group interactable"
                    >
                        상담 신청하기
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {step === 'form' && (
                <form className="flex flex-col gap-3 h-full animate-fade-in-up" onSubmit={handleSubmit}>
                    <div className="text-white font-serif text-lg mb-2">Contact Details</div>
                    <input 
                        type="text" 
                        placeholder="성함 (Name)" 
                        onChange={handleInputChange}
                        className="bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" 
                        required 
                    />
                    <input 
                        type="tel" 
                        placeholder="연락처 (Phone)" 
                        onChange={handleInputChange}
                        className="bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" 
                        required 
                    />
                    <textarea 
                        placeholder="요청사항을 간략히 적어주세요." 
                        onChange={handleInputChange}
                        rows={3} 
                        className="bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none resize-none"
                    ></textarea>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mt-2 w-full py-3 bg-[#D4AF37] text-black text-sm font-bold rounded shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#FCE2C4] transition-all interactable flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Request Callback"
                        )}
                    </button>
                    <button type="button" onClick={() => setStep('intro')} className="text-xs text-zinc-500 hover:text-white text-center mt-2 underline">Back</button>
                </form>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4 border border-[#D4AF37]">
                        <Send className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">접수되었습니다.</h3>
                    <p className="text-zinc-400 text-sm">
                        이메일 클라이언트가 열렸다면<br/>
                        <span className="text-[#D4AF37]">보내기 버튼</span>을 꼭 눌러주세요.<br/>
                        VIP 전담 팀이 곧 연락드리겠습니다.
                    </p>
                    <button onClick={toggleOpen} className="mt-6 text-[#D4AF37] text-xs font-bold tracking-widest hover:text-white uppercase">
                        Close Window
                    </button>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default PrivateConcierge;