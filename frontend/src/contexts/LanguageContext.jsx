import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en';
import ml from '@/locales/ml';

const translations = { en, ml };

const LanguageContext = createContext();

// Safe localStorage access
const getStoredLanguage = () => {
  try {
    return localStorage.getItem('give2eat_language') || 'en';
  } catch {
    return 'en';
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('give2eat_language', language);
    } catch (e) {
      console.warn('localStorage not available');
    }
    // Update document language attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback to English if translation not found
    if (!value) {
      let fallback = translations['en'];
      for (const k of keys) {
        fallback = fallback?.[k];
      }
      return fallback || key;
    }
    
    return value;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
