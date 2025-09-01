import React, { useState, useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';
import AchievementBadge from './AchievementBadge';
import ProgressBar from './ProgressBar';
import styles from '../styles/Achievement.module.css';

const AchievementSystem: React.FC = () => {
  const { achievements, unlockedAchievements, totalAchievements } = useAchievements();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <button 
        className={styles.floatingButton}
        onClick={() => setIsOpen(true)}
        title="Conquistas"
      >
        <i className="fas fa-trophy"></i>
        <span className={styles.badgeCount}>{unlockedAchievements}/{totalAchievements}</span>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <i className="fas fa-trophy"></i>
                <h2>Conquistas</h2>
              </div>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={styles.progressContainer}>
              <ProgressBar
                progress={unlockedAchievements}
                max={totalAchievements}
                height={14}
                showPercentage={true}
                showLabel={true}
                label="Progresso Geral"
                color="success"
                animated={true}
              />
              
              <div className={styles.progressStats}>
                <span>{unlockedAchievements} de {totalAchievements} conquistas desbloqueadas</span>
              </div>
            </div>
            
            <div className={styles.achievementsSection}>
              <h3 className={styles.sectionTitle}>Conquistas</h3>
              <div className={styles.achievementsGrid}>
                {achievements.map(achievement => (
                  <AchievementBadge 
                    key={achievement.id} 
                    achievement={achievement} 
                  />
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <p>Continue explorando para desbloquear mais conquistas! 🚀</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementSystem;