import React from 'react';
import ProgressBar from './ProgressBar';
import styles from '../styles/Achievement.module.css';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  hidden?: boolean;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  onClick?: () => void;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, onClick }) => {
  return (
    <div 
      className={`${styles.badge} ${achievement.unlocked ? styles.unlocked : styles.locked}`}
      onClick={onClick}
      title={achievement.unlocked ? achievement.description : 'Conquista bloqueada'}
    >
      <div className={styles.badgeIcon}>
        <i className={achievement.icon}></i>
        {achievement.unlocked && (
          <div className={styles.unlockedIndicator}>
            <i className="fas fa-check"></i>
          </div>
        )}
      </div>
      
      <div className={styles.badgeContent}>
        <span className={styles.badgeTitle}>{achievement.title}</span>
        <span className={styles.badgeDescription}>{achievement.description}</span>
        
        {!achievement.unlocked && (
          <div className={styles.badgeProgress}>
            <ProgressBar
              progress={achievement.progress}
              max={achievement.maxProgress}
              height={6}
              showPercentage={false}
              showLabel={false}
              color="primary"
              animated={true}
            />
            <span className={styles.progressText}>
              {achievement.progress}/{achievement.maxProgress}
            </span>
          </div>
        )}
        
        {achievement.unlocked && (
          <div className={styles.unlockedText}>
            <i className="fas fa-unlock"></i>
            Desbloqueado!
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;