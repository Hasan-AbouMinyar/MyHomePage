import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from './ContactForm';

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
    <footer className="w-full border-t border-zinc-100 bg-white py-14 text-zinc-400 transition-colors duration-300 dark:border-zinc-900 dark:bg-black dark:text-zinc-500 md:py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {t('footer.formEyebrow')}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              {t('footer.formTitle')}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {t('footer.formSubtitle')}
            </p>
          </div>

          <ContactForm />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-8 text-center text-xs font-medium select-none dark:border-zinc-900 sm:flex-row sm:text-start">
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
      </div>
    </footer>
  );
};

export default Footer;
