export interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  externalUrl?: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  hidden?: boolean;
}

export interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  incrementProgress: (id: string, amount?: number) => void;
  totalAchievements: number;
  unlockedAchievements: number;
}