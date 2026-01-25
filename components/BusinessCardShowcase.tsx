import React, { useState } from 'react';
import { UserCheck, Smartphone, Hash, MousePointerClick, Layers, QrCode } from 'lucide-react';

const BusinessCardShowcase: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="py-24 md:py-32 px-6 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden perspective-1000">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-zinc-900/30 to-transparent pointer-events-none"></div>

      {/* Floating 3D Cubes (Background Decoration) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-20 h-20 border border-[#D4AF37]/10 bg-[#D4AF37]/5 backdrop-blur-sm transform rotate-45 animate-float-delayed"></div>
          <div className="absolute bottom-40 right-[20%] w-32 h-32 border border-zinc-800 bg-transparent transform -rotate-12 animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
                <Hash className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-semibold tracking-wide uppercase text-yellow-500">Signature Series</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.1] text-white">
                The Signature.<br />
                <span className="text-[#D4AF37]">Black & Gold.</span>
             </h2>
             
             <p className="text-lg text-zinc-400 mb-8 leading-relaxed break-keep">
                CEO를 위한 단 하나의 명함. <br/>
                가장 깊은 <strong>Matte Black</strong> 위에 새겨지는 <strong>Real Gold</strong>의 품격.<br/><br/>
                건네는 순간, 당신의 비즈니스는 <br/>
                이미 상대방의 뇌리에 강렬하게 각인됩니다.
             </p>

             <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-700 group-hover:border-[#D4AF37] transition-colors">
                        <UserCheck className="w-5 h-5 text-white group-hover:text-[#D4AF37]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors">Executive Identity</h4>
                        <p className="text-sm text-zinc-400 mt-1">리더의 무게감을 대변하는 STS304 고밀도 소재.</p>
                    </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-700 group-hover:border-[#D4AF37] transition-colors">
                        <QrCode className="w-5 h-5 text-white group-hover:text-[#D4AF37]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors">Smart QR Link</h4>
                        <p className="text-sm text-zinc-400 mt-1">카메라 스캔 한 번으로 연락처와 회사 소개서를 전송.</p>
                    </div>
                </li>
             </ul>

             <a href="#process" className="inline-flex items-center justify-center px-10 py-4 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#FCE2C4] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1">
                Order Signature Card
             </a>
          </div>

          {/* Visual Content - Interactive Vertical Flip Card */}
          <div className="flex-1 w-full order-1 lg:order-2 flex flex-col justify-center items-center py-10 relative">
             
             {/* Interaction Hint */}
             <div className="absolute top-0 right-10 lg:right-20 flex items-center gap-2 text-[#D4AF37] animate-pulse z-20 pointer-events-none">
                 <MousePointerClick className="w-4 h-4" />
                 <span className="text-xs font-bold tracking-widest uppercase">Click to Flip</span>
             </div>

             <div 
                className="relative perspective-1000 group cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
             >
                {/* 3D Depth Layers (Static shadow/depth) */}
                <div className="absolute top-4 left-4 w-full h-full bg-[#0a0a0a] rounded-xl border border-zinc-800 shadow-2xl opacity-60 pointer-events-none transform translate-z-[-20px]"></div>

                {/* Main Card Container */}
                <div 
                    className="relative preserve-3d transition-transform duration-700 w-[280px] h-[450px] md:w-[320px] md:h-[520px] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* FRONT FACE (Vertical Business Card) */}
                    <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-[#D4AF37] bg-[#050505] flex flex-col items-center justify-between p-8 md:p-10 shadow-xl">
                        
                        {/* Texture: Matte Black Hairline */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] opacity-60 pointer-events-none"></div>
                        
                        {/* Gold Edge Glow */}
                        <div className="absolute inset-0 border-[3px] border-[#D4AF37]/50 rounded-xl pointer-events-none"></div>

                        {/* Top: Logo */}
                        <div className="relative z-10 pt-4">
                            <div className="w-10 h-10 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                <div className="w-5 h-5 bg-[#D4AF37] rotate-45"></div>
                            </div>
                            <span className="text-[10px] tracking-[0.4em] font-bold text-white/80 block text-center mt-4">PICKIT</span>
                        </div>

                        {/* Center: Info */}
                        <div className="relative z-10 flex flex-col gap-2 w-full text-center">
                            <div className="w-1 h-8 bg-[#D4AF37] mx-auto mb-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide leading-none">
                                KIM<br/>JEONG WOO
                            </h3>
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mt-3">CEO / Founder</p>
                            
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
                            
                            <div className="space-y-1.5 text-zinc-300">
                                <p className="text-[11px] md:text-xs tracking-widest font-light">010 8282 1043</p>
                                <p className="text-[10px] md:text-[11px] tracking-widest font-light opacity-70">pickit.korea.official@gmail.com</p>
                            </div>
                        </div>

                        {/* Bottom: Footer */}
                        <div className="relative z-10 w-full flex justify-between items-end border-t border-white/10 pt-4">
                            <span className="text-[8px] text-zinc-500 tracking-[0.2em] uppercase">STS304 Original</span>
                            <Layers className="w-4 h-4 text-zinc-600" />
                        </div>

                        {/* Sheen Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out z-20"></div>
                    </div>

                    {/* BACK FACE */}
                    <div 
                        className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-[#D4AF37] bg-[#080808] flex flex-col items-center justify-center p-8 shadow-xl"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        {/* Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                        
                        <div className="relative z-10 text-center">
                            <div className="w-32 h-32 border border-[#D4AF37]/30 bg-white/5 p-2 rounded-lg mb-8 flex items-center justify-center relative group/qr">
                                 {/* Scan Me Label */}
                                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#080808] px-2 text-[9px] text-[#D4AF37] tracking-widest font-bold">SCAN ME</div>
                                 <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://pickit-korea.com" 
                                    alt="QR" 
                                    className="w-full h-full opacity-90 group-hover/qr:opacity-100 transition-opacity filter invert" 
                                 />
                                 <div className="absolute inset-0 border border-[#D4AF37] opacity-0 group-hover/qr:opacity-50 transition-opacity rounded-lg animate-pulse"></div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white tracking-[0.3em] mb-2">PICKIT</h3>
                            <p className="text-[9px] text-zinc-500 tracking-widest uppercase mb-8">Premium Metal Interface</p>
                            
                            <div className="text-[8px] text-zinc-700 tracking-[0.3em]">
                                COPYRIGHT 2026
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-24 pt-12 border-t border-zinc-900/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">01. Signature Design</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">CEO의 품격에 맞는 블랙 & 골드 시그니처 디자인을 적용합니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">02. STS304 Black</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">특수 PVD 코팅된 블랙 스테인리스 스틸로 벗겨짐이 없습니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">03. Gold Laser</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">레이저 각인 시 스테인리스 본연의 골드톤이 드러나 고급스럽습니다.</p>
                </div>
                <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">04. QR Code</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        뒷면 QR코드 각인을 통해 스마트 명함 기능을 추가할 수 있습니다.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCardShowcase;