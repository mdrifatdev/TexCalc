import { X } from 'lucide-react';

// InputField — reusable labeled input with optional unit badge
export default function InputField({ label, value, onChange, unit, placeholder, type = 'number' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-light-muted dark:text-dark-muted transition-colors duration-200">
        {label}
      </label>
      <div className="flex items-center rounded-lg overflow-hidden border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg transition-colors duration-200 focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '0'}
          className="flex-1 px-4 py-2.5 bg-transparent text-slate-900 dark:text-white placeholder-light-muted dark:placeholder-dark-muted text-sm outline-none transition-colors duration-200"
        />
        {value !== undefined && value !== null && value !== '' && onChange && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 mr-2 rounded-full text-light-muted/60 dark:text-dark-muted/60 hover:text-accent dark:hover:text-accent hover:bg-light-border/40 dark:hover:bg-dark-border/40 transition-all duration-200 shrink-0"
            title="Clear"
          >
            <X size={13} />
          </button>
        )}
        {unit && (
          <span className="px-3 py-2.5 bg-light-border dark:bg-dark-border text-light-muted dark:text-dark-muted text-xs font-medium border-l border-light-border dark:border-dark-border whitespace-nowrap transition-colors duration-200">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
