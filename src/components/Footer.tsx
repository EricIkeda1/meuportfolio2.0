import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <h3>Entre em Contato</h3>
        <p>Estou disponível para oportunidades e colaborações em projetos TypeScript e desenvolvimento full-stack.</p>
        
        <div className={styles.socialLinks}>
          <a 
            href="https://github.com/EricIkeda1" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Visite meu GitHub"
          >
            <i className="fab fa-github"></i>
            <span className={styles.socialText}>GitHub</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/eric-ikeda/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Visite meu LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
            <span className={styles.socialText}>LinkedIn</span>
          </a>

          <a 
            href="https://ericikedablogportfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Visite meu Portfolio"
          >
            <i className="fas fa-briefcase"></i>
            <span className={styles.socialText}>Portfolio</span>
          </a>

          <a 
            href="mailto:seu-email@exemplo.com" 
            className={styles.socialLink}
            aria-label="Envie-me um e-mail"
          >
            <i className="fas fa-envelope"></i>
            <span className={styles.socialText}>E-mail</span>
          </a>
        </div>

        <div className={styles.footerInfo}>
          <p>© {currentYear} Eric Ikeda. Todos os direitos reservados.</p>
          <p className={styles.madeWith}>
            Desenvolvido usando React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;