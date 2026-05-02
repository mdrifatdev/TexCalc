import { NavLink, useNavigate } from 'react-router-dom';
import { Wind, Grid3x3, Layers, Droplets, Shirt, ClipboardCheck, Home, Star } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useApp } from '../../context/AppContext';
import { ALL_CALCULATORS } from '../../utils/calculators';

const navItems = [
  { path: '/',         labelKey: 'home',     icon: Home },
  { path: '/spinning', labelKey: 'spinning', icon: Wind },
  { path: '/weaving',  labelKey: 'weaving',  icon: Grid3x3 },
  { path: '/knitting', labelKey: 'knitting', icon: Layers },
  { path: '/dyeing',   labelKey: 'dyeing',   icon: Droplets },
  { path: '/garments', labelKey: 'garments', icon: Shirt },
  { path: '/ttqc',     labelKey: 'ttqc',     icon: ClipboardCheck },
];

export default function Sidebar({ open, onClose }) {
  const { t, lang } = useLang();
  const { favorites } = useApp();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
      isActive
        ? 'border-l-4 border-accent text-accent bg-accent/10 pl-3'
        : 'border-l-4 border-transparent text-light-muted dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-light-border/50 dark:hover:bg-dark-border/50',
    ].join(' ');

  const favCalcs = favorites
    .map((id) => ALL_CALCULATORS.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar — always fixed, visible on lg+ via lg:translate-x-0 */}
      <aside
        className={[
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-60 flex flex-col',
          'bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border',
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Main nav */}
        <nav className="overflow-y-auto py-4 px-3 space-y-1 flex-1">
          {navItems.map(({ path, labelKey, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={linkClass}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{t(labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Favourites section */}
        {favCalcs.length > 0 && (
          <div className="border-t border-light-border dark:border-dark-border px-3 py-4 shrink-0 max-h-52 overflow-y-auto">
            <p className="text-[10px] font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-2 px-1">
              {t('favoritesTitle')}
            </p>
            <div className="space-y-1">
              {favCalcs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    navigate(c.page, { state: { tab: c.tabId } });
                    onClose();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-light-muted dark:text-dark-muted hover:text-accent hover:bg-accent/10 transition-all duration-200"
                >
                  <Star size={11} className="fill-accent text-accent shrink-0" />
                  <span className="truncate">{c[lang === 'bn' ? 'bn' : 'en']}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
