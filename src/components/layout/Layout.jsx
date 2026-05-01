import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLang } from '../../context/LangContext';

// Layout — wraps all pages with Navbar + Sidebar + main content slot
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLang();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200 font-sans">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />

        {/* Main content — offset for sidebar on desktop */}
        <main className="flex-1 min-w-0 p-4 md:p-8 lg:ml-60">
          <Outlet />
        </main>
      </div>

      <footer className="py-6 border-t border-light-border dark:border-dark-border text-center text-xs text-light-muted dark:text-dark-muted lg:ml-60 transition-colors duration-200">
        {t('footerText')}
      </footer>
    </div>
  );
}
