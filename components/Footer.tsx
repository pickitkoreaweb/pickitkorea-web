import React from 'react';
import { Twitter, Instagram, Facebook, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  setPage: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const handleNavigation = (page: string) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Subtle Background Art */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5">
            <h3 className="text-3xl font-serif font-bold tracking-tighter mb-6 text-white">PICKIT</h3>
            <p className="text-zinc-500 max-w-sm mb-6 text-sm leading-relaxed">
              Redefining the standard of luxury transactions. <br/>
              Engineered for those who value weight and substance.
            </p>
            
            <div className="space-y-3 mb-8 text-zinc-500 text-xs font-medium">
                 <a 
                    href="https://map.naver.com/p/search/서울특별시 강남구 역삼로20길 10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 hover:text-white transition-colors group cursor-pointer"
                 >
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
                    <p className="leading-relaxed border-b border-transparent group-hover:border-zinc-700">
                        서울특별시 강남구 역삼로20길 10<br/>테헤란로 쓰리엠타워 11층 PICKITKOREA
                    </p>
                 </a>
                 <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                    <p>010-8282-1043</p>
                 </div>
                 <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                    <p>PICKIT.KOREA.OFFICIAL@GMAIL.COM</p>
                 </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/pickit.korea.official/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#E1306C] hover:text-white transition-all duration-300 interactable group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 interactable group"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#4267B2] hover:text-white transition-all duration-300 interactable group"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Collections</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => handleNavigation('metal-custom')} className="hover:text-white transition-colors flex items-center gap-1 group interactable">Metal Card Custom <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
              <li><button onClick={() => handleNavigation('gallery')} className="hover:text-white transition-colors flex items-center gap-1 group interactable">Masterpiece Gallery <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => handleNavigation('faq')} className="hover:text-white transition-colors interactable">FAQ</button></li>
              <li><button onClick={() => handleNavigation('materials')} className="hover:text-white transition-colors interactable">Materials Guide</button></li>
              <li><button onClick={() => handleNavigation('contact')} className="hover:text-white transition-colors interactable">Concierge</button></li>
            </ul>
          </div>
           
           {/* Links Column 3 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => handleNavigation('policy')} className="hover:text-white transition-colors interactable">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation('policy')} className="hover:text-white transition-colors interactable">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600">
          <p>&copy; 2026 PICKIT Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>Designed for Elite</span>
             <span>Seoul • New York • Tokyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;