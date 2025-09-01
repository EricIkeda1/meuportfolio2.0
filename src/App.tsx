import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import Footer from './components/Footer';
import { projectsData } from './data/projects'; 
import { AchievementProvider } from './context/AchievementContext';
import AchievementSystem from './components/AchievementSystem';
import './styles/globals.css';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <AchievementProvider>
      <div className="App">
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Hero />
        <ProjectsGrid projects={projectsData} /> 
        <Footer />
        <AchievementSystem />
      </div>
    </AchievementProvider>
  );
};

export default App;