import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, UserCircle, LogOut, LayoutDashboard, User } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
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
import AuthView from './components/AuthView';
import EventView from './components/EventView';
import AdminDashboard from './components/AdminDashboard';
import MyPage from './components/MyPage';
import LaunchPopup from './components/LaunchPopup';
import Gallery from './components/Gallery';

// Removed 'metal-biz' from Page type
type Page = 'home' | 'about' | 'metal-custom' | 'materials' | 'gallery' | 'faq' | 'contact' | 'policy' | 'auth' | 'event' | 'admin-dashboard' | 'mypage';

interface UserData {
  id: string;
  customerId: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
  phone: string;
  birthdate?: string;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled || currentPage !== 'home' ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group interactable" 
            onClick={() => handleNavClick('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 rounded-none transform rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-[225deg] shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <div className="w-3 h-3 bg-black rounded-full transform -rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-[0.2em] text-white">PICKIT</span>
        </div>

        {/* Desktop Menu - Simplified */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('about')} className={`interactable text-xs font-bold tracking-widest transition-colors ${currentPage === 'about' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>ABOUT</button>
          <button onClick={() => handleNavClick('metal-custom')} className={`interactable text-xs font-bold tracking-widest transition-colors ${currentPage === 'metal-custom' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>METAL CARD</button>
          <button onClick={() => handleNavClick('gallery')} className={`interactable text-xs font-bold tracking-widest transition-colors ${currentPage === 'gallery' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>GALLERY</button>
          <button onClick={() => handleNavClick('materials')} className={`interactable text-xs font-bold tracking-widest transition-colors ${currentPage === 'materials' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>MATERIALS</button>
          <button onClick={() => handleNavClick('faq')} className={`interactable text-xs font-bold tracking-widest transition-colors ${currentPage === 'faq' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>FAQ</button>
          
          <button onClick={() => handleNavClick('event')} className={`interactable text-xs font-bold tracking-widest transition-colors flex items-center gap-1.5 ${currentPage === 'event' ? 'text-[#E1306C]' : 'text-white hover:text-[#E1306C]'}`}>
             EVENT <span className="bg-[#E1306C] text-white text-[8px] px-1 rounded font-bold animate-pulse">NEW</span>
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-4">
              {currentUser ? (
                  <div className="flex items-center gap-4 border-r border-zinc-800 pr-6 mr-2">
                      <div onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin-dashboard' : 'mypage')} className="flex flex-col text-right cursor-pointer group interactable">
                          <span className={`text-[9px] font-bold uppercase ${currentUser.role === 'admin' ? 'text-red-500' : 'text-zinc-500'}`}>{currentUser.role === 'admin' ? 'ADMIN' : 'MEMBER'}</span>
                          <span className="text-xs font-bold text-white group-hover:text-[#D4AF37]">{currentUser.name}</span>
                      </div>
                      <button onClick={onLogout} className="text-zinc-500 hover:text-white interactable"><LogOut className="w-4 h-4" /></button>
                  </div>
              ) : (
                 <button onClick={() => handleNavClick('auth')} className="interactable text-xs font-bold tracking-widest text-zinc-500 hover:text-white mr-4">LOGIN</button>
              )}

              {/* MyPage / Admin Button */}
              {currentUser?.role === 'admin' ? (
                   <button onClick={() => handleNavClick('admin-dashboard')} className="flex items-center gap-1 text-[10px] bg-red-900/30 text-red-500 border border-red-900/50 px-3 py-2 rounded hover:bg-red-900/50 interactable">
                       <LayoutDashboard className="w-3 h-3" /> ADMIN
                   </button>
              ) : (
                  <button onClick={() => currentUser ? handleNavClick('mypage') : handleNavClick('auth')} className={`flex items-center gap-1 text-[10px] px-3 py-2 rounded interactable font-bold tracking-wider ${currentPage === 'mypage' ? 'bg-[#D4AF37] text-black' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                       <User className="w-3 h-3" /> 마이페이지
                   </button>
              )}
              
              <button onClick={() => handleNavClick('contact')} className="interactable px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest hover:bg-[#D4AF37] transition-all">CONTACT</button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-8 flex flex-col gap-6 md:hidden h-[calc(100vh-80px)] overflow-y-auto">
          {currentUser && (
              <div className="flex items-center gap-3 pb-6 border-b border-zinc-800" onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin-dashboard' : 'mypage')}>
                  <UserCircle className="w-10 h-10 text-zinc-500" />
                  <div><p className="text-sm font-bold text-white">{currentUser.name}</p></div>
                  <button onClick={(e) => { e.stopPropagation(); onLogout(); }} className="ml-auto text-xs text-red-500 font-bold border border-red-900/50 px-2 py-1 rounded">LOGOUT</button>
              </div>
          )}
          
          <button onClick={() => handleNavClick('about')} className="text-xl font-serif text-zinc-300">About Us</button>
          <button onClick={() => handleNavClick('metal-custom')} className="text-xl font-serif text-white">Metal Card</button>
          <button onClick={() => handleNavClick('gallery')} className="text-xl font-serif text-zinc-300">Gallery</button>
          <button onClick={() => handleNavClick('materials')} className="text-xl font-serif text-zinc-300">Materials</button>
          <button onClick={() => handleNavClick('event')} className="text-xl font-serif text-[#E1306C]">Event</button>
          {!currentUser && <button onClick={() => handleNavClick('auth')} className="text-xl font-serif text-[#D4AF37]">Login / Sign Up</button>}
          <button onClick={() => handleNavClick('contact')} className="text-sm font-bold bg-white text-black py-4 rounded mt-auto">CONTACT US</button>
        </div>
      )}
    </nav>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="animate-fade-in-up min-h-screen pt-20">{children}</div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [siteImages, setSiteImages] = useState<SiteImages>({
      heroBg: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2500&auto=format&fit=crop',
      feature1: 'https://images.unsplash.com/photo-1614623466144-d83049185c7c?q=80&w=1600&auto=format&fit=crop'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('pickit_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    const savedImages = localStorage.getItem('pickit_site_images');
    if (savedImages) setSiteImages(JSON.parse(savedImages));
  }, []);

  const handleLogin = (user: UserData) => setCurrentUser(user);
  const handleLogout = () => { localStorage.removeItem('pickit_user'); setCurrentUser(null); setCurrentPage('home'); };
  const updateSiteImages = (newImages: SiteImages) => { setSiteImages(newImages); localStorage.setItem('pickit_site_images', JSON.stringify(newImages)); };
  const handleUpdateUser = (updatedUser: UserData) => setCurrentUser(updatedUser);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      {!loading && (
        <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans cursor-none">
          <CustomCursor />
          <ScrollProgress />
          <Navbar currentPage={currentPage} setPage={setCurrentPage} currentUser={currentUser} onLogout={handleLogout} />
          <PrivateConcierge />
          <LaunchPopup />
          
          <main>
            {currentPage === 'home' && (
              <div className="animate-fade-in-up">
                <Hero setPage={(page: string) => setCurrentPage(page as Page)} bgImage={siteImages.heroBg} />
                <RevealOnScroll><CompanyIntro /></RevealOnScroll>
                <RevealOnScroll><Features qcImage={siteImages.feature1} /></RevealOnScroll>
                <RevealOnScroll><PackagingShowcase /></RevealOnScroll>
                <RevealOnScroll><Reviews /></RevealOnScroll>
              </div>
            )}
            {currentPage === 'about' && <PageWrapper><CompanyIntro /><RevealOnScroll><Features qcImage={siteImages.feature1} /></RevealOnScroll></PageWrapper>}
            {currentPage === 'metal-custom' && <PageWrapper><div className="pt-10"><Features qcImage={siteImages.feature1} /><RevealOnScroll><UploadSection /></RevealOnScroll></div></PageWrapper>}
            {currentPage === 'materials' && <PageWrapper><MaterialsGallery /><div className="py-20 text-center"><button onClick={() => setCurrentPage('metal-custom')} className="px-10 py-4 bg-white text-black font-bold text-xs tracking-widest hover:bg-[#D4AF37] transition-all interactable shadow-lg">START CUSTOMIZING</button></div></PageWrapper>}
            {currentPage === 'gallery' && <PageWrapper><Gallery /></PageWrapper>}
            {currentPage === 'faq' && <PageWrapper><FAQ /></PageWrapper>}
            {currentPage === 'auth' && <PageWrapper><AuthView onLogin={handleLogin} setPage={setCurrentPage} /></PageWrapper>}
            {currentPage === 'event' && <PageWrapper><EventView /></PageWrapper>}
            {currentPage === 'contact' && <PageWrapper><ContactView /></PageWrapper>}
            {currentPage === 'policy' && <PageWrapper><PolicyView /></PageWrapper>}
            {currentPage === 'admin-dashboard' && currentUser?.role === 'admin' && <PageWrapper><AdminDashboard siteImages={siteImages} updateSiteImages={updateSiteImages} /></PageWrapper>}
            {currentPage === 'mypage' && currentUser && <PageWrapper><MyPage currentUser={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /></PageWrapper>}
          </main>

          <Footer setPage={setCurrentPage} />
        </div>
      )}
    </>
  );
}