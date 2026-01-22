import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, ArrowRight, Handshake, Building2, User } from 'lucide-react';

const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Metal Card',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, interest: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      const subject = `[PICKIT 문의] ${formData.name}님의 ${formData.interest} 문의`;
      const body = `
--------------------------------------------------
[문의 내용]
성함: ${formData.name}
연락처: ${formData.phone}
이메일: ${formData.email}
문의 유형: ${formData.interest}
--------------------------------------------------

문의 내용:
${formData.message}
      `;

      window.location.href = `mailto:PICKIT.KOREA.OFFICIAL@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setStatus('success');
      
      setTimeout(() => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            interest: 'Metal Card',
            message: ''
        });
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Luxurious Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Concierge Service</span>
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-white mb-6">Start Your Journey</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            PICKIT KOREA의 프리미엄 서비스에 대해 궁금한 점이 있으신가요? <br />
            VIP 전담 팀이 당신의 질문에 신속하고 품격 있게 응대합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Info Card */}
          <div className="space-y-8 animate-fade-in-up delay-100">
            <div className="bg-zinc-900/40 backdrop-blur-xl p-10 rounded-3xl border border-zinc-800/50 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <h3 className="text-2xl font-serif text-white mb-10">Contact Information</h3>
              
              <div className="space-y-10">
                {/* Email */}
                <div className="flex items-start gap-6 group/item">
                  <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center border border-zinc-700 group-hover/item:border-[#D4AF37] group-hover/item:text-[#D4AF37] transition-colors shrink-0">
                    <Mail className="w-5 h-5 text-zinc-400 group-hover/item:text-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Inquiry</h4>
                    <p className="text-white text-lg font-medium break-all tracking-wide">PICKIT.KOREA.OFFICIAL@GMAIL.COM</p>
                  </div>
                </div>

                {/* Phone Link (Updated) */}
                <a 
                   href="tel:01082821043"
                   className="flex items-start gap-6 group/item cursor-pointer"
                >
                  <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center border border-zinc-700 group-hover/item:border-[#D4AF37] group-hover/item:bg-[#D4AF37]/10 transition-colors shrink-0 relative">
                    <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover/item:opacity-20 rounded-full animate-ping"></div>
                    <Phone className="w-5 h-5 text-zinc-400 group-hover/item:text-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 group-hover/item:text-[#D4AF37] transition-colors">Direct Call</h4>
                    <p className="text-white text-lg font-medium tracking-wide group-hover/item:text-[#D4AF37] transition-colors">+82 10 8282 1043</p>
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                         Available • Mon-Fri, 09:00 - 18:00
                    </p>
                  </div>
                </a>

                {/* Address */}
                <a 
                   href="https://map.naver.com/p/search/서울특별시 강남구 역삼로20길 10" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-start gap-6 group/item cursor-pointer"
                >
                  <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center border border-zinc-700 group-hover/item:border-[#D4AF37] transition-colors shrink-0">
                    <MapPin className="w-5 h-5 text-zinc-400 group-hover/item:text-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Atelier & Office</h4>
                    <p className="text-white text-base font-light leading-relaxed group-hover/item:text-zinc-200 transition-colors">
                      서울특별시 강남구 역삼로20길 10 <br />
                      테헤란로 쓰리엠타워 11층 PICKITKOREA
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#D4AF37] font-bold opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-[-10px] group-hover/item:translate-x-0">
                        View on Map <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Enhanced Design) */}
          <form className="space-y-6 animate-fade-in-up delay-200" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${focusedField === 'name' ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="성함" 
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2 group">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${focusedField === 'phone' ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="연락처" 
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${focusedField === 'email' ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="이메일 주소" 
                className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-4">
               <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Inquiry Purpose</label>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Metal Card */}
                  <div 
                    onClick={() => handleRadioChange('Metal Card')}
                    className={`flex flex-col items-center justify-center gap-2 px-2 py-4 border rounded-xl cursor-pointer transition-all duration-300 ${formData.interest === 'Metal Card' ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:bg-zinc-900'}`}
                  >
                      <User className={`w-5 h-5 ${formData.interest === 'Metal Card' ? 'text-black' : 'text-zinc-600'}`} />
                      <span className="text-xs whitespace-nowrap">Individual</span>
                  </div>

                  {/* Corporate */}
                  <div 
                    onClick={() => handleRadioChange('Corporate')}
                    className={`flex flex-col items-center justify-center gap-2 px-2 py-4 border rounded-xl cursor-pointer transition-all duration-300 ${formData.interest === 'Corporate' ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:bg-zinc-900'}`}
                  >
                      <Building2 className={`w-5 h-5 ${formData.interest === 'Corporate' ? 'text-black' : 'text-zinc-600'}`} />
                      <span className="text-xs whitespace-nowrap">Corporate B2B</span>
                  </div>

                  {/* Partnership */}
                  <div 
                    onClick={() => handleRadioChange('Partnership')}
                    className={`flex flex-col items-center justify-center gap-2 px-2 py-4 border rounded-xl cursor-pointer transition-all duration-300 ${formData.interest === 'Partnership' ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:bg-zinc-900'}`}
                  >
                      <Handshake className={`w-5 h-5 ${formData.interest === 'Partnership' ? 'text-black' : 'text-zinc-600'}`} />
                      <span className="text-xs whitespace-nowrap">Strategic Alliance</span>
                  </div>
               </div>

               {/* Dynamic Content based on selection to emphasize Premium Strategy */}
                <div className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800/50 text-xs leading-relaxed text-zinc-400 animate-fade-in-up">
                    {formData.interest === 'Metal Card' && (
                        <p>
                            세상에 단 하나뿐인 나만의 메탈 카드를 제작합니다. <br/>
                            <span className="text-[#D4AF37] font-bold">개인 고객 전용</span> 1:1 커스텀 상담 채널입니다.
                        </p>
                    )}
                    {formData.interest === 'Corporate' && (
                        <p>
                            기업의 품격을 높이는 법인 카드 및 멤버십 카드 대량 제작.<br/>
                            <span className="text-[#D4AF37] font-bold">최소 수량 10매 이상</span>부터 진행 가능한 기업 전용 서비스입니다.
                        </p>
                    )}
                    {formData.interest === 'Partnership' && (
                        <div>
                            <span className="text-white font-serif font-bold text-sm block mb-2">High-End Brand Partnership</span>
                            <p>
                                PICKIT은 단순한 입점 제안을 받지 않습니다. 
                                럭셔리 라이프스타일, 프리미엄 멤버십, 명품 브랜드와의 <span className="text-[#D4AF37] font-bold">전략적 제휴(Strategic Alliance)</span>만을 검토하며, 
                                브랜드 가치를 공유하며 함께 성장할 수 있는 제안을 기다립니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2 group">
              <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${focusedField === 'message' ? 'text-[#D4AF37]' : 'text-zinc-500'}`}>Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                placeholder={formData.interest === 'Partnership' ? "제안 내용을 간략히 기재해주시면, 담당 부서 검토 후 연락드립니다." : "문의하실 내용을 자유롭게 적어주세요."}
                className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button 
                type="submit" 
                disabled={status !== 'idle'}
                className={`w-full py-5 font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-500 flex items-center justify-center gap-2 group relative overflow-hidden ${status === 'success' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-white text-black hover:bg-[#D4AF37]'}`}
            >
              {status === 'idle' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
              )}
              
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  PROCESSING REQUEST...
                </>
              ) : status === 'success' ? (
                <>
                  INQUIRY SENT SUCCESSFULLY
                  <CheckCircle2 className="w-5 h-5" />
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactView;