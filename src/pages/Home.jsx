import { Wind, Grid3x3, Layers, Droplets, Shirt, ClipboardCheck } from 'lucide-react';
import CategoryCard from '../components/ui/CategoryCard';
import { useLang } from '../context/LangContext';

// Home page — hero + category grid
export default function Home() {
  const { t } = useLang();

  const categories = [
    {
      icon: Wind,
      titleKey: 'spinning',
      descKey: 'spinningDesc',
      path: '/spinning',
    },
    {
      icon: Grid3x3,
      titleKey: 'weaving',
      descKey: 'weavingDesc',
      path: '/weaving',
    },
    {
      icon: Layers,
      titleKey: 'knitting',
      descKey: 'knittingDesc',
      path: '/knitting',
    },
    {
      icon: Droplets,
      titleKey: 'dyeing',
      descKey: 'dyeingDesc',
      path: '/dyeing',
    },
    {
      icon: Shirt,
      titleKey: 'garments',
      descKey: 'garmentsDesc',
      path: '/garments',
    },
    {
      icon: ClipboardCheck,
      titleKey: 'ttqc',
      descKey: 'ttqcDesc',
      path: '/ttqc',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero section */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-dark-surface/50 to-transparent dark:from-accent/10 dark:via-dark-bg animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]" />
        <div className="relative px-6 py-12 md:px-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            {t('heroNote')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-200">
            {t('heroTitle')}
          </h1>
          <p className="text-light-muted dark:text-dark-muted max-w-xl text-base transition-colors duration-200">
            {t('heroSubtitle')}
          </p>
        </div>
      </div>

      {/* Categories section */}
      <div>
        <h2 className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-5 transition-colors duration-200">
          {t('categoriesTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
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
