import React, { useState, useEffect } from 'react';
import { Menu, X, CreditCard, Upload, Shield, Zap, Star, Check } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import BusinessCardShowcase from './components/BusinessCardShowcase';
import UploadSection from './components/UploadSection';
import OtherServices from './components/OtherServices';
import CompanyIntro from './components/CompanyIntro';
import Footer from './components/Footer';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <CreditCard className="text-black w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">PICKIT</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="text-sm text-zinc-400 hover:text-white transition-colors">Process</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Create Custom Card
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4 md:hidden">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-zinc-300">Features</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="text-zinc-300">Process</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="text-white font-semibold">Create Now</a>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BusinessCardShowcase />
        <UploadSection />
        <OtherServices />
        <CompanyIntro />
      </main>
      <Footer />
    </div>
  );
}