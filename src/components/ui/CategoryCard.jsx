import { useNavigate } from 'react-router-dom';

// CategoryCard — clickable card for the Home page category grid
export default function CategoryCard({ icon: Icon, title, description, path }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="group text-left w-full rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 transition-all duration-200 hover:border-accent hover:shadow-[0_0_0_1px_#f59e0b,0_4px_24px_0_rgba(245,158,11,0.12)] focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-dark-bg transition-all duration-200">
        <Icon size={22} />
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-light-muted dark:text-dark-muted transition-colors duration-200">
        {description}
      </p>
    </button>
  );
}
