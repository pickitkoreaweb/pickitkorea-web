import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, UserCircle, LogOut, Gift } from 'lucide-react';
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
import ScrollProgress from './components/ScrollProgress';
import RevealOnScroll from './components/RevealOnScroll';
import PrivateConcierge from './components/PrivateConcierge';
import PackagingShowcase from './components/PackagingShowcase';
import InquiryBoard from './components/InquiryBoard';
import AuthView from './components/AuthView';
import EventView from './components/EventView';

type Page = 'home' | 'about' | 'metal-biz' | 'metal-custom' | 'materials' | 'faq' | 'inquiry' | 'contact' | 'policy' | 'auth' | 'event';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
}

const Navbar: React.FC<{ currentPage: Page; setPage: (page: Page) => void; currentUser: User | null; onLogout: () => void }> = ({ currentPage, setPage, currentUser, onLogout }) => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled || currentPage !== 'home' ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group interactable" 
            onClick={() => handleNavClick('home')}
            data-cursor="hover"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 rounded-none transform rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-[225deg] shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <div className="w-3 h-3 bg-black rounded-full transform -rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-[0.2em] text-white">PICKIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => handleNavClick('about')} 
            className={`interactable text-xs font-bold tracking-widest transition-all duration-300 relative group ${currentPage === 'about' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            ABOUT
            <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4AF37] transform origin-left transition-transform duration-300 ${currentPage === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </button>

          {/* Metal Card Dropdown */}
          <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className={`interactable flex items-center gap-2 text-xs font-bold tracking-widest transition-colors duration-300 ${['metal-biz', 'metal-custom'].includes(currentPage) ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
              COLLECTION
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0a0a0a]/95 backdrop-blur-xl border border-zinc-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
               <button 
                  onClick={() => handleNavClick('metal-biz')}
                  className="block w-full text-left px-6 py-4 text-xs tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-[#D4AF37] transition-colors border-b border-zinc-900 interactable"
               >
                  BUSINESS CARD
               </button>
               <button 
                  onClick={() => handleNavClick('metal-custom')}
                  className="block w-full text-left px-6 py-4 text-xs tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-[#D4AF37] transition-colors interactable"
               >
                  CUSTOM CARD
               </button>
            </div>
          </div>

          <button onClick={() => handleNavClick('materials')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 relative group ${currentPage === 'materials' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            MATERIALS
            <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4AF37] transform origin-left transition-transform duration-300 ${currentPage === 'materials' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </button>
          
          <button onClick={() => handleNavClick('faq')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 relative group ${currentPage === 'faq' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            FAQ
            <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4AF37] transform origin-left transition-transform duration-300 ${currentPage === 'faq' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </button>

          <button onClick={() => handleNavClick('inquiry')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 relative group ${currentPage === 'inquiry' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
            INQUIRY
            <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4AF37] transform origin-left transition-transform duration-300 ${currentPage === 'inquiry' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </button>

          {/* EVENT BUTTON - Highlighted */}
          <button 
             onClick={() => handleNavClick('event')} 
             className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 flex items-center gap-1.5 ${currentPage === 'event' ? 'text-[#E1306C]' : 'text-white hover:text-[#E1306C]'}`}
          >
             EVENT
             <span className="bg-[#E1306C] text-white text-[8px] px-1 rounded font-bold animate-pulse">NEW</span>
          </button>

          {/* User Auth Section */}
          {currentUser ? (
              <div className="flex items-center gap-4 border-l border-zinc-800 pl-4">
                  <div className="flex flex-col text-right">
                      <span className={`text-[9px] font-bold tracking-widest uppercase ${currentUser.role === 'admin' ? 'text-red-500' : 'text-zinc-500'}`}>
                          {currentUser.role === 'admin' ? 'ADMINISTRATOR' : 'MEMBER'}
                      </span>
                      <span className="text-xs font-bold text-white">{currentUser.name}</span>
                  </div>
                  <button onClick={onLogout} className="text-zinc-500 hover:text-white interactable">
                      <LogOut className="w-4 h-4" />
                  </button>
              </div>
          ) : (
             <button onClick={() => handleNavClick('auth')} className={`interactable text-xs font-bold tracking-widest transition-colors duration-300 ${currentPage === 'auth' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
                LOGIN
             </button>
          )}
          
          <button id="contact-btn" onClick={() => handleNavClick('contact')} className={`interactable px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300 ml-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
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
          {currentUser && (
              <div className="flex items-center gap-3 pb-6 border-b border-zinc-800">
                  <UserCircle className="w-10 h-10 text-zinc-500" />
                  <div>
                      <p className="text-sm font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-zinc-500 uppercase">{currentUser.role === 'admin' ? 'Administrator' : 'Member'}</p>
                  </div>
                  <button onClick={onLogout} className="ml-auto text-xs text-red-500 font-bold">LOGOUT</button>
              </div>
          )}

          <button onClick={() => handleNavClick('about')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">About Us</button>
          
          <div className="space-y-6 pl-4 border-l border-zinc-800">
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Collections</span>
             <button onClick={() => handleNavClick('metal-biz')} className="block text-xl font-medium text-zinc-300 hover:text-white text-left w-full">Business Card</button>
             <button onClick={() => handleNavClick('metal-custom')} className="block text-xl font-medium text-zinc-300 hover:text-white text-left w-full">Custom Card</button>
          </div>

          <button onClick={() => handleNavClick('materials')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">Materials</button>
          <button onClick={() => handleNavClick('faq')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">FAQ</button>
          <button onClick={() => handleNavClick('inquiry')} className="text-2xl font-serif text-zinc-300 hover:text-white text-left">Inquiry</button>
          
          {/* Mobile Event Button */}
          <button onClick={() => handleNavClick('event')} className="text-2xl font-serif text-[#E1306C] hover:text-white text-left flex items-center gap-2">
              Event <span className="text-xs bg-[#E1306C] text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
          </button>
          
          {!currentUser && (
             <button onClick={() => handleNavClick('auth')} className="text-2xl font-serif text-[#D4AF37] hover:text-white text-left">Login / Sign Up</button>
          )}

          <button onClick={() => handleNavClick('contact')} className="text-sm font-bold tracking-widest text-black bg-white py-4 text-center mt-auto mb-10 rounded-lg">CONTACT US</button>
        </div>
      )}
    </nav>
  );
};

// Fade in animation wrapper for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="animate-fade-in-up min-h-screen pt-20">
    {children}
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('pickit_user');
    if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
      setCurrentUser(user);
  };

  const handleLogout = () => {
      localStorage.removeItem('pickit_user');
      setCurrentUser(null);
      setCurrentPage('home');
  };

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      {!loading && (
        <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans cursor-none">
          <CustomCursor />
          <ScrollProgress />
          <Navbar 
            currentPage={currentPage} 
            setPage={setCurrentPage} 
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <PrivateConcierge />
          
          <main>
            {/* HOME PAGE: Curated Landing */}
            {currentPage === 'home' && (
              <div className="animate-fade-in-up">
                <Hero setPage={(page: string) => setCurrentPage(page as Page)} />
                <RevealOnScroll>
                    <CompanyIntro />
                </RevealOnScroll>
                <RevealOnScroll>
                    <Features />
                </RevealOnScroll>
                <RevealOnScroll>
                    <PackagingShowcase />
                </RevealOnScroll>
                <RevealOnScroll>
                    <Reviews />
                </RevealOnScroll>
              </div>
            )}
            
            {/* SUB PAGES */}
            {currentPage === 'about' && (
              <PageWrapper>
                <CompanyIntro />
                <RevealOnScroll>
                    <Features />
                </RevealOnScroll>
              </PageWrapper>
            )}
            
            {currentPage === 'metal-biz' && (
              <PageWrapper>
                <BusinessCardShowcase />
                <RevealOnScroll>
                    <UploadSection />
                </RevealOnScroll>
              </PageWrapper>
            )}
            
            {currentPage === 'metal-custom' && (
              <PageWrapper>
                <div className="pt-10">
                    <Features />
                    <RevealOnScroll>
                        <UploadSection />
                    </RevealOnScroll>
                </div>
              </PageWrapper>
            )}
            
            {currentPage === 'materials' && (
              <PageWrapper>
                <MaterialsGallery />
                <div className="py-20 text-center">
                     <h3 className="text-2xl font-serif text-white mb-6">Ready to choose?</h3>
                     <button onClick={() => setCurrentPage('metal-custom')} className="px-10 py-4 bg-white text-black font-bold text-xs tracking-widest hover:bg-[#D4AF37] transition-all duration-300 interactable shadow-lg">
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

            {currentPage === 'inquiry' && (
              <PageWrapper>
                <InquiryBoard currentUser={currentUser} />
              </PageWrapper>
            )}

            {currentPage === 'auth' && (
              <PageWrapper>
                 <AuthView onLogin={handleLogin} setPage={setCurrentPage} />
              </PageWrapper>
            )}
            
            {currentPage === 'event' && (
              <PageWrapper>
                 <EventView />
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

          <Footer setPage={setCurrentPage} />
        </div>
      )}
    </>
  );
}