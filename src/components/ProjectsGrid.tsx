import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';
import styles from '../styles/ProjectsGrid.module.css';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Front-end', 'Back-end', 'Full-stack', 'Segurança'];

  return (
    <section id="projects" className="container">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>Meus Projetos</h2>
      
      <div className={styles.filters}>
        {filters.map(filter => (
          <button
            key={filter}
            className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;