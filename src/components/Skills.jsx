import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const NewSkills = () => {
  const { lang, t } = useLanguage();

  const technicalSkills = t('skills.techList') || [];
  const softSkills = t('skills.soft') || [];

  return (
    <section id="skills" className="min-h-screen bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 py-24 sm:py-32 flex items-center justify-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 lg:px-8 max-w-6xl"
      >
        
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-3">
            {t('skills.title') ? 'CAPABILITIES' : ''}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t('skills.title')}
          </h2>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          
          {/* Left Column: Technical Skills (Borderless divider list) */}
          <div className="md:col-span-7 space-y-8">
            <h3 className="text-sm font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase pb-2 border-b border-zinc-100 dark:border-zinc-900">
              {t('skills.techTitle')}
            </h3>
            <div className="space-y-8">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="pb-8 border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
                >
                  <h4 className="text-lg font-medium text-zinc-900 dark:text-white mb-2.5">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Soft Skills (Borderless, pure typography list) */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="text-sm font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase pb-2 border-b border-zinc-100 dark:border-zinc-900">
              {t('skills.softTitle')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  {/* Elegant, clean bullet dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 select-none">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};

export default NewSkills;
