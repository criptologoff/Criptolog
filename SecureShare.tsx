import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Link, Mail, Share2, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { showToast } from '../../utils/toast';

interface SecureShareProps {
  onClose: () => void;
  type: 'file' | 'text';
  fileName?: string;
}

export const SecureShare: React.FC<SecureShareProps> = ({ 
  onClose, 
  type,
  fileName
}) => {
  const { t } = useTranslation();
  const [shareUrl, setShareUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [expiryHours, setExpiryHours] = useState(24);
  const [maxDownloads, setMaxDownloads] = useState(1);
  
  // In a real implementation, this would call a backend API to store the encrypted data
  // and return a secure sharing link.
  const generateShareLink = () => {
    setIsGeneratingLink(true);
    
    // Simulate API call
    setTimeout(() => {
      // For this demo, we're just creating a dummy URL
      const fakeId = Math.random().toString(36).substring(2, 15);
      const baseUrl = window.location.origin;
      const newShareUrl = `${baseUrl}/shared/${fakeId}`;
      
      setShareUrl(newShareUrl);
      setIsGeneratingLink(false);
    }, 1500);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast('Link copied to clipboard', 'success');
      })
      .catch(() => {
        showToast('Failed to copy to clipboard', 'error');
      });
  };
  
  const sendByEmail = () => {
    // This would typically integrate with user's email client
    // Here we'll just open a mailto link
    const subject = encodeURIComponent(
      type === 'file' 
        ? t('features.secureShare.emailSubjectFile', { fileName: fileName || 'encrypted-file' }) 
        : t('features.secureShare.emailSubjectText')
    );
    
    const body = encodeURIComponent(
      t('features.secureShare.emailBody', { url: shareUrl, password: password })
    );
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  return (
    <div className="p-6 bg-secondary-800 rounded-lg shadow-xl border border-secondary-700 max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-primary-500/20 p-2 rounded-lg">
          <Share2 className="w-6 h-6 text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-white">{t('features.secureShare.title')}</h2>
      </div>
      
      <p className="text-gray-300 mb-6">
        {type === 'file' 
          ? t('features.secureShare.description')
          : t('features.secureShare.descriptionText')
        }
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-200 font-medium mb-2">
            {t('features.secureShare.password')}
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('features.secureShare.passwordPlaceholder')}
              className="flex-1"
              showPasswordToggle
            />
            <Button 
              variant="secondary"
              onClick={() => {
                // Generate a random password
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                let newPassword = '';
                for (let i = 0; i < 10; i++) {
                  newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                setPassword(newPassword);
              }}
            >
              {t('common.generate')}
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-400 flex items-center">
            <Shield className="w-4 h-4 mr-1" />
            {t('features.secureShare.passwordWarning')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              {t('features.secureShare.expiry')}
            </label>
            <select 
              value={expiryHours}
              onChange={(e) => setExpiryHours(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={1}>{t('features.secureShare.1hour')}</option>
              <option value={24}>{t('features.secureShare.24hours')}</option>
              <option value={72}>{t('features.secureShare.3days')}</option>
              <option value={168}>{t('features.secureShare.7days')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              {t('features.secureShare.maxDownloads')}
            </label>
            <select 
              value={maxDownloads}
              onChange={(e) => setMaxDownloads(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={0}>{t('features.secureShare.unlimited')}</option>
            </select>
          </div>
        </div>
        
        {!shareUrl ? (
          <Button
            onClick={generateShareLink}
            disabled={isGeneratingLink || !password}
            isLoading={isGeneratingLink}
            fullWidth
            size="lg"
            icon={<Link className="w-5 h-5" />}
          >
            {t('features.secureShare.generateLink')}
          </Button>
        ) : (
          <>
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                {t('features.secureShare.shareLink')}
              </label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-l-lg text-white focus:outline-none"
                />
                <button 
                  onClick={() => copyToClipboard(shareUrl)}
                  className="bg-primary-600 hover:bg-primary-500 text-white px-4 rounded-r-lg transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={sendByEmail}
                fullWidth
                variant="secondary"
                icon={<Mail className="w-5 h-5" />}
              >
                {t('features.secureShare.sendByEmail')}
              </Button>
              
              <Button
                onClick={onClose}
                fullWidth
                variant="outline"
              >
                {t('common.close')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};