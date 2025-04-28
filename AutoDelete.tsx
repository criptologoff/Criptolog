import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlarmClock, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface AutoDeleteProps {
  onConfirm: (expiry: number | null) => void;
  onCancel: () => void;
}

const expiryOptions = [
  { value: 3600, label: 'features.autoDelete.1hour' },
  { value: 86400, label: 'features.autoDelete.24hours' },
  { value: 604800, label: 'features.autoDelete.7days' },
  { value: 2592000, label: 'features.autoDelete.30days' },
  { value: null, label: 'features.autoDelete.never' },
];

export const AutoDelete: React.FC<AutoDeleteProps> = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const [selectedExpiry, setSelectedExpiry] = useState<number | null>(86400); // Default to 24 hours
  
  return (
    <div className="p-6 bg-secondary-800 rounded-lg shadow-xl border border-secondary-700 max-w-md mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-amber-500/20 rounded-lg p-2">
          <AlarmClock className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="text-xl font-bold text-white">{t('features.autoDelete.title')}</h2>
      </div>
      
      <p className="text-gray-300 mb-6">{t('features.autoDelete.description')}</p>
      
      <div className="space-y-2 mb-6">
        {expiryOptions.map((option) => (
          <label 
            key={option.label} 
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
              selectedExpiry === option.value 
                ? 'border-primary-500 bg-primary-600/10' 
                : 'border-secondary-700 bg-secondary-700/30 hover:bg-secondary-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedExpiry === option.value ? 'bg-primary-500' : 'bg-secondary-600'
              }`}>
                {selectedExpiry === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-white">{t(option.label)}</span>
            </div>
            
            <input
              type="radio"
              name="expiry"
              value={option.value === null ? 'never' : option.value}
              checked={selectedExpiry === option.value}
              onChange={() => setSelectedExpiry(option.value)}
              className="sr-only"
            />
            
            {option.value === null ? (
              <Clock className="w-5 h-5 text-gray-400" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
          </label>
        ))}
      </div>
      
      {selectedExpiry !== null && (
        <div className="flex items-start space-x-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">{t('features.autoDelete.warning')}</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <Button
          onClick={onCancel}
          variant="outline"
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={() => onConfirm(selectedExpiry)}
        >
          {t('common.confirm')}
        </Button>
      </div>
    </div>
  );
};