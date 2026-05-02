import { Star } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useApp } from '../../context/AppContext';

// ─── Main page wrapper ─────────────────────────────────────────────────────
export default function CalcPage({
  icon: Icon,
  titleKey,
  descKey,
  tabs,
  activeTab,
  onTabChange,
  calcPrefix,
  children,
}) {
  const { t } = useLang();
  const { isFavorite, toggleFavorite } = useApp();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl bg-accent/10 text-accent shrink-0 mt-1">
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
            {t(titleKey)}
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1 transition-colors duration-200 line-clamp-2">
            {t(descKey)}
          </p>
        </div>
      </div>

      {/* Tab bar — horizontal scroll, no wrap */}
      {tabs && tabs.length > 0 && (
        <div className="flex overflow-x-auto gap-2 mb-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const favId = calcPrefix ? `${calcPrefix}-${tab.id}` : tab.id;
            const isActive = activeTab === tab.id;
            const starred = isFavorite(favId);
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={[
                  'flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent text-dark-bg'
                    : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent',
                ].join(' ')}
              >
                <span>{t(tab.labelKey)}</span>
                <span
                  role="button"
                  tabIndex={0}
                  title={starred ? t('removeFavorite') : t('addFavorite')}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(favId); }}
                  onKeyDown={(e) => e.key === 'Enter' && toggleFavorite(favId)}
                  className="ml-0.5 p-0.5 rounded hover:scale-125 transition-transform duration-150"
                >
                  <Star
                    size={12}
                    className={starred
                      ? 'fill-accent text-accent'
                      : isActive
                        ? 'fill-dark-bg/40 text-dark-bg/60'
                        : 'text-light-muted/50 dark:text-dark-muted/50'}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Two-column layout: md+ for tablets, single col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {children}
      </div>
    </div>
  );
}

// ─── InputPanel — left column ───────────────────────────────────────────────
export function InputPanel({ children, onReset }) {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 md:p-6 space-y-4 transition-colors duration-200">
      <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
        {t('inputs')}
      </h2>
      {children}
      <button
        onClick={onReset}
        className="w-full py-2 rounded-lg border border-light-border dark:border-dark-border text-sm font-medium text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
      >
        {t('reset')}
      </button>
    </div>
  );
}

// ─── ResultPanel — right column ─────────────────────────────────────────────
export function ResultPanel({ children }) {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 md:p-6 space-y-4 transition-colors duration-200">
      <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
        {t('result')}
      </h2>
      {children}
    </div>
  );
}

// ─── CalcCard — full-width card for multi-calc tabs ────────────────────────
export function CalcCard({ titleKey, children }) {
  const { t } = useLang();
  return (
    <div className="col-span-full rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 md:p-5 transition-colors duration-200">
      {titleKey && (
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white pb-3 mb-4 border-b border-light-border dark:border-dark-border transition-colors duration-200">
          {t(titleKey)}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

// ─── CardInputs — left side inside CalcCard ────────────────────────────────
export function CardInputs({ children, onReset }) {
  const { t } = useLang();
  return (
    <div className="space-y-3">
      {children}
      {onReset && (
        <button
          onClick={onReset}
          className="w-full py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-medium text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
        >
          {t('reset')}
        </button>
      )}
    </div>
  );
}

// ─── CardResults — right side inside CalcCard ──────────────────────────────
export function CardResults({ children }) {
  return <div className="space-y-3">{children}</div>;
}
