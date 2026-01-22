import React, { useState } from 'react';
import { MessageSquare, X, Send, Crown, ArrowRight, Loader2, Smartphone, Sparkles } from 'lucide-react';

const PrivateConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    request: ''
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  // Helper to determine SMS delimiter based on OS
  const getSMSDelimiter = () => {
     if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
        return '&';
     }
     return '?';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate UX delay
    setTimeout(() => {
        // Construct SMS Body
        const messageBody = `[PICKIT VIP 문의]\n\n성함: ${formData.name}\n문의내용: ${formData.request}`;
        const encodedBody = encodeURIComponent(messageBody);
        const delimiter = getSMSDelimiter();
        
        // Target Phone Number (PICKIT Official)
        const phoneNumber = '01082821043';

        // Open SMS Client
        window.location.href = `sms:${phoneNumber}${delimiter}body=${encodedBody}`;

        setIsSubmitting(false);
        setStep('success');
        
        // Reset form data
        setFormData({ name: '', request: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Enhanced Floating Trigger Button */}
      <button 
        onClick={toggleOpen}
        className={`fixed bottom-8 right-8 z-[90] flex items-center justify-between gap-4 pl-6 pr-2 py-2 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FCE2C4] to-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] interactable group bg-[length:200%_auto] animate-shine ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="flex flex-col items-start mr-2">
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-70 mb-0.5">Premium Service</span>
            <span className="text-sm font-black tracking-wider whitespace-nowrap">VIP CONCIERGE</span>
        </div>
        
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#D4AF37] relative overflow-hidden">
            <Smartphone className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full animate-ping"></div>
            <Sparkles className="w-3 h-3 text-white absolute top-2 right-2 animate-pulse" />
        </div>

        {/* Floating Tooltip - Enhanced */}
        <div className="absolute right-0 -top-12 bg-black/90 backdrop-blur border border-[#D4AF37]/50 px-4 py-2 rounded-xl text-xs text-[#D4AF37] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-xl pointer-events-none">
           <span className="font-bold">✨ 365일 24시간 문자 직통</span>
           <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-black/90 border-r border-b border-[#D4AF37]/50 transform rotate-45"></div>
        </div>
      </button>

      {/* Modal Interface */}
      <div className={`fixed bottom-8 right-8 z-[91] w-[350px] md:w-[400px] bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#805e10] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-black font-bold">
                <Crown className="w-5 h-5" />
                <span className="text-sm tracking-wider uppercase">VIP Direct Line</span>
            </div>
            <button onClick={toggleOpen} className="text-black/70 hover:text-black transition-colors interactable">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[300px] flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            
            {step === 'intro' && (
                <div className="flex flex-col h-full animate-fade-in-up">
                    <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-2 uppercase">Priority Service</p>
                    <h3 className="text-white text-xl font-serif mb-4">기다림 없는<br/>1:1 문자 상담 서비스</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        전화 통화가 부담스럽거나 빠른 답변이 필요하신가요?<br/>
                        VIP 전담 매니저에게 문자로 바로 문의하세요.<br/>
                        365일 실시간으로 확인 후 즉시 답변드립니다.
                    </p>
                    <button 
                        onClick={() => setStep('form')}
                        className="mt-auto w-full py-3 bg-white/10 border border-white/20 text-white text-sm font-bold rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group interactable"
                    >
                        문자 문의하기
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {step === 'form' && (
                <form className="flex flex-col gap-3 h-full animate-fade-in-up" onSubmit={handleSubmit}>
                    <div className="text-white font-serif text-lg mb-2">Message Details</div>
                    <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800 mb-2">
                        <p className="text-xs text-zinc-500 mb-1">수신자 (To)</p>
                        <p className="text-[#D4AF37] font-mono text-sm">010-8282-1043 (VIP Manager)</p>
                    </div>

                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        placeholder="성함 (Name)" 
                        onChange={handleInputChange}
                        className="bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none" 
                        required 
                    />
                    
                    <textarea 
                        name="request"
                        value={formData.request}
                        placeholder="문의하실 내용을 입력해주세요." 
                        onChange={handleInputChange}
                        rows={4} 
                        className="bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white focus:border-[#D4AF37] outline-none resize-none"
                        required
                    ></textarea>
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mt-auto w-full py-3 bg-[#D4AF37] text-black text-sm font-bold rounded shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#FCE2C4] transition-all interactable flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Opening App...
                            </>
                        ) : (
                            <>
                                <Smartphone className="w-4 h-4" />
                                Send Text Message
                            </>
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
                    <h3 className="text-white text-lg font-bold mb-2">메시지 앱 연결됨</h3>
                    <p className="text-zinc-400 text-sm">
                        핸드폰의 문자 메시지 앱이 열렸습니다.<br/>
                        작성된 내용을 확인 후 <span className="text-[#D4AF37] font-bold">전송 버튼</span>을<br/>
                        눌러주시면 접수가 완료됩니다.
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