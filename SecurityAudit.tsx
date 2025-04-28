import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, ShieldCheck, AlertTriangle, Check, XCircle, RefreshCw } from 'lucide-react';

interface PasswordEntry {
  id: string;
  title: string;
  password: string;
  lastChanged: string;
  strength: 'weak' | 'medium' | 'strong';
  reused: boolean;
}

export const SecurityAudit: React.FC = () => {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  
  // Sample password entries - in a real app, this would come from a password manager component
  const passwords: PasswordEntry[] = [
    { 
      id: '1', 
      title: 'Gmail', 
      password: 'password123', 
      lastChanged: '2024-12-01', 
      strength: 'weak',
      reused: true
    },
    { 
      id: '2', 
      title: 'Facebook', 
      password: 'password123', 
      lastChanged: '2024-11-15', 
      strength: 'weak',
      reused: true
    },
    { 
      id: '3', 
      title: 'Banking', 
      password: 'S3cur3P@ssw0rd!', 
      lastChanged: '2025-03-10', 
      strength: 'strong',
      reused: false
    },
    { 
      id: '4', 
      title: 'Work Email', 
      password: 'Company2025!', 
      lastChanged: '2025-01-05', 
      strength: 'medium',
      reused: false
    }
  ];
  
  const startScan = () => {
    setIsScanning(true);
    
    // Simulate a scan
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Calculate security score (0-100)
      calculateSecurityScore();
    }, 2500);
  };
  
  const calculateSecurityScore = () => {
    let score = 0;
    
    // Count password issues
    const weakPasswords = passwords.filter(p => p.strength === 'weak').length;
    const reusedPasswords = passwords.filter(p => p.reused).length;
    const oldPasswords = passwords.filter(p => {
      const lastChanged = new Date(p.lastChanged);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastChanged < sixMonthsAgo;
    }).length;
    
    // Calculate score - more sophisticated in a real app
    const totalIssues = weakPasswords + reusedPasswords + oldPasswords;
    const maxIssues = passwords.length * 3; // Max possible issues
    
    score = Math.round(100 * (1 - (totalIssues / maxIssues)));
    setSecurityScore(score);
  };
  
  const getSecurityScoreColor = () => {
    if (securityScore >= 80) return 'text-green-400';
    if (securityScore >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getRecommendations = () => {
    const weakPasswords = passwords.filter(p => p.strength === 'weak');
    const reusedPasswords = passwords.filter(p => p.reused);
    const oldPasswords = passwords.filter(p => {
      const lastChanged = new Date(p.lastChanged);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastChanged < sixMonthsAgo;
    });
    
    return {
      weakPasswords,
      reusedPasswords,
      oldPasswords,
    };
  };
  
  const recommendations = getRecommendations();
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t('securityAudit.title')}</h2>
        </div>
        
        <p className="text-gray-300 mt-2">
          {t('securityAudit.description')}
        </p>
      </div>
      
      <div className="p-6">
        {!scanComplete ? (
          <div className="text-center py-8">
            {isScanning ? (
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin mx-auto"></div>
                <h3 className="text-xl font-semibold text-white">{t('securityAudit.scanning')}</h3>
                <p className="text-gray-400">{t('securityAudit.scanningDescription')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-12 h-12 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('securityAudit.startScan')}</h3>
                  <p className="text-gray-400 max-w-lg mx-auto mb-6">{t('securityAudit.startDescription')}</p>
                  
                  <button 
                    onClick={startScan}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    {t('securityAudit.scanNow')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-700/30 rounded-lg p-6 border border-gray-700 mb-8">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-800">
                  <span className={`text-2xl font-bold ${getSecurityScoreColor()}`}>
                    {securityScore}%
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{t('securityAudit.securityScore')}</h3>
                  <p className="text-sm text-gray-400">{t('securityAudit.lastScan')}: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <button 
                onClick={startScan} 
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('securityAudit.rescan')}
              </button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className={`p-4 rounded-lg border ${
                recommendations.weakPasswords.length > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'
              }`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-white">{t('securityAudit.weakPasswords')}</h4>
                  {recommendations.weakPasswords.length > 0 ? (
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full font-medium">
                      {recommendations.weakPasswords.length}
                    </span>
                  ) : (
                    <Check className="text-green-400" size={18} />
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {recommendations.weakPasswords.length > 0 
                    ? t('securityAudit.weakPasswordsFound') 
                    : t('securityAudit.noWeakPasswords')
                  }
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                recommendations.reusedPasswords.length > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30'
              }`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-white">{t('securityAudit.reusedPasswords')}</h4>
                  {recommendations.reusedPasswords.length > 0 ? (
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full font-medium">
                      {recommendations.reusedPasswords.length}
                    </span>
                  ) : (
                    <Check className="text-green-400" size={18} />
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {recommendations.reusedPasswords.length > 0 
                    ? t('securityAudit.reusedPasswordsFound') 
                    : t('securityAudit.noReusedPasswords')
                  }
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                recommendations.oldPasswords.length > 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-green-500/10 border-green-500/30'
              }`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-white">{t('securityAudit.oldPasswords')}</h4>
                  {recommendations.oldPasswords.length > 0 ? (
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full font-medium">
                      {recommendations.oldPasswords.length}
                    </span>
                  ) : (
                    <Check className="text-green-400" size={18} />
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {recommendations.oldPasswords.length > 0 
                    ? t('securityAudit.oldPasswordsFound') 
                    : t('securityAudit.noOldPasswords')
                  }
                </p>
              </div>
            </div>
            
            {(recommendations.weakPasswords.length > 0 || 
             recommendations.reusedPasswords.length > 0 || 
             recommendations.oldPasswords.length > 0) && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">{t('securityAudit.issuesFound')}</h3>
                
                {recommendations.weakPasswords.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3 text-red-400">
                      <AlertTriangle size={18} />
                      <h4 className="font-medium">{t('securityAudit.weakPasswords')}</h4>
                    </div>
                    <div className="space-y-2">
                      {recommendations.weakPasswords.map((password) => (
                        <div key={password.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-700 flex justify-between items-center">
                          <span className="text-gray-300">{password.title}</span>
                          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            {t('securityAudit.strengthen')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {recommendations.reusedPasswords.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3 text-red-400">
                      <XCircle size={18} />
                      <h4 className="font-medium">{t('securityAudit.reusedPasswords')}</h4>
                    </div>
                    <div className="space-y-2">
                      {recommendations.reusedPasswords.map((password) => (
                        <div key={password.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-700 flex justify-between items-center">
                          <span className="text-gray-300">{password.title}</span>
                          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            {t('securityAudit.change')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {recommendations.oldPasswords.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3 text-amber-400">
                      <AlertTriangle size={18} />
                      <h4 className="font-medium">{t('securityAudit.oldPasswords')}</h4>
                    </div>
                    <div className="space-y-2">
                      {recommendations.oldPasswords.map((password) => (
                        <div key={password.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-700 flex justify-between items-center">
                          <div>
                            <span className="text-gray-300">{password.title}</span>
                            <span className="text-xs text-gray-400 ml-2">
                              {t('securityAudit.lastChanged')}: {password.lastChanged}
                            </span>
                          </div>
                          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            {t('securityAudit.update')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};