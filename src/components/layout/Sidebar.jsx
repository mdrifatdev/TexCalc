import { NavLink } from 'react-router-dom';
import { Wind, Grid3x3, Layers, Droplets, Shirt, ClipboardCheck, Home } from 'lucide-react';
import { useLang } from '../../context/LangContext';

// Category nav items — add a new entry here to add a sidebar item
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
  const { t } = useLang();

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
      isActive
        ? 'border-l-4 border-accent text-accent bg-accent/10 pl-3'
        : 'border-l-4 border-transparent text-light-muted dark:text-dark-muted hover:text-slate-900 dark:hover:text-white hover:bg-light-border/50 dark:hover:bg-dark-border/50',
    ].join(' ');

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-60 flex flex-col',
          'bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border',
          'transition-transform duration-300 ease-in-out',
          // Desktop: always visible; Mobile: slide in/out
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:h-auto lg:z-auto',
        ].join(' ')}
      >
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ path, labelKey, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={linkClass}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{t(labelKey) || labelKey}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
