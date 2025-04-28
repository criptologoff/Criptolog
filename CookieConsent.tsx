import React, { useState, useEffect } from 'react';
import { Shield, X, Settings } from 'lucide-react';
import { Button } from './ui/Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: true,
    marketing: true
  });

  useEffect(() => {
    // Check if user has already made a choice
    if (!getCookie('cookieConsent')) {
      setIsVisible(true);
    } else {
      // Load saved preferences
      setPreferences(prev => ({
        ...prev,
        analytics: getCookie('cookieAnalytics') === 'true',
        marketing: getCookie('cookieMarketing') === 'true'
      }));
    }
  }, []);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name: string): string => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  };

  const acceptAll = () => {
    setCookie('cookieConsent', 'accepted_all', 365);
    setCookie('cookieAnalytics', 'true', 365);
    setCookie('cookieMarketing', 'true', 365);
    setIsVisible(false);
    
    // In a real app, you would initialize analytics here
    // if (window.initializeAnalytics) window.initializeAnalytics();
  };

  const decline = () => {
    setCookie('cookieConsent', 'declined', 7);
    setCookie('cookieAnalytics', 'false', 7);
    setCookie('cookieMarketing', 'false', 7);
    setIsVisible(false);
    
    // In a real app, you would disable analytics here
    // if (window.disableAnalytics) window.disableAnalytics();
  };

  const savePreferences = () => {
    setCookie('cookieConsent', 'custom', 365);
    setCookie('cookieAnalytics', preferences.analytics.toString(), 365);
    setCookie('cookieMarketing', preferences.marketing.toString(), 365);
    setIsVisible(false);
    setShowPreferences(false);
    
    // In a real app, you would initialize or disable analytics based on preferences
    // if (preferences.analytics && window.initializeAnalytics) {
    //   window.initializeAnalytics();
    // } else if (!preferences.analytics && window.disableAnalytics) {
    //   window.disableAnalytics();
    // }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-4xl bg-secondary-900 rounded-t-xl sm:rounded-xl shadow-2xl border border-secondary-800/50">
        {showPreferences ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Cookie Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-secondary-800"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Essential Cookies - Always enabled */}
              <div className="flex items-center justify-between p-4 bg-secondary-800/50 rounded-xl border border-secondary-700">
                <div>
                  <h4 className="font-medium text-white">Essential Cookies</h4>
                  <p className="text-sm text-gray-400 mt-1">Necessary for the site to function</p>
                </div>
                <div className="w-12 h-6 bg-primary-600/50 rounded-full relative">
                  <div className="absolute inset-y-1 right-1 w-4 h-4 bg-primary-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 bg-secondary-800/50 rounded-xl border border-secondary-700">
                <div>
                  <h4 className="font-medium text-white">Analytics Cookies</h4>
                  <p className="text-sm text-gray-400 mt-1">Helps improve the site</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={e => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-secondary-600 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 bg-secondary-800/50 rounded-xl border border-secondary-700">
                <div>
                  <h4 className="font-medium text-white">Marketing Cookies</h4>
                  <p className="text-sm text-gray-400 mt-1">Used for personalized advertising</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={e => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-secondary-600 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-secondary-800">
              <Button
                variant="outline"
                onClick={() => setShowPreferences(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={savePreferences}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex items-start gap-4 flex-grow">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/20 shrink-0">
                  <Shield className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">We use cookies</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We use cookies to improve your experience on our site. By accepting, you consent to the use of cookies for analytics and marketing purposes.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
                    <button
                      onClick={() => window.showPrivacyModal?.()}
                      className="underline hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() => window.showCookieModal?.()}
                      className="underline hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </button>
                    <button
                      onClick={() => window.showTermsModal?.()}
                      className="underline hover:text-white transition-colors"
                    >
                      Terms of Service
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={decline}
                >
                  Decline
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowPreferences(true)}
                  icon={<Settings size={16} />}
                >
                  Preferences
                </Button>
                <Button
                  onClick={acceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};