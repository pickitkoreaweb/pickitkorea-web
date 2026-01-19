import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, UserCircle, LogOut, Gift, LayoutDashboard, User } from 'lucide-react';
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
import AdminDashboard from './components/AdminDashboard';
import MyPage from './components/MyPage';

type Page = 'home' | 'about' | 'metal-biz' | 'metal-custom' | 'materials' | 'faq' | 'inquiry' | 'contact' | 'policy' | 'auth' | 'event' | 'admin-dashboard' | 'mypage';

interface UserData {
  id: string;
  customerId: string; // Unique PKT ID
  name: string;
  role: 'admin' | 'user';
  email: string;
  phone: string;
  birthdate?: string; // Added field
  address?: string;
  joinedAt: string;
}

interface SiteImages {
  heroBg: string;
  feature1: string;
}

const Navbar: React.FC<{ currentPage: Page; setPage: (page: Page) => void; currentUser: UserData | null; onLogout: () => void }> = ({ currentPage, setPage, currentUser, onLogout }) => {
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

  const handleUserClick = () => {
    if (currentUser?.role === 'admin') {
      handleNavClick('admin-dashboard');
    } else {
      handleNavClick('mypage');
    }
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

          {/* EVENT BUTTON */}
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
                  {currentUser.role === 'admin' ? (
                       <button 
                          onClick={() => handleNavClick('admin-dashboard')}
                          className="flex items-center gap-1 text-[10px] bg-red-900/30 text-red-500 border border-red-900/50 px-2 py-1 rounded hover:bg-red-900/50 transition-colors interactable"
                       >
                           <LayoutDashboard className="w-3 h-3" /> ADMIN
                       </button>
                  ) : (
                      <button 
                          onClick={() => handleNavClick('mypage')}
                          className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors interactable ${currentPage === 'mypage' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                       >
                           <User className="w-3 h-3" /> 마이페이지
                       </button>
                  )}
                  
                  {/* User Profile Clickable Area */}
                  <div 
                      onClick={handleUserClick}
                      className="flex flex-col text-right cursor-pointer group interactable"
                  >
                      <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors group-hover:text-white ${currentUser.role === 'admin' ? 'text-red-500' : 'text-zinc-500'}`}>
                          {currentUser.role === 'admin' ? 'ADMINISTRATOR' : 'MEMBER'}
                      </span>
                      <span className="text-xs font-bold text-white transition-colors group-hover:text-[#D4AF37]">{currentUser.name}</span>
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
              <div 
                  className="flex items-center gap-3 pb-6 border-b border-zinc-800 cursor-pointer active:bg-zinc-900/50 rounded p-2 -mx-2 transition-colors"
                  onClick={handleUserClick}
              >
                  <UserCircle className="w-10 h-10 text-zinc-500" />
                  <div>
                      <p className="text-sm font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-zinc-500 uppercase">{currentUser.role === 'admin' ? 'Administrator' : 'Member'}</p>
                  </div>
                  <button 
                      onClick={(e) => {
                          e.stopPropagation(); // Prevent parent click
                          onLogout();
                      }} 
                      className="ml-auto text-xs text-red-500 font-bold px-3 py-1 border border-red-900/50 rounded"
                  >
                      LOGOUT
                  </button>
              </div>
          )}
          
          {currentUser?.role === 'admin' ? (
              <button 
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="text-2xl font-serif text-red-500 hover:text-red-400 text-left flex items-center gap-2"
              >
                  <LayoutDashboard className="w-6 h-6" /> Admin Dashboard
              </button>
          ) : currentUser && (
              <button 
                  onClick={() => handleNavClick('mypage')}
                  className="text-2xl font-serif text-[#D4AF37] hover:text-white text-left flex items-center gap-2"
              >
                  <User className="w-6 h-6" /> 마이페이지 (My Page)
              </button>
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
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // Global Site Content Config
  const [siteImages, setSiteImages] = useState<SiteImages>({
      heroBg: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2500&auto=format&fit=crop',
      feature1: 'https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop'
  });

  // Check for session and saved images on load
  useEffect(() => {
    // Auth
    const savedUser = localStorage.getItem('pickit_user');
    if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
    }

    // Images
    const savedImages = localStorage.getItem('pickit_site_images');
    if (savedImages) {
        setSiteImages(JSON.parse(savedImages));
    }
  }, []);

  const handleLogin = (user: UserData) => {
      setCurrentUser(user);
  };

  const handleLogout = () => {
      localStorage.removeItem('pickit_user');
      setCurrentUser(null);
      setCurrentPage('home');
  };
  
  const updateSiteImages = (newImages: SiteImages) => {
      setSiteImages(newImages);
      localStorage.setItem('pickit_site_images', JSON.stringify(newImages));
  };
  
  const handleUpdateUser = (updatedUser: UserData) => {
      setCurrentUser(updatedUser);
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
                <Hero 
                    setPage={(page: string) => setCurrentPage(page as Page)} 
                    bgImage={siteImages.heroBg}
                />
                <RevealOnScroll>
                    <CompanyIntro />
                </RevealOnScroll>
                <RevealOnScroll>
                    <Features qcImage={siteImages.feature1} />
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
                    <Features qcImage={siteImages.feature1} />
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
                    <Features qcImage={siteImages.feature1} />
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
            
            {currentPage === 'admin-dashboard' && currentUser?.role === 'admin' && (
                <PageWrapper>
                    <AdminDashboard 
                        siteImages={siteImages} 
                        updateSiteImages={updateSiteImages} 
                    />
                </PageWrapper>
            )}

            {currentPage === 'mypage' && currentUser && (
                <PageWrapper>
                    <MyPage 
                        currentUser={currentUser} 
                        onLogout={handleLogout}
                        onUpdateUser={handleUpdateUser}
                    />
                </PageWrapper>
            )}
          </main>

          <Footer setPage={setCurrentPage} />
        </div>
      )}
    </>
  );
}