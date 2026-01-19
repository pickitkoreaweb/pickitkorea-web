import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Metal Card',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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

    // Simulate network delay for better UX
    setTimeout(() => {
      // Construct Mailto Link
      const subject = `[PICKIT 문의] ${formData.name}님의 ${formData.interest} 문의`;
      const body = `
--------------------------------------------------
[문의 내용]
성함: ${formData.name}
연락처: ${formData.phone}
이메일: ${formData.email}
관심 분야: ${formData.interest}
--------------------------------------------------

문의 내용:
${formData.message}
      `;

      // Open Email Client
      window.location.href = `mailto:PICKIT.KOREA.OFFICIAL@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setStatus('success');
      
      // Reset form after 3 seconds
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
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Start Your Journey</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            PICKIT KOREA의 프리미엄 서비스에 대해 궁금한 점이 있으신가요? <br />
            아래 양식을 통해 문의주시면 담당자가 신속하게 답변 드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-600 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-1">Email</h4>
                    <p className="text-white text-lg font-medium break-all">PICKIT.KOREA.OFFICIAL@GMAIL.COM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-1">Phone</h4>
                    <p className="text-white text-lg font-medium">+82 10 8282 1043</p>
                    <p className="text-sm text-zinc-400 mt-1">Mon - Fri, 09:00 - 18:00 KST</p>
                  </div>
                </div>

                <a 
                   href="https://map.naver.com/p/search/서울특별시 강남구 역삼로20길 10" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all">
                    <MapPin className="w-5 h-5 text-white group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-1 group-hover:text-white transition-colors">Office</h4>
                    <p className="text-white text-lg font-medium leading-relaxed underline decoration-zinc-700 decoration-1 underline-offset-4 group-hover:decoration-[#D4AF37] transition-all">
                      서울특별시 강남구 역삼로20길 10 <br />
                      테헤란로 쓰리엠타워 11층 PICKITKOREA
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 ml-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium text-zinc-400 ml-1">Interest</label>
               <div className="grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => handleRadioChange('Metal Card')}
                    className={`flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer transition-colors ${formData.interest === 'Metal Card' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400'}`}
                  >
                      <span className="text-sm font-medium">Metal Card</span>
                  </div>
                  <div 
                    onClick={() => handleRadioChange('Business')}
                    className={`flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer transition-colors ${formData.interest === 'Business' ? 'bg-white text-black border-white' : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400'}`}
                  >
                      <span className="text-sm font-medium">Business</span>
                  </div>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="How can we help you?" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
                type="submit" 
                disabled={status !== 'idle'}
                className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group ${status === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  Message Sent
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  Send Message
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