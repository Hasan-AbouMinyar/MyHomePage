import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const navItems = ["About", "Skills", "Projects", "Education", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-dark-start/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-full px-6">
        <a href="#" className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">Hasan Abouminyar</a>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
        <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
