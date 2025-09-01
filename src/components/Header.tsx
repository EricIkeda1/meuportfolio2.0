import React, { useState } from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Pesquisando por:', searchQuery);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <i className="fab fa-typescript"></i>
            <span>TS Portfolio</span>
          </div>

          <ul className={styles.navLinks}>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Início</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projetos</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contato</a></li>
          </ul>

          <div className={styles.navActions}>
            <form 
              className={`${styles.searchForm} ${showSearch ? styles.active : ''}`} 
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus={showSearch}
              />
              <button type="submit" className={styles.searchSubmit}>
                <i className="fas fa-search"></i>
              </button>
            </form>

            <button 
              className={styles.searchToggle} 
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <i className="fas fa-search"></i>
            </button>

            <button className={styles.themeToggle} onClick={toggleTheme}>
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
