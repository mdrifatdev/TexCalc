import { useNavigate } from 'react-router-dom';

// CategoryCard — clickable card for the Home page category grid
export default function CategoryCard({ icon: Icon, title, description, path, delay = 0 }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="group text-left w-full rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 md:p-6 transition-all duration-250 hover:border-accent hover:shadow-[0_0_0_1px_#f59e0b,0_6px_28px_0_rgba(245,158,11,0.13)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-dark-bg transition-all duration-250 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-light-muted dark:text-dark-muted transition-colors duration-200 leading-relaxed">
        {description}
      </p>
    </button>
  );
}
