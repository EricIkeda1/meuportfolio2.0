import React from 'react';
import type { Project } from '../types';
import styles from '../styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImg}>
        <i className={project.icon}></i>
      </div>
      <div className={styles.projectContent}>
        <h3>{project.title}</h3>
        <span className={styles.projectYear}>{project.year}</span>
        <p>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.projectTag}>{tag}</span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              <i className="fab fa-github"></i> Ver Repositório
            </a>
          )}
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              <i className="fas fa-external-link-alt"></i> Acessar o Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;