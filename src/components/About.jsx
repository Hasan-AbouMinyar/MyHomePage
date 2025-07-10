import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-gray-50 dark:bg-gradient-to-br from-dark-start via-dark-mid to-dark-end text-gray-800 dark:text-gray-200 flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">About Me</h2>
            <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              <p>
                Passionate and creative software developer with extensive and diverse experience in building full-fledged web and mobile applications using the latest technologies and frameworks.
              </p>
              <p>
                Skilled in working on projects that combine front-end and back-end development, and passionate about transforming ideas into practical software solutions that meet user needs and support digital growth for individuals and businesses.
              </p>
              <p className="text-gray-500 dark:text-gray-400 italic">
                I believe programming is not just writing code but an artistic craft that requires a blend of skill, logical thinking, and a bit of magic!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
