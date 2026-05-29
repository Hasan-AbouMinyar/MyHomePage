import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import lpaImage from '../assets/lpa.jpeg';
import ufsImage from '../assets/UFS.png';

const ImageShowcase = ({ src, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="w-full relative rounded-xl border border-zinc-150 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] aspect-[16/10] group cursor-pointer"
    >
      <img 
        src={src} 
        alt={title} 
        className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 group-hover:scale-105" 
      />
    </motion.div>
  );
};

const Projects = () => {
  const { t, lang } = useLanguage();
  const projects = t('projects.items') || [];
  const projectImages = [lpaImage, ufsImage];
  const projectUrls = ["lpa.gov.ly", "hrms.police.gov.ly"];
  const projectLabels = ["01 / ENTERPRISE SYSTEM", "02 / ON-PREMISE APPLICATION"];

  return (
    <div id="projects" className="w-full bg-white dark:bg-black transition-colors duration-300">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={index}
            className="min-h-screen lg:h-screen w-full flex items-center justify-center snap-start relative bg-white dark:bg-black px-6 md:px-12 lg:px-24 py-20 lg:py-0 border-b border-zinc-100 dark:border-zinc-900 last:border-b-0"
          >
            <div className={`container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16 h-full ${
              isEven ? '' : 'lg:flex-row-reverse'
            }`}>
              
              {/* Text Narrative Column */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-[38%] xl:w-[35%] flex flex-col justify-center text-left rtl:text-right"
              >
                <span className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-4 block">
                  {projectLabels[index]}
                </span>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-tight mb-4 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Numbered Accomplishments Grid */}
                <div className="space-y-5 mb-8">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <span className="text-sm font-semibold font-mono text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-250 leading-none select-none">
                        {lang === 'ar' ? `٠${i + 1}` : `0${i + 1}`}
                      </span>
                      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Outlined Tech Tags (Classic separator style instead of capsules) */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-mono text-zinc-400 dark:text-zinc-500 select-none">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="flex items-center">
                      {tag}
                      {i < project.tags.length - 1 && <span className="mx-2 text-zinc-200 dark:text-zinc-800 font-sans">·</span>}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Showcase Image Column */}
              <div className="w-full lg:w-[62%] xl:w-[65%] flex items-center justify-center">
                <ImageShowcase
                  src={projectImages[index]}
                  title={project.title}
                />
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Projects;
