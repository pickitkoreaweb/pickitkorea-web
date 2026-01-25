import React, { useState, useRef } from 'react';
import { Upload, Check, Loader2, FileImage, Shield, CreditCard, Truck, Gift, UserSquare2 } from 'lucide-react';

interface UploadSectionProps {
  setPage?: (page: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ setPage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [productType, setProductType] = useState<'card' | 'business'>('card');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith('image/')) {
        alert("Please upload an image file (PNG, JPG, SVG).");
        return;
    }

    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(uploadedFile);
    
    // Reset state for new upload
    setIsComplete(false);
  };

  const simulateProcessing = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2500);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setIsComplete(false);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
  };

  // Helper component for the "Centurion" style profile
  const CenturionProfile = ({ color = "currentColor" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill={color}>
      <path d="M50 20 C60 20 68 28 68 38 C68 45 64 51 58 54 L58 56 C68 60 75 70 75 80 L25 80 C25 70 32 60 42 56 L42 54 C36 51 32 45 32 38 C32 28 40 20 50 20 Z" opacity="0.8" />
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  );

  // Helper for the intricate border
  const IntricateBorder = ({ color = "border-zinc-500" }) => (
    <div className={`absolute inset-2 border-2 ${color} rounded-lg opacity-50 pointer-events-none`}>
        <div className={`absolute inset-1 border ${color} border-dashed rounded opacity-30`}></div>
        {/* Corner decorations */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${color}`}></div>
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${color}`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${color}`}></div>
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${color}`}></div>
    </div>
  );

  return (
    <section id="process" className="py-16 md:py-24 px-4 md:px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800 rounded-full mix-blend-overlay filter blur-[128px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[128px] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Design Your Masterpiece</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            카드 또는 명함에 각인하고 싶은 로고를 업로드하세요. <br/>
            세상에 단 하나뿐인 당신만의 작품이 완성됩니다.
          </p>
        </div>

        {/* PRODUCT TYPE SELECTOR */}
        <div className="flex justify-center mb-12">
            <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-full flex gap-2 shadow-2xl relative z-20">
                <button 
                    onClick={() => setProductType('card')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${productType === 'card' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                    <CreditCard className="w-4 h-4" /> Metal Credit Card
                </button>
                <button 
                    onClick={() => setProductType('business')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 ${productType === 'business' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                    <UserSquare2 className="w-4 h-4" /> Metal Business Card
                </button>
            </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-12 md:gap-16 items-center">
            
            {/* Upload Zone */}
            <div className="w-full xl:w-1/3 order-2 xl:order-1">
                {!file ? (
                    <div 
                        className={`relative h-[350px] md:h-[450px] rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer
                        ${dragActive ? 'border-white bg-white/10 scale-[1.02]' : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-900'}`}
                        onDragEnter={handleDrag} 
                        onDragLeave={handleDrag} 
                        onDragOver={handleDrag} 
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <input 
                            ref={inputRef}
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 shadow-xl">
                            <Upload className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Click to upload or drag & drop</h3>
                        <p className="text-sm text-zinc-500">SVG, PNG, JPG (Max 10MB)</p>
                        <p className="text-xs text-[#D4AF37] mt-4 font-bold tracking-wider">
                            {productType === 'card' ? "For Credit Card Custom" : "For Business Card Logo"}
                        </p>
                    </div>
                ) : (
                    <div className="relative h-[350px] md:h-[450px] rounded-3xl border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center p-8 overflow-hidden">
                         {preview && (
                             <img src={preview} alt="Preview" className="h-32 md:h-40 object-contain mb-6 opacity-80" />
                         )}
                         <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800 mb-6 w-full max-w-[250px]">
                            <FileImage className="w-4 h-4 text-zinc-400 shrink-0" />
                            <span className="text-sm text-zinc-300 truncate">{file.name}</span>
                         </div>
                         
                         {!isComplete && !isProcessing && (
                             <div className="flex flex-col md:flex-row gap-3 w-full max-w-[250px] md:max-w-none justify-center">
                                <button 
                                    onClick={removeFile}
                                    className="px-6 py-2 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm w-full md:w-auto"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={simulateProcessing}
                                    className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors text-sm w-full md:w-auto"
                                >
                                    Generate Preview
                                </button>
                             </div>
                         )}

                         {isProcessing && (
                             <div className="flex flex-col items-center">
                                 <Loader2 className="w-8 h-8 animate-spin text-white mb-2" />
                                 <p className="text-sm text-zinc-400">Analyzing geometry...</p>
                             </div>
                         )}

                        {isComplete && (
                            <div className="flex flex-col items-center animate-fade-in-up w-full">
                                <div className="w-full bg-black/50 p-6 rounded-2xl border border-zinc-800 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-zinc-400 text-sm">
                                            {productType === 'card' ? "PICKIT Premium Metal" : "Metal Business Card (1ea)"}
                                        </span>
                                        <span className="text-white font-bold text-lg">
                                            {productType === 'card' ? "44,900 KRW" : "35,000 KRW"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 text-xs text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-3 h-3" />
                                            <span>Free Shipping (전 상품 무료 배송)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Gift className="w-3 h-3" />
                                            <span>Premium Gift Packaging Included</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => setPage && setPage('contact')}
                                    className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-[#FCE2C4] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    ORDER NOW
                                </button>
                                
                                <button onClick={removeFile} className="mt-4 text-xs text-zinc-600 hover:text-white underline">
                                    Upload Different File
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Live Preview Area */}
            <div className="w-full xl:w-2/3 h-[400px] md:h-[500px] relative flex justify-center items-center order-1 xl:order-2 perspective-1000 overflow-visible">
                {/* Scale wrapper for Mobile */}
                <div className={`relative flex items-center justify-center transition-all duration-700 origin-center ${productType === 'card' ? 'w-[340px] md:w-[380px] h-[215px] md:h-[240px] scale-[0.7] md:scale-100' : 'w-[215px] md:w-[240px] h-[340px] md:h-[380px] scale-[0.8] md:scale-100'}`}>
                    
                    {/* Background Cards (Fan Effect) - Only visible in Credit Card Mode */}
                    {productType === 'card' && (
                        <>
                            <div className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl transition-all duration-700 transform md:-translate-x-48 md:group-hover:-translate-x-52 translate-y-16 md:translate-y-0 z-10 bg-[#e3e3e3] border border-zinc-300 scale-[0.9] md:scale-100 opacity-60 md:opacity-100">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)]"></div>
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/axiom-pattern.png')]"></div>
                                <IntricateBorder color="border-zinc-400" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl transition-all duration-700 transform md:translate-x-48 md:group-hover:translate-x-52 translate-y-32 md:translate-y-0 z-10 bg-[#E6C673] border border-[#d4af37] scale-[0.85] md:scale-100 opacity-40 md:opacity-100">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]"></div>
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/axiom-pattern.png')]"></div>
                                <IntricateBorder color="border-yellow-700" />
                            </div>
                        </>
                    )}

                    {/* Main Card (Center) */}
                    <div className={`absolute top-0 left-0 w-full h-full rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] transition-all duration-700 transform z-20 bg-[#1a1a1a] border border-zinc-700 overflow-hidden ${isProcessing ? 'animate-pulse' : ''}`}>
                        {/* Custom Design Layer - Full Bleed */}
                        {preview && (
                           <div className="absolute inset-0 z-10">
                               <img 
                                   src={preview} 
                                   alt="Custom Design" 
                                   className={`w-full h-full object-cover transition-all duration-1000 ${isProcessing ? 'blur-sm scale-110' : 'blur-0 scale-100'}`} 
                               />
                               {/* Overlay to ensure text readability */}
                               <div className="absolute inset-0 bg-black/30"></div>
                           </div>
                        )}

                        {/* Default Dark Texture */}
                        {!preview && (
                           <>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] z-0"></div>
                           </>
                        )}

                        <div className="relative z-20 w-full h-full">
                             <IntricateBorder color={preview ? "border-white/50" : "border-zinc-600"} />
                        </div>
                        
                        {/* Content Logic Switched by Product Type */}
                        {productType === 'card' ? (
                            /* --- CREDIT CARD LAYOUT --- */
                            <div className="absolute inset-0 z-30 p-6 flex flex-col justify-between text-zinc-300">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold tracking-tighter text-lg uppercase text-white drop-shadow-md">PICKIT</h3>
                                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 border border-zinc-600 px-1 rounded bg-black/20 backdrop-blur-sm">BLACK</span>
                                </div>

                                {!preview && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                                        <div className="absolute w-28 h-32 rounded-[40%] border border-zinc-800 bg-zinc-900/50 flex items-center justify-center opacity-80">
                                            <CenturionProfile color="#52525b" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-1/2 left-8 -translate-y-1/2 w-11 h-8 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-md border border-zinc-400 flex items-center justify-center shadow-md">
                                    <div className="w-6 h-4 border border-zinc-600 rounded-sm opacity-50"></div>
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                                </div>

                                <div className="flex justify-between items-end mt-auto">
                                    <div className="text-lg font-mono font-medium tracking-widest text-zinc-200 uppercase drop-shadow-md">KIM JENY</div>
                                    <div className="text-[9px] font-bold tracking-widest text-zinc-500">MEMBER SINCE 26</div>
                                </div>
                            </div>
                        ) : (
                            /* --- BUSINESS CARD LAYOUT (VERTICAL) --- */
                            <div className="absolute inset-0 z-30 p-8 flex flex-col items-center justify-between text-white text-center">
                                {/* Gold Accent Line */}
                                <div className="w-1 h-8 bg-[#D4AF37] absolute top-0 left-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                                
                                <div className="pt-8">
                                    {!preview && (
                                        <div className="w-12 h-12 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                            <div className="w-6 h-6 bg-[#D4AF37] rotate-45"></div>
                                        </div>
                                    )}
                                    <h3 className="font-bold tracking-[0.4em] text-lg uppercase text-[#D4AF37] drop-shadow-md">PICKIT</h3>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <h3 className="text-2xl font-serif font-bold tracking-wide">KIM JUNG WOO</h3>
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">CEO / Founder</p>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-3"></div>
                                    <p className="text-[10px] opacity-80 tracking-wider">010 8282 1043</p>
                                    <p className="text-[9px] opacity-60 tracking-wider">pickit.korea.official@gmail.com</p>
                                </div>

                                <div className="text-[8px] text-zinc-500 tracking-[0.3em]">
                                    PREMIUM BUSINESS METAL
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Added Service Info & Legal Notice - Updated for Business Card */}
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-12 md:pt-16 border-t border-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-white rounded-full"></span>
                        Service Process
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <span className="text-zinc-600 font-mono text-sm mt-0.5">01</span>
                            <p className="text-zinc-400 text-sm">고객이 원하는 디자인으로 주문 즉시 제작에 들어갑니다.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-zinc-600 font-mono text-sm mt-0.5">02</span>
                            <p className="text-zinc-400 text-sm">제작기간은 2~3일 소요되며 이후 순차적으로 발송됩니다.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-zinc-600 font-mono text-sm mt-0.5">03</span>
                            <p className="text-zinc-400 text-sm">제품 발송 전 검수된 제품의 실사 이미지를 전달드립니다.</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-zinc-600 font-mono text-sm mt-0.5">04</span>
                            <p className="text-zinc-400 text-sm">구매 후 6개월간 무상 A/S를 지원합니다. <br/><span className="text-zinc-600 text-xs">(단, 당사 귀책사유 외 파손/변질은 불가)</span></p>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden mt-8 md:mt-0">
                    <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                            <Shield className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Legal Notice</h3>
                    </div>
                    
                    <p className="text-zinc-300 text-sm leading-relaxed relative z-10 break-keep">
                        ※ {productType === 'card' ? "METAL CARD는 카드외관 커스텀 변경 행위로 여신금융업법에 위배되지 않습니다." : "METAL BUSINESS CARD는 순수 금속 소재로 제작되며 금융 IC 칩이 포함되지 않습니다."}
                    </p>
                    
                    <p className="text-zinc-500 text-xs mt-6 relative z-10 leading-relaxed">
                         {productType === 'card' ? (
                             <>
                                결제 IC 칩은 기존 카드에서 분리하여 <strong>구매자가 직접 이식</strong>해야 하는 DIY 방식입니다.
                                <br />
                                당사 귀책사유 외 고객 과실로 인한 제품 파손 및 변질은 A/S 및 환불이 불가합니다.
                             </>
                         ) : (
                             <>
                                스마트 QR 기능을 원하실 경우 주문 시 별도 옵션을 선택해주셔야 합니다.
                                <br />
                                맞춤 제작 상품 특성상 시안 확정 후에는 디자인 변경 및 환불이 어렵습니다.
                             </>
                         )}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;