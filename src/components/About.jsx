import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="flex min-h-screen flex-col justify-center overflow-hidden bg-white text-zinc-800 dark:bg-black dark:text-zinc-200">
      <div className="container mx-auto px-6 py-20 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:mb-8 sm:text-5xl">{t('about.title')}</h2>
            <div className="space-y-6 text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              <p className="text-start leading-relaxed sm:text-justify">
                {t('about.summary')}
              </p>
              <p className="text-zinc-400 dark:text-zinc-500 italic pt-6">
                {t('about.quote')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
