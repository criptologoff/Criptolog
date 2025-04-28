import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en';
import translationIT from './locales/it';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      it: {
        translation: translationIT
      }
    },
    lng: 'it',
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;