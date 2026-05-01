import { useLang } from '../../context/LangContext';

// FormulaBox — displays the formula used in a styled monospace block
export default function FormulaBox({ formula }) {
  const { t } = useLang();
  return (
    <div className="mt-4 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-4 transition-colors duration-200">
      <p className="text-xs font-medium text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
        {t('formula')}
      </p>
      <pre className="text-sm font-mono text-accent whitespace-pre-wrap break-all leading-relaxed">
        {formula}
      </pre>
    </div>
  );
}
