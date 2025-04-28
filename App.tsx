import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { EncryptionTools } from './components/EncryptionTools';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Modal } from './components/ui/Modal';
import { PrivacyPolicy } from './components/modals/PrivacyPolicy';
import { TermsOfService } from './components/modals/TermsOfService';
import { CookiePolicy } from './components/modals/CookiePolicy';
import { ContactForm } from './components/modals/ContactForm';
import { SecureShare } from './components/features/SecureShare';
import { AutoDelete } from './components/features/AutoDelete';
import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAutoDeleteModalOpen, setIsAutoDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (mobileMenu && mobileMenuButton && !mobileMenu.contains(event.target as Node) && !mobileMenuButton.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Make modals accessible from anywhere in the app
  useEffect(() => {
    window.showPrivacyModal = () => setIsPrivacyModalOpen(true);
    window.showTermsModal = () => setIsTermsModalOpen(true);
    window.showCookieModal = () => setIsCookieModalOpen(true);
    window.showContactModal = () => setIsContactModalOpen(true);
    window.showShareModal = () => setIsShareModalOpen(true);
    window.showAutoDeleteModal = () => setIsAutoDeleteModalOpen(true);
    
    return () => {
      // Clean up
      window.showPrivacyModal = undefined;
      window.showTermsModal = undefined;
      window.showCookieModal = undefined;
      window.showContactModal = undefined;
      window.showShareModal = undefined;
      window.showAutoDeleteModal = undefined;
    };
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Example function for handling auto-delete confirmation
  const handleAutoDeleteConfirm = (expiry: number | null) => {
    console.log(`Auto-delete set for: ${expiry} seconds`);
    setIsAutoDeleteModalOpen(false);
  };

  // Make contact form globally accessible
  window.showContactModal = () => setIsContactModalOpen(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-900 to-secondary-950 text-gray-100">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:block text-primary-400 bg-secondary-800 p-2"
      >
        {i18n.language === 'it' ? 'Salta al contenuto principale' : 'Skip to main content'}
      </a>
      
      <LoadingOverlay isLoading={isLoading} />
      <CookieConsent />
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

      <main className="min-h-screen bg-[#0B1120] text-white">
        <Hero />
        <Features />
        <EncryptionTools />
        <FAQ />
      </main>
      
      <Footer />

      <ScrollToTop />

      <ChatBot />

      {/* Modals */}
      <PrivacyPolicy isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsOfService isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <CookiePolicy isOpen={isCookieModalOpen} onClose={() => setIsCookieModalOpen(false)} />
      <ContactForm isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      
      {/* Feature modals */}
      <Modal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        title="Secure Sharing"
      >
        <SecureShare 
          onClose={() => setIsShareModalOpen(false)} 
          type="file" 
          fileName="document.pdf.encrypted"
        />
      </Modal>
      
      <Modal 
        isOpen={isAutoDeleteModalOpen} 
        onClose={() => setIsAutoDeleteModalOpen(false)} 
        title="Auto-Delete Settings"
      >
        <AutoDelete 
          onConfirm={handleAutoDeleteConfirm}
          onCancel={() => setIsAutoDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

// Add window type definitions
declare global {
  interface Window {
    showPrivacyModal?: () => void;
    showTermsModal?: () => void;
    showCookieModal?: () => void;
    showContactModal?: () => void;
    showShareModal?: () => void;
    showAutoDeleteModal?: () => void;
  }
}

export default App;