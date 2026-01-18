import React, { useState, useEffect } from 'react';
import { Menu, X, CreditCard, ChevronDown } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import BusinessCardShowcase from './components/BusinessCardShowcase';
import UploadSection from './components/UploadSection';
import OtherServices from './components/OtherServices';
import CompanyIntro from './components/CompanyIntro';
import ContactView from './components/ContactView';
import Footer from './components/Footer';

type Page = 'home' | 'about' | 'metal-biz' | 'metal-custom' | 'luxury' | 'materials' | 'solutions' | 'contact';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('home')}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <CreditCard className="text-black w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">PICKIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('about')} 
            className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            ABOUT US
          </button>

          {/* Metal Card Dropdown */}
          <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${['metal-biz', 'metal-custom'].includes(currentPage) ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
              METAL CARD
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden transition-all duration-200 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
               <button 
                  onClick={() => handleNavClick('metal-biz')}
                  className="block w-full text-left px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-b border-zinc-800/50"
               >
                  Business Card (명함)
               </button>
               <button 
                  onClick={() => handleNavClick('metal-custom')}
                  className="block w-full text-left px-5 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
               >
                  Custom Card (카드)
               </button>
            </div>
          </div>

          <button onClick={() => handleNavClick('luxury')} className={`text-sm font-medium transition-colors ${currentPage === 'luxury' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            LUXURY
          </button>
          <button onClick={() => handleNavClick('materials')} className={`text-sm font-medium transition-colors ${currentPage === 'materials' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            MATERIALS
          </button>
          <button onClick={() => handleNavClick('solutions')} className={`text-sm font-medium transition-colors ${currentPage === 'solutions' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            SOLUTIONS
          </button>
          
          <button onClick={() => handleNavClick('contact')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${currentPage === 'contact' ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
            CONTACT US
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-fade-in-up">
          <button onClick={() => handleNavClick('about')} className="text-lg font-medium text-zinc-300 hover:text-white text-left">ABOUT US</button>
          
          <div className="space-y-3 pl-4 border-l border-zinc-800">
             <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Metal Card</span>
             <button onClick={() => handleNavClick('metal-biz')} className="block text-lg font-medium text-zinc-300 hover:text-white">Business Card</button>
             <button onClick={() => handleNavClick('metal-custom')} className="block text-lg font-medium text-zinc-300 hover:text-white">Custom Card</button>
          </div>

          <button onClick={() => handleNavClick('luxury')} className="text-lg font-medium text-zinc-300 hover:text-white text-left">LUXURY</button>
          <button onClick={() => handleNavClick('materials')} className="text-lg font-medium text-zinc-300 hover:text-white text-left">MATERIALS</button>
          <button onClick={() => handleNavClick('solutions')} className="text-lg font-medium text-zinc-300 hover:text-white text-left">SOLUTIONS</button>
          <button onClick={() => handleNavClick('contact')} className="text-lg font-bold text-white bg-zinc-800 py-3 rounded-lg text-center">CONTACT US</button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Fade in animation wrapper for page transitions
  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-fade-in-up min-h-screen pt-20">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black overflow-x-hidden font-sans">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <div className="animate-fade-in-up">
            <Hero />
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
        
        {currentPage === 'luxury' && (
          <PageWrapper>
            <OtherServices category="luxury" />
          </PageWrapper>
        )}
        
        {currentPage === 'materials' && (
          <PageWrapper>
            <OtherServices category="materials" />
          </PageWrapper>
        )}
        
        {currentPage === 'solutions' && (
          <PageWrapper>
            <OtherServices category="solutions" />
          </PageWrapper>
        )}

        {currentPage === 'contact' && (
          <PageWrapper>
            <ContactView />
          </PageWrapper>
        )}
      </main>

      <Footer />
    </div>
  );
}