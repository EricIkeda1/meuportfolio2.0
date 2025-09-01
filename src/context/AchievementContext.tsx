import React, { createContext, useContext, useEffect, useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  incrementProgress: (id: string, amount?: number) => void;
  totalAchievements: number;
  unlockedAchievements: number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

interface AchievementProviderProps {
  children: React.ReactNode;
}

export const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const initialAchievements: Achievement[] = [
    {
      id: 'view_projects',
      title: 'Explorador de Projetos',
      description: 'Visualizou todos os projetos do portfólio',
      icon: 'fas fa-folder-open',
      unlocked: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: 'visit_github',
      title: 'GitHub Explorer',
      description: 'Clicou no link do GitHub',
      icon: 'fab fa-github',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'visit_linkedin',
      title: 'Networker',
      description: 'Clicou no link do LinkedIn',
      icon: 'fab fa-linkedin',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'visit_portfolio',
      title: 'Portfolio Explorer',
      description: 'Clicou no link do Portfolio',
      icon: 'fas fa-briefcase',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'read_about',
      title: 'Curioso',
      description: 'Passou mais de 30 segundos na página',
      icon: 'fas fa-clock',
      unlocked: false,
      progress: 0,
      maxProgress: 30
    },
    {
      id: 'theme_switcher',
      title: 'Estilista',
      description: 'Mudou o tema claro/escuro',
      icon: 'fas fa-palette',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'scroll_explorer',
      title: 'Explorador Scroll',
      description: 'Rolou até o final da página',
      icon: 'fas fa-mouse',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'project_clicker',
      title: 'Clique Mestre',
      description: 'Clicou em 3 projetos diferentes',
      icon: 'fas fa-mouse-pointer',
      unlocked: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'social_butterfly',
      title: 'Borboleta Social',
      description: 'Clicou em todos os links sociais',
      icon: 'fas fa-share-alt',
      unlocked: false,
      progress: 0,
      maxProgress: 3
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_achievements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAchievements(parsed);
      } catch {
        setAchievements(initialAchievements);
      }
    } else {
      setAchievements(initialAchievements);
    }
  }, []);

  useEffect(() => {
    if (achievements.length > 0) {
      localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
    }
  }, [achievements]);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(ach => 
      ach.id === id ? { ...ach, unlocked: true, progress: ach.maxProgress } : ach
    ));
  };

  const incrementProgress = (id: string, amount: number = 1) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id) {
        const newProgress = Math.min(ach.maxProgress, ach.progress + amount);
        const unlocked = newProgress >= ach.maxProgress;
        return { ...ach, progress: newProgress, unlocked };
      }
      return ach;
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAchievements(prev => prev.map(ach => {
        if (ach.id === 'read_about' && !ach.unlocked) {
          const newProgress = ach.progress + 1;
          const unlocked = newProgress >= ach.maxProgress;
          return { ...ach, progress: newProgress, unlocked };
        }
        return ach;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      
      if (scrollable > 0 && scrolled / scrollable > 0.9) {
        unlockAchievement('scroll_explorer');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  const value: AchievementContextType = {
    achievements,
    unlockAchievement,
    incrementProgress,
    totalAchievements,
    unlockedAchievements
  };

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  );
};