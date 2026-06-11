/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

const HISTORY_KEY = 'texcalc-history';
const FAVS_KEY    = 'texcalc-favorites';
const MAX_HISTORY = 10;

export function AppProvider({ children }) {
  // ── History ────────────────────────────────────────────────────────────────
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  });

  // entry = { calcId, calcName, category, page, tabId, resultLabel, resultValue, resultUnit }
  const addHistory = useCallback((entry) => {
    setHistory((prev) => {
      const next = [
        { ...entry, id: Date.now(), time: new Date().toLocaleTimeString() },
        ...prev,
      ].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  // ── Favourites ────────────────────────────────────────────────────────────
  // A favourite is identified by calcId (e.g. 'sp-count')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(FAVS_KEY)) || []; }
    catch { return []; }
  });

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return (
    <AppContext.Provider
      value={{ history, addHistory, clearHistory, favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
