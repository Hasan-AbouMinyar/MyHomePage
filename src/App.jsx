import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import NewSkills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 antialiased h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="snap-start h-screen w-full relative"><Hero darkMode={darkMode} /></div>
      <div className="snap-start"><About /></div>
      <div className="snap-start"><NewSkills /></div>
      <Projects />
      <div className="snap-start"><Education /></div>
      <div className="snap-start"><Contact /></div>
      <div className="snap-start"><Footer /></div>
    </main>
  );
}

export default App;
