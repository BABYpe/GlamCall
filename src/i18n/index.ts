import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import ruTranslations from './locales/ru.json';
import ptTranslations from './locales/pt.json';
import itTranslations from './locales/it.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';
import zhTranslations from './locales/zh.json';
import hiTranslations from './locales/hi.json';
import trTranslations from './locales/tr.json';
import nlTranslations from './locales/nl.json';
import svTranslations from './locales/sv.json';

const resources = {
  ar: { translation: arTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  ru: { translation: ruTranslations },
  pt: { translation: ptTranslations },
  it: { translation: itTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  zh: { translation: zhTranslations },
  hi: { translation: hiTranslations },
  tr: { translation: trTranslations },
  nl: { translation: nlTranslations },
  sv: { translation: svTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;