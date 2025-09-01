import React from 'react';
import styles from '../styles/ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
  max: number;
  height?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  max,
  height = 12,
  showPercentage = true,
  showLabel = false,
  label,
  color = 'primary',
  animated = true,
  className = ''
}) => {
  const percentage = max > 0 ? (progress / max) * 100 : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`${styles.progressBarContainer} ${className}`}>
      {(showLabel || label) && (
        <div className={styles.progressLabels}>
          <span className={styles.label}>
            {label || `Progresso: ${progress}/${max}`}
          </span>
          {showPercentage && (
            <span className={styles.percentage}>
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={styles.progressBar} 
        style={{ height: `${height}px` }}
      >
        <div 
          className={`${styles.progressFill} ${styles[color]} ${animated ? styles.animated : ''}`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {animated && <div className={styles.progressAnimation}></div>}
        </div>
      </div>

      {!showLabel && !label && showPercentage && (
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            {progress}/{max}
          </span>
          <span className={styles.percentage}>
            {Math.round(clampedPercentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;