import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Layers, Menu, X, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { ALL_CALCULATORS } from '../../utils/calculators';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang, lang } = useLang();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const searchRef = useRef(null);

  // Filter calculators by query
  const results = query.trim().length > 0
    ? ALL_CALCULATORS.filter((c) => {
        const q = query.toLowerCase();
        return (
          c[lang === 'bn' ? 'bn' : 'en'].toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (calc) => {
    setQuery('');
    setShowDrop(false);
    navigate(calc.page, { state: { tab: calc.tabId } });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 px-4 md:px-6 h-16 bg-light-surface/90 dark:bg-dark-surface/90 border-b border-light-border dark:border-dark-border backdrop-blur-md transition-colors duration-200">
      {/* Hamburger (mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-accent transition-colors duration-200"
        aria-label={t('menu')}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-dark-bg">
          <Layers size={16} strokeWidth={2.5} />
        </div>
        <span className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-200">
          {t('appName')}
        </span>
      </div>

      {/* Search bar */}
      <div ref={searchRef} className="relative flex-1 max-w-sm hidden sm:block">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg transition-colors duration-200 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30">
          <Search size={15} className="text-light-muted dark:text-dark-muted shrink-0" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowDrop(true); }}
            onFocus={() => setShowDrop(true)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-light-muted dark:placeholder-dark-muted outline-none"
          />
          {query && (
            <button onClick={() => { setQuery(''); setShowDrop(false); }}>
              <X size={13} className="text-light-muted dark:text-dark-muted hover:text-accent" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDrop && query.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-xl overflow-hidden z-50">
            {results.length > 0 ? (
              results.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-light-bg dark:hover:bg-dark-bg transition-colors duration-150"
                >
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium capitalize">
                    {lang === 'bn' ? { spinning:'স্পিনিং', weaving:'উইভিং', knitting:'নিটিং', dyeing:'ডাইং', garments:'গার্মেন্টস', ttqc:'টিটিকিউসি' }[c.category] : c.category}
                  </span>
                  <span className="text-slate-900 dark:text-white">{c[lang === 'bn' ? 'bn' : 'en']}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-light-muted dark:text-dark-muted">
                {t('noResults')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: lang + theme */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
        >
          {t('langToggle')}
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
