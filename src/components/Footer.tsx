import React from 'react';
import styles from '../styles/Footer.module.css';
import { useAchievements } from '../context/AchievementContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { incrementProgress } = useAchievements();

  const trackSocialClick = (achievementId: string) => {
    incrementProgress(achievementId);
    incrementProgress('social_butterfly');
  };

  const handleLinkClick = (url: string, achievementId: string) => {
    trackSocialClick(achievementId);
    window.open(url, '_blank');
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <h3>Entre em Contato</h3>
        
        <div className={styles.socialLinks}>
          <button 
            className={styles.socialLink}
            onClick={() => handleLinkClick('https://github.com/EricIkeda1', 'visit_github')}
          >
            <i className="fab fa-github"></i>
            <span className={styles.socialText}>GitHub</span>
          </button>

          <button 
            className={styles.socialLink}
            onClick={() => handleLinkClick('https://www.linkedin.com/in/ericikeda1/', 'visit_linkedin')}
          >
            <i className="fab fa-linkedin"></i>
            <span className={styles.socialText}>LinkedIn</span>
          </button>

          <button 
            className={styles.socialLink}
            onClick={() => handleLinkClick('https://ericikedablogportfolio.vercel.app/', 'visit_portfolio')}
          >
            <i className="fas fa-briefcase"></i>
            <span className={styles.socialText}>Portfolio</span>
          </button>

          <a 
            href="" 
            className={styles.socialLink}
          >
            <i className="fas fa-envelope"></i>
            <span className={styles.socialText}>E-mail</span>
          </a>
        </div>

        <div className={styles.footerInfo}>
          <p>© {currentYear} Eric Yuji Ikeda. Todos os direitos reservados.</p>
          <p className={styles.madeWith}>Desenvolvido usando React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;