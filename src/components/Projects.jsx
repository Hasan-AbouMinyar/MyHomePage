import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import lpaImage from '../assets/lpa.jpeg';
import ufsImage from '../assets/UFS.png';

const ImageShowcase = ({ src, title }) => {
  return (
    <motion.div
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
  const projectLabels = ["01 / ENTERPRISE SYSTEM", "02 / ON-PREMISE APPLICATION"];

  return (
    <div id="projects" className="w-full bg-white dark:bg-black transition-colors duration-300">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={index}
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden border-b border-zinc-100 bg-white px-6 py-20 last:border-b-0 dark:border-zinc-900 dark:bg-black md:px-12 lg:h-screen lg:snap-start lg:px-24 lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`container mx-auto flex h-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* Text Narrative Column */}
              <div className="flex w-full flex-col justify-center text-left rtl:text-right lg:w-[38%] xl:w-[35%]">
                <span className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-4 block">
                  {projectLabels[index]}
                </span>
                
                <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>
                
                <p className="mb-7 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:mb-8 md:text-base">
                  {project.description}
                </p>

                {/* Numbered Accomplishments Grid */}
                <div className="mb-7 space-y-4 md:mb-8 md:space-y-5">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="group flex items-start gap-3 md:gap-4">
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
              </div>

              {/* Showcase Image Column */}
              <div className="flex w-full items-center justify-center lg:w-[62%] xl:w-[65%]">
                <ImageShowcase
                  src={projectImages[index]}
                  title={project.title}
                />
              </div>

            </motion.div>
          </section>
        );
      })}
    </div>
  );
};

export default Projects;
