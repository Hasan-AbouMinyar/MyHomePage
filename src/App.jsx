import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NewSkills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import GuestbookNotesWall from './components/GuestbookNotesWall';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Preloader from './components/Preloader';
import { isAdminPath } from './lib/supabaseApi';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    const handleScroll = () => {
      if (!mainEl) return;
      const totalHeight = mainEl.scrollHeight - mainEl.clientHeight;
      if (totalHeight === 0) return;
      const progress = mainEl.scrollTop / totalHeight;
      setScrollProgress(progress);
    };

    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isAdminPath()) {
    return <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 antialiased h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none relative">
        {/* Razor-thin scroll progress bar */}
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none">
          <div 
            className="h-full bg-zinc-900 dark:bg-white transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="snap-start h-screen w-full relative"><Hero darkMode={darkMode} /></div>
        <div className="snap-start"><About /></div>
        <div className="snap-start"><NewSkills /></div>
        <Projects />
        <div className="snap-start"><Education /></div>
        <div className="snap-start"><GuestbookNotesWall /></div>
        <div className="snap-start"><Contact /></div>
        <div className="snap-start"><Footer /></div>
      </main>
    </>
  );
}

export default App;
