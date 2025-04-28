import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { showToast } from '../../utils/toast';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would send the form data to your backend or email service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast(t('modals.contact.success'), 'success');
      onClose();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showToast(t('modals.contact.error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modals.contact.title')}>
      <div className="flex items-center gap-4 mb-6 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
        <Mail className="w-6 h-6 text-primary-400" />
        <p className="text-gray-300">{t('modals.contact.description')}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('modals.contact.name')}
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          
          <Input
            label={t('modals.contact.email')}
            type="email"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        
        <Input
          label={t('modals.contact.subject')}
          type="text"
          value={formData.subject}
          onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          required
        />
        
        <Textarea
          label={t('modals.contact.message')}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={5}
          required
        />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t('modals.contact.cancel')}
          </Button>
          
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            icon={<Mail className="w-4 h-4" />}
          >
            {isSubmitting ? t('modals.contact.sending') : t('modals.contact.send')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};