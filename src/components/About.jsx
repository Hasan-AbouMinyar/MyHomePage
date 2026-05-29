import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-8">{t('about.title')}</h2>
            <div className="space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              <p className="text-justify leading-relaxed">
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
