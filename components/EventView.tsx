import React from 'react';
import { Instagram, Gift, ArrowRight, Smartphone, CheckCircle2, Copy } from 'lucide-react';

const EventView: React.FC = () => {
  const handleCopyHashTag = () => {
    navigator.clipboard.writeText('#PICKIT #피킷 #메탈카드 #커스텀카드');
    alert('해시태그가 복사되었습니다!');
  };

  return (
    <section className="py-32 px-6 bg-black min-h-screen relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#D4AF37_0%,_transparent_25%)] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E1306C]/50 bg-[#E1306C]/10 mb-6">
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span className="text-xs font-bold tracking-widest text-[#E1306C] uppercase">Official Launch Event</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                FOLLOW US, <br/>
                GET <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCE2C4] to-[#D4AF37] animate-shine">5,000 KRW</span> OFF.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                PICKIT 공식 인스타그램을 팔로우하고<br/>
                즉시 사용 가능한 5,000원 할인 쿠폰을 받으세요.
            </p>
        </div>

        {/* QR Code Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center mb-16 relative overflow-hidden animate-fade-in-up delay-100 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E1306C] blur-[80px] opacity-20 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-white p-4 rounded-2xl mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    {/* Placeholder for user's QR image. Ensure the file is named correctly in public folder or replace src */}
                    <img 
                        src="/instagram_qr.png" 
                        alt="PICKIT Instagram QR Code" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.instagram.com/pickit.korea.official/";
                        }}
                    />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">@pickit.korea.official</h3>
                <p className="text-zinc-500 text-sm mb-6">스마트폰 카메라로 QR코드를 스캔하세요.</p>
                
                <button 
                    onClick={() => window.open('https://www.instagram.com/pickit.korea.official/', '_blank')}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                    <Instagram className="w-5 h-5" />
                    인스타그램 바로가기
                </button>
            </div>
        </div>

        {/* How to Participate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-200">
            {/* Step 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative group hover:border-zinc-600 transition-colors">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center border-4 border-black z-20">1</div>
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Follow Account</h4>
                <p className="text-zinc-400 text-sm">
                    공식 계정(@pickit.korea.official)을 팔로우해주세요.
                </p>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative group hover:border-zinc-600 transition-colors">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center border-4 border-black z-20">2</div>
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Send DM</h4>
                <p className="text-zinc-400 text-sm">
                    DM으로 <span className="text-[#D4AF37] font-bold">"이벤트 참여"</span>라고 메시지를 보내주세요.
                </p>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-900 border border-[#D4AF37]/30 rounded-2xl p-6 relative group hover:bg-zinc-900/80 transition-colors">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#D4AF37] text-black font-bold rounded-full flex items-center justify-center border-4 border-black z-20">3</div>
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Gift className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Get Coupon</h4>
                <p className="text-zinc-400 text-sm">
                    담당자가 확인 후 즉시 사용 가능한 <span className="text-[#D4AF37] font-bold">5,000원 할인 코드</span>를 보내드립니다.
                </p>
            </div>
        </div>

        {/* Bonus Event */}
        <div className="mt-16 pt-16 border-t border-zinc-900 text-center animate-fade-in-up delay-300">
             <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Bonus Event</span>
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Review Event</h3>
             <p className="text-zinc-400 mb-8 text-sm md:text-base">
                 제품 수령 후 인스타그램 스토리에 <br className="md:hidden"/>
                 <span className="text-white font-bold">#PICKIT #메탈카드</span> 태그와 함께 후기를 남겨주시면<br/>
                 추첨을 통해 <span className="text-[#D4AF37] font-bold">스타벅스 기프티콘</span>을 드립니다.
             </p>
             <button 
                onClick={handleCopyHashTag}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors"
             >
                 <Copy className="w-4 h-4" />
                 해시태그 복사하기
             </button>
        </div>

      </div>
    </section>
  );
};

export default EventView;