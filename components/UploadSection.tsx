import React, { useState, useRef } from 'react';
import { Upload, Check, Loader2, FileImage, Shield } from 'lucide-react';

const UploadSection: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Design Your Masterpiece</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            카드에 각인하고 싶은 로고, 서명, 또는 아트워크를 업로드하세요. <br/>
            벡터 파일(SVG, AI) 또는 고해상도 이미지(PNG)를 권장합니다.
          </p>
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
                            <div className="flex flex-col items-center animate-fade-in-up">
                                <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                                    <Check className="w-6 h-6" />
                                </div>
                                <p className="text-sm text-white mb-4">Design Approved</p>
                                <button onClick={removeFile} className="text-xs text-zinc-500 hover:text-white underline">
                                    Upload Different File
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Live Card Preview - Expanded Fan Layout */}
            <div className="w-full xl:w-2/3 h-[400px] md:h-[500px] relative flex justify-center items-center order-1 xl:order-2 perspective-1000 overflow-visible">
                {/* Scale wrapper for Mobile to prevent clipping - Updated Scale to 0.7 */}
                <div className="relative w-[340px] md:w-[380px] h-[215px] md:h-[240px] flex items-center justify-center scale-[0.7] md:scale-100 transition-transform origin-center">
                    
                    {/* Platinum/Silver Card (Left/Bottom) */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl transition-all duration-700 transform md:-translate-x-48 md:group-hover:-translate-x-52 translate-y-16 md:translate-y-0 z-10 bg-[#e3e3e3] border border-zinc-300 scale-[0.9] md:scale-100 opacity-60 md:opacity-100">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)]"></div>
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/axiom-pattern.png')]"></div>
                         <IntricateBorder color="border-zinc-400" />
                    </div>

                    {/* Gold Card (Right/Bottom) */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl transition-all duration-700 transform md:translate-x-48 md:group-hover:translate-x-52 translate-y-32 md:translate-y-0 z-10 bg-[#E6C673] border border-[#d4af37] scale-[0.85] md:scale-100 opacity-40 md:opacity-100">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]"></div>
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/axiom-pattern.png')]"></div>
                         <IntricateBorder color="border-yellow-700" />
                    </div>

                    {/* Black Card (Center/Top) - Main Focus */}
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

                        {/* Default Dark Texture (Hidden if preview exists) */}
                        {!preview && (
                           <>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] z-0"></div>
                           </>
                        )}

                        <div className="relative z-20 w-full h-full">
                             <IntricateBorder color={preview ? "border-white/50" : "border-zinc-600"} />
                        </div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 z-30 p-6 flex flex-col justify-between text-zinc-300">
                            <div className="flex justify-between items-start">
                                 <h3 className="font-bold tracking-tighter text-lg uppercase text-white drop-shadow-md">PICKIT</h3>
                                 <span className="text-[10px] font-bold tracking-widest text-zinc-500 border border-zinc-600 px-1 rounded bg-black/20 backdrop-blur-sm">BLACK</span>
                            </div>

                            {/* Centurion Head Area (Only visible if no preview) */}
                            {!preview && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                                     {/* Background Oval */}
                                     <div className="absolute w-28 h-32 rounded-[40%] border border-zinc-800 bg-zinc-900/50 flex items-center justify-center opacity-80">
                                        <CenturionProfile color="#52525b" />
                                     </div>
                                </div>
                            )}

                            {/* Chip */}
                            <div className="absolute top-1/2 left-8 -translate-y-1/2 w-11 h-8 bg-gradient-to-br from-zinc-300 to-zinc-500 rounded-md border border-zinc-400 flex items-center justify-center shadow-md">
                                 <div className="w-6 h-4 border border-zinc-600 rounded-sm opacity-50"></div>
                                 <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
                            </div>

                            <div className="flex justify-between items-end mt-auto">
                                <div className="text-lg font-mono font-medium tracking-widest text-zinc-200 uppercase drop-shadow-md">KIM JENY</div>
                                <div className="text-[9px] font-bold tracking-widest text-zinc-500">MEMBER SINCE 26</div>
                            </div>
                        </div>
                    </div>
                </div>

                {isComplete && (
                     <div className="absolute bottom-10 md:-bottom-16 left-0 w-full text-center z-40 animate-fade-in-up">
                        <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-white/20 hover:scale-105 transition-all text-sm md:text-base">
                            Order This Design
                        </button>
                     </div>
                )}
            </div>
        </div>

        {/* Added Service Info & Legal Notice */}
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
                        ※ METAL CARD의 경우 카드외관 커스텀 변경 행위로써 <strong className="text-white border-b border-zinc-600 pb-0.5">여신금융업법 제70조 신용카드 위·변조에 해당하지 않으므로</strong> 안심하셔도 좋습니다.
                    </p>
                    
                    <p className="text-zinc-500 text-xs mt-6 relative z-10 leading-relaxed">
                         결제 IC 칩은 기존 카드에서 분리하여 <strong>구매자가 직접 이식</strong>해야 하는 DIY 방식입니다.
                         <br />
                         당사 귀책사유 외 고객 과실로 인한 제품 파손 및 변질은 A/S 및 환불이 불가합니다.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;