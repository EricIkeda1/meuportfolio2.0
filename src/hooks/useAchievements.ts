import { useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';

export const useTimeTracker = () => {
  const { updateProgress } = useAchievements();

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      updateProgress('read_about', seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [updateProgress]);
};