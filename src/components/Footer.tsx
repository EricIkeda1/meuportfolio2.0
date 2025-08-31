import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <h3>Entre em Contato</h3>
        <p>Estou disponível para oportunidades e colaborações em projetos TypeScript.</p>
        <div className={styles.socialLinks}>
          <a href="#"><i className="fab fa-github"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fas fa-envelope"></i></a>
        </div>
        <p>© 2023 Portfólio TypeScript. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;