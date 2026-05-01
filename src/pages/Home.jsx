import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind, Grid3x3, Layers, Droplets, Shirt, ClipboardCheck, Search, X, Clock, Star, Trash2 } from 'lucide-react';
import CategoryCard from '../components/ui/CategoryCard';
import { useLang } from '../context/LangContext';
import { useApp } from '../context/AppContext';
import { ALL_CALCULATORS } from '../utils/calculators';

const CATEGORIES = [
  { icon: Wind,          titleKey: 'spinning', descKey: 'spinningDesc', path: '/spinning' },
  { icon: Grid3x3,       titleKey: 'weaving',  descKey: 'weavingDesc',  path: '/weaving'  },
  { icon: Layers,        titleKey: 'knitting', descKey: 'knittingDesc', path: '/knitting' },
  { icon: Droplets,      titleKey: 'dyeing',   descKey: 'dyeingDesc',   path: '/dyeing'   },
  { icon: Shirt,         titleKey: 'garments', descKey: 'garmentsDesc', path: '/garments' },
  { icon: ClipboardCheck,titleKey: 'ttqc',     descKey: 'ttqcDesc',     path: '/ttqc'     },
];

const CATEGORY_BN = { spinning:'স্পিনিং', weaving:'উইভিং', knitting:'নিটিং', dyeing:'ডাইং', garments:'গার্মেন্টস', ttqc:'টিটিকিউসি' };

export default function Home() {
  const { t, lang } = useLang();
  const { history, clearHistory, favorites, isFavorite } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const searchResults = query.trim().length > 0
    ? ALL_CALCULATORS.filter((c) => {
        const q = query.toLowerCase();
        return c[lang === 'bn' ? 'bn' : 'en'].toLowerCase().includes(q) || c.category.includes(q);
      })
    : [];

  const favCalcs = favorites
    .map((id) => ALL_CALCULATORS.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 dark:from-accent/10" />
        <div className="relative px-6 py-12 md:px-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            {t('heroNote')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-200">
            {t('heroTitle')}
          </h1>
          <p className="text-light-muted dark:text-dark-muted max-w-xl text-base mb-6 transition-colors duration-200">
            {t('heroSubtitle')}
          </p>

          {/* Search bar — mobile-friendly inline version */}
          <div className="relative max-w-md sm:hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur">
              <Search size={16} className="text-light-muted dark:text-dark-muted shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-light-muted dark:placeholder-dark-muted outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')}><X size={14} className="text-light-muted dark:text-dark-muted" /></button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Inline search results (mobile only / when query present) ─────────── */}
      {query.trim().length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-3">
            {t('searchPlaceholder').replace('…', '')} — "{query}"
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {searchResults.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(c.page, { state: { tab: c.tabId } })}
                  className="flex items-center gap-3 p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-accent transition-all duration-200 text-left"
                >
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium capitalize shrink-0">
                    {lang === 'bn' ? CATEGORY_BN[c.category] : c.category}
                  </span>
                  <span className="text-sm text-slate-900 dark:text-white">{c[lang === 'bn' ? 'bn' : 'en']}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-light-muted dark:text-dark-muted">{t('noResults')}</p>
          )}
        </div>
      )}

      {/* ── Favourites ────────────────────────────────────────────────────────── */}
      {favCalcs.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star size={12} className="fill-accent text-accent" />
            {t('favoritesTitle')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {favCalcs.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(c.page, { state: { tab: c.tabId } })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/40 bg-accent/5 text-sm text-accent hover:bg-accent/10 transition-all duration-200"
              >
                <Star size={12} className="fill-accent" />
                {c[lang === 'bn' ? 'bn' : 'en']}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent History ────────────────────────────────────────────────────── */}
      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider flex items-center gap-2">
              <Clock size={12} />
              {t('historyTitle')}
            </h2>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-light-muted dark:text-dark-muted hover:text-accent transition-colors duration-200"
            >
              <Trash2 size={12} />
              {t('clearHistory')}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.slice(0, 6).map((h) => (
              <button
                key={h.id}
                onClick={() => navigate(h.page, { state: { tab: h.tabId } })}
                className="text-left p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-accent transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium capitalize">
                    {lang === 'bn' ? CATEGORY_BN[h.category] || h.category : h.category}
                  </span>
                  <span className="text-[10px] text-light-muted dark:text-dark-muted">{h.time}</span>
                </div>
                <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{h.calcName}</p>
                <p className="text-lg font-bold text-accent mt-1 truncate">
                  {h.resultValue} <span className="text-xs font-normal text-light-muted dark:text-dark-muted">{h.resultUnit}</span>
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Category grid — 2 col mobile, 3 col desktop (fix #4) ─────────────── */}
      <div>
        <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-4 transition-colors duration-200">
          {t('categoriesTitle')}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.path}
              icon={cat.icon}
              title={t(cat.titleKey)}
              description={t(cat.descKey)}
              path={cat.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
