import Toastify from 'toastify-js';
import { useTranslation } from 'react-i18next';

type ToastType = 'info' | 'success' | 'error' | 'warning';

export function showToast(message: string, type: ToastType = 'info', duration = 3000) {
  const getBackgroundColor = (toastType: string) => {
    switch(toastType) {
      case 'success': return '#10b981'; // Green
      case 'error': return '#ef4444'; // Red
      case 'warning': return '#f59e0b'; // Yellow
      case 'info':
      default: return '#3b82f6'; // Blue
    }
  };
  
  Toastify({
    text: message,
    duration: duration,
    gravity: 'top',
    position: 'right',
    backgroundColor: getBackgroundColor(type),
    className: 'rounded-md',
    stopOnFocus: true
  }).showToast();
}

export function useToast() {
  const { t } = useTranslation();
  
  return {
    info: (message: string, duration?: number) => 
      showToast(t(message, { defaultValue: message }), 'info', duration),
    success: (message: string, duration?: number) => 
      showToast(t(message, { defaultValue: message }), 'success', duration),
    error: (message: string, duration?: number) => 
      showToast(t(message, { defaultValue: message }), 'error', duration),
    warning: (message: string, duration?: number) => 
      showToast(t(message, { defaultValue: message }), 'warning', duration)
  };
}