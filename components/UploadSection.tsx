import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, FileImage } from 'lucide-react';

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
    }, 2500); // Simulate 2.5s processing time
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setIsComplete(false);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
  };

  return (
    <section id="upload" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800 rounded-full mix-blend-overlay filter blur-[128px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[128px] opacity-5"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Design Your Masterpiece</h2>
          <p className="text-zinc-400">
            카드에 각인하고 싶은 로고, 서명, 또는 아트워크를 업로드하세요. <br/>
            벡터 파일(SVG, AI) 또는 고해상도 이미지(PNG)를 권장합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Upload Zone */}
            <div className="w-full">
                {!file ? (
                    <div 
                        className={`relative h-80 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer
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
                    <div className="relative h-80 rounded-3xl border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center p-8 overflow-hidden">
                         {preview && (
                             <img src={preview} alt="Preview" className="h-32 object-contain mb-6 opacity-80" />
                         )}
                         <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800 mb-6">
                            <FileImage className="w-4 h-4 text-zinc-400" />
                            <span className="text-sm text-zinc-300 max-w-[150px] truncate">{file.name}</span>
                         </div>
                         
                         {!isComplete && !isProcessing && (
                             <div className="flex gap-3">
                                <button 
                                    onClick={removeFile}
                                    className="px-6 py-2 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={simulateProcessing}
                                    className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors text-sm"
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

            {/* Live Card Preview */}
            <div className="relative h-80 w-full perspective-1000 group">
                {/* Visual Representation of the card */}
                <div className={`relative w-full h-full max-w-[400px] mx-auto rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700 shadow-2xl transition-all duration-700 transform flex flex-col justify-between p-8 ${isProcessing ? 'animate-pulse' : ''}`}>
                    
                    {/* Card Chip & Logo */}
                    <div className="flex justify-between items-start">
                         <div className="w-12 h-9 bg-yellow-600/20 rounded border border-yellow-600/40 flex items-center justify-center relative overflow-hidden">
                            {/* Chip lines */}
                            <div className="absolute w-full h-[1px] bg-yellow-600/30 top-1/2"></div>
                            <div className="absolute h-full w-[1px] bg-yellow-600/30 left-1/2"></div>
                            <div className="w-6 h-4 border border-yellow-600/50 rounded-sm"></div>
                         </div>
                         <div className="text-zinc-500 font-bold tracking-widest text-sm">PICKIT</div>
                    </div>

                    {/* User Design Area */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                        {preview ? (
                            <img 
                                src={preview} 
                                alt="Engraving Preview" 
                                className={`max-w-full max-h-full object-contain filter grayscale invert opacity-70 mix-blend-overlay transition-all duration-1000 ${isProcessing ? 'blur-sm scale-95' : 'blur-0 scale-100'}`} 
                            />
                        ) : (
                            <div className="text-zinc-800 text-xs text-center border border-zinc-800 border-dashed px-4 py-8 rounded w-full">
                                YOUR DESIGN HERE
                            </div>
                        )}
                    </div>

                    {/* Card Number & Name */}
                    <div>
                        <div className="flex gap-4 mb-2">
                            <div className="text-zinc-400 font-mono tracking-widest text-lg">****</div>
                            <div className="text-zinc-400 font-mono tracking-widest text-lg">****</div>
                            <div className="text-zinc-400 font-mono tracking-widest text-lg">****</div>
                            <div className="text-zinc-200 font-mono tracking-widest text-lg">8842</div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="font-mono text-zinc-300 uppercase tracking-widest text-sm">Minsu Kim</div>
                            <div className="text-xs text-zinc-500">VALID THRU 12/28</div>
                        </div>
                    </div>

                    {/* Metallic Sheen Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                </div>

                {isComplete && (
                     <div className="absolute -bottom-16 left-0 w-full text-center">
                        <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-white/20 hover:scale-105 transition-all">
                            Order This Design
                        </button>
                     </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;