import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { lang, t } = useLanguage();

  const scrollToTop = (e) => {
    e.preventDefault();
    const el = document.getElementById('hero') || document.querySelector('main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-black text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900 py-10 md:py-12 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium select-none">
        <p>
          &copy; {new Date().getFullYear()} {t('name')}. {t('footer.rights')}
        </p>
        <a 
          href="#hero"
          onClick={scrollToTop}
          className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1"
        >
          {lang === 'ar' ? 'الرجوع للأعلى ↑' : 'Back to top ↑'}
        </a>
      </div>
    </footer>
  );
};

export default Footer;