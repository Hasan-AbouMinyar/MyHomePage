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
    <main className="bg-white dark:bg-black antialiased">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Hero />
      <About />
      <NewSkills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
