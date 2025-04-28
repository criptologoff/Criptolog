import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from './UserProfile';
import { SyncClient } from './SyncClient';
import { SecurityAudit } from './SecurityAudit';
import { PrivateNotesEditor } from './PrivateNotesEditor';
import {Shield, Clock, Users, FileText, HardDrive } from 'lucide-react';

export const FeaturedTabsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('user-vault');
  
  const tabs = [
    {
      id: 'user-vault',
      icon: <HardDrive className="w-5 h-5" />,
      label: t('userVault'),
      description: t('userVaultDesc'),
      component: <UserProfile />
    },
    {
      id: 'private-notes',
      icon: <FileText className="w-5 h-5" />,
      label: t('privateNotes.title'),
      description: t('privateNotes.description'),
      component: <PrivateNotesEditor />
    },
    {
      id: 'device-sync',
      icon: <Users className="w-5 h-5" />,
      label: t('syncClient'),
      description: t('syncClientDesc'),
      component: <SyncClient />
    },
    {
      id: 'security-audit',
      icon: <Shield className="w-5 h-5" />,
      label: t('securityAudit.title'),
      description: t('securityAudit.shortDesc'),
      component: <SecurityAudit />
    },
    {
      id: 'auto-destruct',
      icon: <Clock className="w-5 h-5" />,
      label: t('autoDestruct.title'),
      description: t('autoDestruct.description'),
      component: null // Will be implemented separately
    }
  ];
  
  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <section id="advanced-features" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">{t('advancedFeatures')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t('advancedFeaturesDesc')}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                activeTab === tab.id ? 'bg-blue-500' : 'bg-gray-700'
              }`}>
                {tab.icon}
              </div>
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {activeComponent && (
          <div className="mt-8 animate-fade-in">
            {activeComponent}
          </div>
        )}
      </div>
    </section>
  );
};