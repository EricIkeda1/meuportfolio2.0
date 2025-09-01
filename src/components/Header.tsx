import React from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <i className="fab fa-typescript"></i>
            <span>EIPortfolio</span>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Início</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projetos</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contato</a></li>
          </ul>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;