import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import BusinessCardShowcase from './components/BusinessCardShowcase';
import UploadSection from './components/UploadSection';
import MaterialsGallery from './components/MaterialsGallery';
import CompanyIntro from './components/CompanyIntro';
import ContactView from './components/ContactView';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PolicyView from './components/PolicyView';
import Reviews from './components/Reviews';

type Page = 'home' | 'about' | 'metal-biz' | 'metal-custom' | 'materials' | 'faq' | 'contact' | 'policy';

const Navbar: React.FC<{ currentPage: Page; setPage: (page: Page) => void }> = ({ currentPage, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group interactable" 
            onClick={() => handleNavClick('home')}
            data-cursor="hover"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-none transform rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90 shadow-lg">
            <div className="w-3 h-3 bg-black rounded-full transform -rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-[0.2em] text-white">PICKIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => handleNavClick('about')} 
            className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 ${currentPage === 'about' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            ABOUT
          </button>

          {/* Metal Card Dropdown */}
          <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className={`interactable flex items-center gap-2 text-xs font-bold tracking-widest transition-colors duration-300 ${['metal-biz', 'metal-custom'].includes(currentPage) ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
              COLLECTION
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0a0a0a] border border-zinc-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
               <button 
                  onClick={() => handleNavClick('metal-biz')}
                  className="block w-full text-left px-6 py-4 text-xs tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors border-b border-zinc-900 interactable"
               >
                  BUSINESS CARD
               </button>
               <button 
                  onClick={() => handleNavClick('metal-custom')}
                  className="block w-full text-left px-6 py-4 text-xs tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors interactable"
               >
                  CUSTOM CARD
               </button>
            </div>
          </div>

          <button onClick={() => handleNavClick('materials')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 ${currentPage === 'materials' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            MATERIALS
          </button>
          
          <button onClick={() => handleNavClick('faq')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 ${currentPage === 'faq' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            FAQ
          </button>
          
          <button id="contact-btn" onClick={() => handleNavClick('contact')} className={`interactable px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest hover:bg-zinc-300 transition-colors`}>
            CONTACT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-8 flex flex-col gap-8 md:hidden shadow-2xl animate-fade-in-up h-[calc(100vh-80px)] overflow-y-auto">
          <button onClick={() => handleNavClick('about')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">About Us</button>
          
          <div className="space-y-6 pl-4 border-l border-zinc-800">
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Collections</span>
             <button onClick={() => handleNavClick('metal-biz')} className="block text-xl font-medium text-zinc-300 hover:text-white text-left w-full">Business Card</button>
             <button onClick={() => handleNavClick('metal-custom')} className="block text-xl font-medium text-zinc-300 hover:text-white text-left w-full">Custom Card</button>
          </div>

          <button onClick={() => handleNavClick('materials')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">Materials</button>
          <button onClick={() => handleNavClick('faq')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">FAQ</button>
          <button onClick={() => handleNavClick('contact')} className="text-sm font-bold tracking-widest text-black bg-white py-4 text-center mt-auto mb-10 rounded-lg">CONTACT US</button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);

  // Fade in animation wrapper for page transitions
  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-fade-in-up min-h-screen pt-20">
      {children}
    </div>
  );

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      {!loading && (
        <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-white/20 selection:text-white overflow-x-hidden font-sans cursor-none">
          <CustomCursor />
          <Navbar currentPage={currentPage} setPage={setCurrentPage} />
          
          <main>
            {currentPage === 'home' && (
              <div className="animate-fade-in-up">
                <Hero setPage={(page: string) => setCurrentPage(page as Page)} />
                <Features />
                <MaterialsGallery />
                <BusinessCardShowcase />
                <Reviews />
                <UploadSection />
                <FAQ />
                <ContactView />
              </div>
            )}
            
            {currentPage === 'about' && (
              <PageWrapper>
                <CompanyIntro />
              </PageWrapper>
            )}
            
            {currentPage === 'metal-biz' && (
              <PageWrapper>
                <BusinessCardShowcase />
                <Reviews />
                <UploadSection />
              </PageWrapper>
            )}
            
            {currentPage === 'metal-custom' && (
              <PageWrapper>
                <div className="pt-10">
                    <Features />
                    <UploadSection />
                </div>
              </PageWrapper>
            )}
            
            {currentPage === 'materials' && (
              <PageWrapper>
                <MaterialsGallery />
                <div className="py-20 text-center">
                     <h3 className="text-2xl font-serif text-white mb-6">Ready to choose?</h3>
                     <button onClick={() => setCurrentPage('metal-custom')} className="px-10 py-4 bg-white text-black font-bold text-xs tracking-widest hover:bg-zinc-200 transition-colors interactable">
                        START CUSTOMIZING
                     </button>
                </div>
              </PageWrapper>
            )}

            {currentPage === 'faq' && (
              <PageWrapper>
                <FAQ />
              </PageWrapper>
            )}

            {currentPage === 'contact' && (
              <PageWrapper>
                <ContactView />
              </PageWrapper>
            )}

            {currentPage === 'policy' && (
                <PageWrapper>
                    <PolicyView />
                </PageWrapper>
            )}
          </main>

          {currentPage !== 'home' && <Footer setPage={setCurrentPage} />}
          {currentPage === 'home' && <Footer setPage={setCurrentPage} />}
        </div>
      )}
    </>
  );
}