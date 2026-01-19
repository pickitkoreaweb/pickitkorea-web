import React from 'react';
import { Twitter, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setPage: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Subtle Background Art */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5">
            <h3 className="text-3xl font-serif font-bold tracking-tighter mb-6 text-white">PICKIT</h3>
            <p className="text-zinc-500 max-w-sm mb-8 text-sm leading-relaxed">
              Redefining the standard of luxury transactions. <br/>
              Engineered for those who value weight and substance. <br/>
              Seoul, Korea.
            </p>
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
              <li><button onClick={() => setPage('metal-biz')} className="hover:text-white transition-colors flex items-center gap-1 group interactable">Business Edition <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
              <li><button onClick={() => setPage('metal-custom')} className="hover:text-white transition-colors flex items-center gap-1 group interactable">Custom Personal <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
              <li><button onClick={() => setPage('materials')} className="hover:text-white transition-colors flex items-center gap-1 group interactable">Materials Guide <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => setPage('faq')} className="hover:text-white transition-colors interactable">FAQ</button></li>
              <li><button onClick={() => setPage('policy')} className="hover:text-white transition-colors interactable">Shipping & Returns</button></li>
              <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors interactable">Contact Us</button></li>
            </ul>
          </div>
           
           {/* Links Column 3 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><button onClick={() => setPage('policy')} className="hover:text-white transition-colors interactable">Privacy Policy</button></li>
              <li><button onClick={() => setPage('policy')} className="hover:text-white transition-colors interactable">Terms of Service</button></li>
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