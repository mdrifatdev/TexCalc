import { Sun, Moon, Layers, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';

// Navbar — sticky top bar with logo, language toggle, theme toggle, hamburger
export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang } = useLang();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 h-16 bg-light-surface/80 dark:bg-dark-surface/80 border-b border-light-border dark:border-dark-border backdrop-blur-md transition-colors duration-200">
      {/* Left: hamburger (mobile) + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-accent transition-colors duration-200"
          aria-label={t('menu')}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-dark-bg">
            <Layers size={16} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-200">
            {t('appName')}
          </span>
        </div>
      </div>

      {/* Right: lang toggle + theme toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
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
