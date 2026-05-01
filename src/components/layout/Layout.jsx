import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLang } from '../../context/LangContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200 font-sans">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0 p-4 md:p-8 lg:ml-60">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="lg:ml-60 border-t border-light-border dark:border-dark-border transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-light-muted dark:text-dark-muted">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
            <span>{t('footerDev')}</span>
            <span className="hidden sm:inline opacity-30">·</span>
            <a
              href="https://github.com/mdrifatdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              {t('footerGithub')}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span>{t('footerMade')}</span>
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
              {t('footerVersion')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
