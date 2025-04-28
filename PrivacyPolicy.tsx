import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const sections = t('modals.privacy.sections', { returnObjects: true }) as Array<{
    title: string;
    content: string;
    items?: string[];
  }>;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.privacy.title')}>
      <div className="text-sm text-gray-300 space-y-6 leading-relaxed">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
            <p>{section.content}</p>
            
            {section.items && (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i} className="text-gray-400">
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};