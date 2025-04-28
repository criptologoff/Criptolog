import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const showLoading = (msg = t('common.loading')) => {
      setMessage(msg);
    };
    
    const hideLoading = () => {
      setMessage('');
    };
    
    // Make these functions available globally
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
    
    return () => {
      // Clean up
      window.showLoading = undefined;
      window.hideLoading = undefined;
    };
  }, [t]);
  
  if (!isLoading) return null;
  
  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-white text-2xl"
    >
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary-400" />
        <p>{message}</p>
      </div>
    </div>
  );
};

// Add window type definitions
declare global {
  interface Window {
    showLoading?: (message?: string) => void;
    hideLoading?: () => void;
  }
}