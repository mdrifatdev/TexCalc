import { createContext, useContext, useState } from 'react';
import { translations } from '../utils/lang';

const LangContext = createContext(null);

const STORAGE_KEY = 'texcalc-lang';

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'bn'
  );

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'bn' ? 'en' : 'bn';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  // t(key) — returns the translated string for the current language
  const t = (key) => translations[lang]?.[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

// Custom hook for consuming language context
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
