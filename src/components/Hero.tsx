import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero} id="home">
      <div className="container">
        <h1>Portfólio de Projetos TypeScript</h1>
        <div className="typescript-badge">
          <i className="fab fa-typescript"></i> TypeScript
        </div>
        <p>Uma coleção de projetos desenvolvidos em TypeScript, demonstrando boas práticas, padrões de design e soluções inovadoras.</p>
      </div>
    </section>
  );
};

export default Hero;