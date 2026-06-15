import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const navItems = [
    { id: "about", key: "nav.about" },
    { id: "skills", key: "nav.skills" },
    { id: "projects", key: "nav.projects" },
    { id: "education", key: "nav.education" },
    { id: "guestbook", key: "nav.guestbook" },
    { id: "contact", key: "nav.contact" }
  ];

  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Intersection Observer for scroll spy (Active section tracking)
  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "education", "guestbook", "contact"];
    const allIds = ["hero", ...sectionIds];
    
    const observerOptions = {
      root: document.querySelector('main') || null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "hero") {
            setActiveSection("");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto h-full px-6 flex justify-between items-center max-w-6xl">
        {/* Name / Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "hero")}
          className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white hover:opacity-75 transition-opacity select-none"
        >
          {t('name')}
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 select-none ${
                  isActive 
                    ? 'text-zinc-900 dark:text-white' 
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t(item.key)}
                {/* Thin bottom line indicator for active section */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-zinc-900 dark:bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-5">
          {/* Language Toggle (Minimal Text) */}
          <button 
            onClick={toggleLanguage} 
            className="text-[11px] font-bold tracking-wider text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 select-none"
            title={lang === 'en' ? 'العربية' : 'English'}
          >
            {lang === 'en' ? 'العربية' : 'ENGLISH'}
          </button>

          {/* Theme Toggle (Clean Icon) */}
          <button 
            onClick={toggleDarkMode} 
            className="text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-white transition-colors duration-200 p-1 flex items-center justify-center"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4.5 h-4.5" />}
          </button>

          {/* Mobile Hamburger Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1 w-5 justify-center items-center">
              <span className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-zinc-150 dark:border-zinc-900 bg-white/95 dark:bg-black/95 backdrop-blur-md py-4 px-6 flex flex-col gap-3 md:hidden shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-2 text-sm font-medium transition-colors select-none ${
                  isActive
                    ? 'text-zinc-900 dark:text-white font-semibold'
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
