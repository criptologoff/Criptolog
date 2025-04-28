import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Key, User, FileLock, History, Download, Trash2, Sliders, LogOut } from 'lucide-react';

interface StoredItem {
  id: string;
  name: string;
  date: string;
  size?: string;
  type: 'file' | 'text' | 'password';
}

export const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'files' | 'settings'>('files');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Sample stored data - in a real app, this would come from localStorage or IndexedDB
  const [storedItems, setStoredItems] = useState<StoredItem[]>([
    { id: '1', name: 'confidential_doc.pdf.encrypted', date: '2025-04-10', size: '2.4 MB', type: 'file' },
    { id: '2', name: 'secure_note', date: '2025-04-09', type: 'text' },
    { id: '3', name: 'bank_password', date: '2025-04-08', type: 'password' },
  ]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would verify against a hash stored in localStorage
    if (password) {
      setIsAuthenticated(true);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };
  
  const handleDeleteItem = (id: string) => {
    setStoredItems(items => items.filter(item => item.id !== id));
    // In a real app, we'd also remove from storage
  };
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">{t('userVault')}</h2>
          <p className="text-gray-400 mt-2">{t('unlockVaultDescription')}</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-200 font-medium mb-2">{t('masterPassword')}</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterMasterPassword')}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            {t('unlockVault')}
          </button>
          
          <p className="text-gray-400 text-sm text-center mt-4">
            {t('firstTimeVaultUser')} <button className="text-blue-400 hover:underline">{t('setupVault')}</button>
          </p>
        </form>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-900 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{t('userVault')}</h3>
              <p className="text-sm text-gray-400">{t('secureStorage')}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('files')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'files' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <FileLock className="w-5 h-5" />
              <span>{t('savedItems')}</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>{t('settings')}</span>
            </button>
            
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('lockVault')}</span>
            </button>
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <p className="text-sm text-gray-300">{t('encryptedStorageNotice')}</p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          {activeTab === 'files' ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{t('savedItems')}</h2>
                <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                  <option value="all">{t('allItems')}</option>
                  <option value="file">{t('files')}</option>
                  <option value="text">{t('textNotes')}</option>
                  <option value="password">{t('passwords')}</option>
                </select>
              </div>
              
              {storedItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 mx-auto flex items-center justify-center">
                    <FileLock className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-300">{t('noSavedItems')}</h3>
                  <p className="mt-2 text-gray-400">{t('startByEncrypting')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {storedItems.map((item) => (
                    <div key={item.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mt-1">
                            {item.type === 'file' && <FileLock className="w-5 h-5 text-blue-400" />}
                            {item.type === 'text' && <History className="w-5 h-5 text-green-400" />}
                            {item.type === 'password' && <Key className="w-5 h-5 text-amber-400" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{item.name}</h3>
                            <div className="flex items-center space-x-3 mt-1 text-sm">
                              <span className="text-gray-400">{item.date}</span>
                              {item.size && <span className="text-gray-400">{item.size}</span>}
                              <span className="text-gray-400 capitalize">{t(item.type)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-md hover:bg-blue-500/10">
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-6">{t('vaultSettings')}</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">{t('changeMasterPassword')}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-200 font-medium mb-2">{t('currentPassword')}</label>
                      <input type="password" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-200 font-medium mb-2">{t('newPassword')}</label>
                      <input type="password" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-200 font-medium mb-2">{t('confirmNewPassword')}</label>
                      <input type="password" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      {t('updatePassword')}
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">{t('dataManagement')}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-200">{t('exportVaultData')}</h4>
                        <p className="text-sm text-gray-400">{t('exportVaultDescription')}</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors">
                        {t('export')}
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-700">
                      <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2" />
                        <span>{t('clearAllData')}</span>
                      </button>
                      <p className="text-sm text-gray-400 mt-1">{t('clearDataWarning')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};