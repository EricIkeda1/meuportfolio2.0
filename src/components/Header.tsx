import React from 'react';
import styles from '../styles/Header.module.css';
import { useAchievements } from '../context/AchievementContext';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const { unlockAchievement } = useAchievements();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    unlockAchievement('theme_switcher');
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <i className="fab fa-react"></i>
            <span>EIPortfolio</span>
          </div>
          <ul className={styles.navLinks}>
            <li><a onClick={() => scrollToSection('home')}>Início</a></li>
            <li><a onClick={() => scrollToSection('projects')}>Projetos</a></li>
            <li><a onClick={() => scrollToSection('contact')}>Contato</a></li>
          </ul>
          <button className={styles.themeToggle} onClick={handleThemeToggle}>
            <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;