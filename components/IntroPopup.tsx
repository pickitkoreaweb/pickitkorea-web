import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface IntroPopupProps {
  videoUrl?: string;
}

const IntroPopup: React.FC<IntroPopupProps> = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Default video if none provided
  const currentVideo = videoUrl || 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4';

  useEffect(() => {
    // Check session storage to show only once per session
    const hasSeenIntro = sessionStorage.getItem('pickit_intro_seen');
    if (!hasSeenIntro) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('pickit_intro_seen', 'true');
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in-up p-4 md:p-0">
      <div className="relative w-full max-w-4xl aspect-video bg-black border border-zinc-800 shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-xl overflow-hidden group">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors border border-zinc-700 backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Element */}
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          src={currentVideo}
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-8 md:p-12">
           <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-xl">
                   PICKIT KOREA
               </h2>
               <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-6">
                   The Weight of Authority
               </p>
               
               <div className="pointer-events-auto flex items-center gap-4">
                   <button 
                     onClick={handleClose}
                     className="px-8 py-3 bg-[#D4AF37] text-black text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
                   >
                       Enter Site
                   </button>
                   <button 
                     onClick={toggleMute}
                     className="p-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
                   >
                       {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                   </button>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default IntroPopup;