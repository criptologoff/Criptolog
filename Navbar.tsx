import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Mail, Home, Key, FileText, Lock, ChevronDown } from 'lucide-react';
import { ContactModal } from './modals/ContactModal';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const navItems = (t: any) => [
  { href: '#hero', label: t('nav.home'), icon: <Home className="w-5 h-5" /> },
  { href: '#features', label: t('nav.features'), icon: <Key className="w-5 h-5" /> },
  { href: '#tools', label: t('nav.tools'), icon: <FileText className="w-5 h-5" /> },
  { href: '#faq', label: t('nav.faq'), icon: <Lock className="w-5 h-5" /> }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

const LanguageDropdown: React.FC<{ i18n: any; changeLanguage: (lng: string) => void }> = ({ i18n, changeLanguage }) => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group"
        aria-haspopup="true"
        aria-expanded={languageMenuOpen}
      >
        <Globe className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${languageMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      {languageMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0B1120]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/20 overflow-hidden transform origin-top-right transition-all duration-300 ease-out">
          {languages.map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => {
                changeLanguage(code);
                setLanguageMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 group ${
                i18n.language === code
                  ? 'text-white bg-[#0066FF]/10'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg transform transition-transform duration-300 group-hover:scale-110">{flag}</span>
              <span className="font-medium">{name}</span>
              {i18n.language === code && (
                <span className="ml-auto text-[#0066FF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu }) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-8 h-24 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-12">
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Criptolog logo" 
                  className="w-12 h-12 object-contain transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#0066FF] transition-colors duration-300">
                Criptolog
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems(t).map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group hover:bg-white/5"
                >
                  <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {icon}
                  </span>
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageDropdown i18n={i18n} changeLanguage={changeLanguage} />
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-[#0066FF] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#0052CC] hover:shadow-lg hover:shadow-[#0066FF]/25 group"
            >
              <Mail className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span>{t('nav.contact')}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white transform transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu size={24} className="transform transition-transform duration-300 group-hover:rotate-12" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export { Navbar };