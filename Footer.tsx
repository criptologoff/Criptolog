import React, { useState } from 'react';
import { Github, Mail, MapPin, Heart, Coffee } from 'lucide-react';
import { PrivacyModal } from './modals/PrivacyModal';
import { TermsModal } from './modals/TermsModal';
import { CookieModal } from './modals/CookieModal';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  const navigation = {
    main: [
      { name: 'Home', href: '#' },
      { name: 'Features', href: '#features' },
      { name: 'Tools', href: '#tools' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
    tools: [
      { name: 'File Encryption', href: '#encryption' },
      { name: 'Text Encryption', href: '#text-encryption' },
      { name: 'Password Generator', href: '#password' },
      { name: 'Quantum Simulator', href: '#quantum' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com',
        icon: Github,
      },
      {
        name: 'Email',
        href: 'mailto:info@criptolog.com',
        icon: Mail,
      }
    ],
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-secondary-900 to-secondary-950 border-t border-secondary-800">
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Company Info */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary-400" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
                  Criptolog
                </span>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                Soluzioni avanzate di crittografia e sicurezza quantistica per proteggere i tuoi dati nel mondo digitale.
              </p>
              
              <div className="flex space-x-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary-800 hover:bg-secondary-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">
                Strumenti
              </h3>
              <ul className="space-y-3">
                {navigation.tools.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Contattaci
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400">
                  <span className="w-8 h-8 rounded-lg bg-secondary-800 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span>info@criptolog.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <span className="w-8 h-8 rounded-lg bg-secondary-800 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span>Palermo, Italia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-secondary-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} Criptolog. Tutti i diritti riservati.
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Termini di Servizio
                  </button>
                  <button
                    onClick={() => setShowCookies(true)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Cookie Policy
                  </button>
                </div>

                <div className="flex items-center text-gray-400 text-sm">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 mx-1 text-red-500" />
                  <span>in Italy</span>
                </div>

                <a
                  href="https://www.buymeacoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#FFDD00] text-gray-900 rounded-lg hover:bg-[#FFED4A] transition-colors group"
                >
                  <Coffee className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Buy me a coffee</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <CookieModal isOpen={showCookies} onClose={() => setShowCookies(false)} />
    </>
  );
};

// Import the Shield component
const Shield = ({ className }: { className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);