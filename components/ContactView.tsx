import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, ArrowRight, Handshake, Building2, User, RectangleHorizontal, UserSquare2, BadgeCheck, FileText, Users, Globe, Briefcase, Stethoscope, Scale, Crown, Zap, FileCheck } from 'lucide-react';

type InterestType = 'Metal Card' | 'Corporate' | 'Partnership';

interface ContactViewProps {
  initialTab?: InterestType;
}

const ContactView: React.FC<ContactViewProps> = ({ initialTab = 'Metal Card' }) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    interest: InterestType;
    industry?: string; 
    productType?: string; 
    companyName?: string; // B2B
    position?: string; // B2B
    quantity?: string; // B2B
    message: string;
  }>({
    name: '',
    phone: '',
    email: '',
    interest: initialTab,
    industry: '',
    productType: '',
    companyName: '',
    position: '',
    quantity: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: InterestType) => {
    setFormData(prev => ({ 
        ...prev, 
        interest: value, 
        industry: '', 
        productType: '',
        companyName: '',
        position: '',
        quantity: ''
    }));
  };

  const handleGoToInquiry = () => {
    setFormData(prev => ({ 
        ...prev, 
        interest: 'Corporate'
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      let subject = `[PICKIT 문의] ${formData.name}님의 ${formData.interest} 문의`;
      let details = `문의 유형: ${formData.interest}`;
      
      const body = `
--------------------------------------------------
[문의 내용]
성함: ${formData.name}
연락처: ${formData.phone}
이메일: ${formData.email}
${details}
--------------------------------------------------

문의 내용:
${formData.message}
      `;

      window.location.href = `mailto:pickit.korea.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setStatus('success');
      
      setTimeout(() => {
        setFormData(prev => ({
            ...prev,
            name: '',
            phone: '',
            email: '',
            message: '',
            companyName: '',
            position: '',
            quantity: '',
            industry: '',
            productType: ''
        }));
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  // --- RENDER LOGIC SWITCH ---
  // If tab is 'Partnership', we render a completely different B2B Landing Page
  if (formData.interest === 'Partnership') {
      return (
        <section className="py-24 px-6 bg-[#050505] min-h-screen relative overflow-hidden">
            {/* B2B Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/30 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_#D4AF37_0%,_transparent_15%)] opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* B2B Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">For Business</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        Elevate Your <br/>
                        <span className="text-zinc-500">Corporate Identity.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        병/의원, 법무법인, 기업의 품격에 걸맞은 프리미엄 메탈 솔루션.<br/>
                        PICKIT B2B 전담팀이 귀사의 브랜드 가치를 높여드립니다.
                    </p>
                </div>

                {/* B2B Value Proposition Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-fade-in-up delay-100">
                    <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl group hover:border-[#D4AF37]/30 transition-colors hover:bg-zinc-900/50">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-[#D4AF37]/50 transition-colors">
                            <Stethoscope className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Medical</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            원장님 및 의료진을 위한 프리미엄 메탈 명함 및 데스크 명패 제작. 병원의 신뢰도를 높이세요.
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl group hover:border-[#D4AF37]/30 transition-colors hover:bg-zinc-900/50">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-[#D4AF37]/50 transition-colors">
                            <Scale className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Legal</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            변호사, 법무사님을 위한 무게감 있는 메탈 솔루션. 클라이언트에게 강렬한 첫인상을 남깁니다.
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl group hover:border-[#D4AF37]/30 transition-colors hover:bg-zinc-900/50">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-[#D4AF37]/50 transition-colors">
                            <Briefcase className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Corporate</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            VIP 클라이언트 선물용, 임원진 전용 법인 카드 및 사원증 제작. 대량 주문 시 특별 할인이 적용됩니다.
                        </p>
                    </div>
                </div>

                {/* New Trusted Partnership Section (Replacing Form) */}
                <div className="border-t border-zinc-900 pt-20 animate-fade-in-up delay-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        
                        {/* Left: Benefits Text */}
                        <div>
                            <h3 className="text-3xl font-serif text-white mb-8">
                                Exclusive Privileges <br/>
                                <span className="text-zinc-500">for Partners</span>
                            </h3>
                            <div className="space-y-10">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37]/20 shrink-0">
                                        <Crown className="w-5 h-5 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Volume Pricing Policy</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            수량에 따른 차등 할인율(Volume Discount)이 적용됩니다.<br/>
                                            합리적인 비용으로 최고의 기업 브랜딩 효과를 누리세요.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Priority Production</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            기업 고객 전용 패스트트랙(Fast-Track) 라인을 통해<br/>
                                            일반 주문보다 우선적으로 제작되어 납기일을 준수합니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                                        <FileCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Corporate Documentation</h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            견적서, 거래명세서, 세금계산서 발행 등<br/>
                                            법인 지출 증빙에 필요한 모든 행정 업무를 완벽 지원합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Premium CTA Card */}
                        <div className="bg-[#0f0f0f] border border-zinc-800 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors shadow-2xl">
                             {/* Background Effects */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[60px] pointer-events-none"></div>
                             <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                             
                             <div className="relative z-10 flex flex-col items-center">
                                 <Building2 className="w-16 h-16 text-white mb-6 opacity-90" />
                                 
                                 <h3 className="text-3xl font-bold text-white mb-4">Start Partnership</h3>
                                 <p className="text-zinc-400 text-sm mb-10 leading-relaxed max-w-sm">
                                     귀사의 품격을 높일 준비가 되셨나요?<br/>
                                     전담 매니저가 1:1 상담을 통해 최적의 솔루션을 제안합니다.
                                 </p>
                                 
                                 <button 
                                    onClick={handleGoToInquiry}
                                    className="w-full py-5 bg-[#D4AF37] text-black font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-[#FCE2C4] transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-[1.02] flex items-center justify-center gap-3"
                                 >
                                     <Mail className="w-4 h-4" />
                                     Contact for B2B
                                 </button>
                                 
                                 <div className="mt-8 pt-6 border-t border-zinc-800/50 w-full">
                                     <p className="text-zinc-600 text-xs font-mono">
                                         Average Response Time: <span className="text-[#D4AF37]">Within 2 Hours</span>
                                     </p>
                                 </div>
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
      );
  }

  // --- STANDARD CONTACT VIEW (Customer Support) ---
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
                    <p className="text-white text-lg font-medium break-all tracking-wide">pickit.korea.official@gmail.com</p>
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
                    <p className="text-white text-lg font-medium tracking-wide group-hover/item:text-[#D4AF37] transition-colors">010-8282-1043</p>
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
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
               </div>

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
                placeholder="문의하실 내용을 자유롭게 적어주세요."
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