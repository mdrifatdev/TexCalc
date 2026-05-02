import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLang } from '../../context/LangContext';

// ResultCard — displays a single calculated result with copy functionality
export default function ResultCard({ label, value, unit }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [pop, setPop] = useState(false);

  // Trigger pop animation whenever value changes to a valid result
  useEffect(() => {
    if (value === null || value === undefined || value === '' || value === '—') return;
    setPop(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPop(true));
    });
    const timer = setTimeout(() => setPop(false), 350);
    return () => { cancelAnimationFrame(id); clearTimeout(timer); };
  }, [value]);

  const handleCopy = () => {
    if (value === null || value === undefined || value === '') return;
    navigator.clipboard.writeText(String(value)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const displayValue =
    value !== null && value !== undefined && value !== ''
      ? typeof value === 'number'
        ? isFinite(value) ? value.toFixed(3) : '—'
        : value
      : '—';

  return (
    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-4 flex items-center justify-between gap-3 transition-colors duration-200">
      <div>
        <p className="text-xs text-light-muted dark:text-dark-muted mb-1 transition-colors duration-200">
          {label}
        </p>
        <p
          className={[
            'text-2xl font-semibold text-accent transition-colors duration-200 inline-block',
            pop ? 'animate-pop' : '',
          ].join(' ')}
        >
          {displayValue}
          {unit && (
            <span className="text-sm font-normal text-light-muted dark:text-dark-muted ml-1.5">
              {unit}
            </span>
          )}
        </p>
      </div>

      <button
        onClick={handleCopy}
        title={copied ? t('copied') : t('copy')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-xs text-light-muted dark:text-dark-muted hover:text-accent hover:border-accent transition-all duration-200 shrink-0"
      >
        {copied ? (
          <>
            <Check size={13} className="text-green-500" />
            <span className="text-green-500">{t('copied')}</span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span>{t('copy')}</span>
          </>
        )}
      </button>
    </div>
  );
}
