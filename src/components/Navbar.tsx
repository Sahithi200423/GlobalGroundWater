import React from 'react';
import { Eye, Shield, Sun, Moon, Calendar, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'admin';
  setView: (view: 'landing' | 'admin') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onBookClick: () => void;
}

export default function Navbar({ currentView, setView, darkMode, setDarkMode, onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setView('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header
      id="app-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? darkMode ? 'bg-[#0A0915]/95 backdrop-blur-md border-b border-[#D4AF37]/15 py-3 shadow-lg shadow-black/20' : 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#D4AF37]/15 py-3 shadow-md shadow-[#D4AF37]/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-rose-500 to-[#D4AF37] flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-500">
            <Eye className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-rose-400 to-[#D4AF37] bg-clip-text text-transparent font-display-sans">
              HYDROVISION
            </span>
            <span className="block text-[10px] tracking-widest uppercase opacity-75 font-mono -mt-1 text-[#D4AF37]">
              AI Consultants
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold font-display-sans">
            <button 
              id="nav-services"
              onClick={() => scrollToSection('services')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-about"
              onClick={() => scrollToSection('about')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-experience"
              onClick={() => scrollToSection('experience')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Journey
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-gallery"
              onClick={() => scrollToSection('gallery')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-why-us"
              onClick={() => scrollToSection('why-choose-us')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Scientific Tech
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-testimonials"
              onClick={() => scrollToSection('testimonials')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Clients
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              id="nav-contact"
              onClick={() => scrollToSection('contact')} 
              className={`hover:text-[#D4AF37] transition-colors duration-300 relative group py-1 ${darkMode ? 'text-white/80' : 'text-slate-800'}`}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>
        ) : (
          <div className="text-sm font-mono opacity-80 flex items-center gap-2 text-[#D4AF37]">
            <Shield className="w-4 h-4 text-[#D4AF37]" /> Secure Admin Portal
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-[#D4AF37]' 
                : 'bg-black/5 border-black/10 hover:bg-black/10 text-indigo-700'
            }`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin Dashboard Switch */}
          <button
            id="admin-portal-switch"
            onClick={() => setView(currentView === 'admin' ? 'landing' : 'admin')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
                : darkMode 
                  ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-[#D4AF37]/30'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-[#D4AF37]/30'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            {currentView === 'admin' ? 'Exit Admin' : 'Admin Panel'}
          </button>

          {/* Quick Consultation CTA */}
          <button
            id="quick-book-cta"
            onClick={onBookClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-[#D4AF37] hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 text-white font-semibold text-xs md:text-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            Book Consult
          </button>
        </div>
      </div>
    </header>
  );
}
