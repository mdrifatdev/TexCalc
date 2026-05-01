// CalcPage — shared wrapper for all calculator pages
// Provides: page header, tab bar, and two-column input/result layout

import { useLang } from '../../context/LangContext';

export default function CalcPage({ icon: Icon, titleKey, descKey, tabs, activeTab, onTabChange, children }) {
  const { t } = useLang();
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent shrink-0 mt-1">
          <Icon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
            {t(titleKey)}
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1 transition-colors duration-200">
            {t(descKey)}
          </p>
        </div>
      </div>

      {/* Tab bar */}
      {tabs && tabs.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-accent text-dark-bg'
                  : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent',
              ].join(' ')}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
      )}

      {/* Two-column layout: inputs | results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

// InputPanel — left column
export function InputPanel({ children, onReset }) {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 space-y-4 transition-colors duration-200">
      <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-2 transition-colors duration-200">
        {t('inputs')}
      </h2>
      {children}
      <button
        onClick={onReset}
        className="mt-2 w-full py-2 rounded-lg border border-light-border dark:border-dark-border text-sm font-medium text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200"
      >
        {t('reset')}
      </button>
    </div>
  );
}

// ResultPanel — right column
export function ResultPanel({ children }) {
  const { t } = useLang();
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 space-y-4 transition-colors duration-200">
      <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-2 transition-colors duration-200">
        {t('result')}
      </h2>
      {children}
    </div>
  );
}
