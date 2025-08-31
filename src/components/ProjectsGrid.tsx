import React, { useMemo } from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';
import styles from '../styles/ProjectsGrid.module.css';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = React.useState('Todos');

  const filters = ['Todos', 'Front-end', 'Back-end', 'Full-stack', 'Segurança', 'Mobile', 'Pesquisa'];

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year); 
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') {
      return sortedProjects;
    }

    return sortedProjects.filter(project => {
      switch (activeFilter) {
        case 'Front-end':
          return project.tags.some(tag => 
            ['HTML', 'CSS', 'JavaScript', 'React.js', 'React Native'].includes(tag)
          );
        case 'Back-end':
          return project.tags.some(tag => 
            ['Python', 'Django', 'SQLite3'].includes(tag)
          );
        case 'Full-stack':
          const hasFrontend = project.tags.some(tag => 
            ['HTML', 'CSS', 'JavaScript', 'React.js', 'React Native'].includes(tag)
          );
          const hasBackend = project.tags.some(tag => 
            ['Python', 'Django', 'SQLite3'].includes(tag)
          );
          return hasFrontend && hasBackend;
        case 'Segurança':
          return project.tags.some(tag => 
            ['Criptografia', 'Segurança', 'AES', 'Diffie-Hellman'].includes(tag)
          );
        case 'Mobile':
          return project.tags.some(tag => 
            ['React Native', 'Mobile'].includes(tag)
          );
        case 'Pesquisa':
          return project.tags.some(tag => 
            ['Pesquisa', 'Acadêmico', 'Normas ABNT'].includes(tag)
          );
        default:
          return true;
      }
    });
  }, [sortedProjects, activeFilter]);

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

      <div className={styles.projectCount}>
        {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
        {activeFilter !== 'Todos' && ` em "${activeFilter}"`}
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.noProjects}>
          <i className="fas fa-search"></i>
          <p>Nenhum projeto encontrado para o filtro selecionado.</p>
          <button 
            className={styles.clearFilterBtn}
            onClick={() => setActiveFilter('Todos')}
          >
            Limpar filtro
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;