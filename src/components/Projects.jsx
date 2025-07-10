import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sbidroImage from '../assets/sbidro.png'; // استيراد الصورة
import tatawoeImage from '../assets/tatawoe.png'; // استيراد صورة مشروع تاتاوو
import rkunImage from '../assets/rkun.png'; // استيراد صورة مشروع ركون

// مكون الأكورديون الفرعي
const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pt-4 text-lg text-gray-600 dark:text-gray-300">
          {content}
        </div>
      </motion.div>
    </div>
  );
};


const Projects = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const sbidroFeatures = [
    {
      title: "A Unique Shopping Experience",
      content: "Enjoy fast performance and smooth Browse with a modern interface designed for you."
    },
    {
      title: "Easy Management",
      content: "Easily organize your favorites, track your orders, and pay securely in a few simple steps."
    },
    {
      title: "Stay Updated",
      content: "Turn on notifications to be the first to know about new arrivals and exclusive offers."
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-gray-100 dark:bg-gradient-to-br from-dark-start via-dark-mid to-dark-end py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* قسم مشروع Sbidro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">My Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Here's a selection of projects I've worked on. Each one presented unique challenges and opportunities for growth, from e-commerce solutions to community-driven platforms.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          {/* الجانب الأيسر: الأكورديون */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Sbidro</h3>
            {sbidroFeatures.map((feature, index) => (
              <AccordionItem 
                key={index}
                title={feature.title}
                content={feature.content}
                isOpen={openAccordion === index}
                onToggle={() => setOpenAccordion(openAccordion === index ? -1 : index)}
              />
            ))}
          </motion.div>

          {/* الجانب الأيمن: الصورة */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
          >
            <img src={sbidroImage} alt="Sbidro App" className="rounded-2xl shadow-2xl w-full h-auto object-contain" />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 dark:border-gray-700 my-24"></div>

        {/* قسم مشروع تاتاوو */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tatawoe: Volunteer Simply. Make an Impact.
          </h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover volunteer opportunities near you and be part of a positive change.
            Browse events, apply with a single tap, and easily manage all your activities.
            Connect with organizations, rate your experience, and build your volunteer profile.
            Join a community of changemakers.
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={tatawoeImage}
              alt="Tatawoe Project"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-b border-gray-200 dark:border-gray-700 my-24"></div>

        {/* قسم مشروع ركون */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Rkun: Your Business in Your Pocket
          </h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Manage your entire business from one simple, powerful dashboard.
            Track sales, monitor inventory, and manage customers and suppliers with ease.
            Get real-time insights and key stats to make smarter, data-driven decisions.
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={rkunImage}
              alt="Rkun Project"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
