import React, { createContext, useContext, useEffect, useState } from 'react';

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

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
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
  const [isInitialized, setIsInitialized] = useState(false);

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
    console.log('🎯 Conquistas atualizadas:', achievements);
    console.log('📊 Total de conquistas:', achievements.length);
  }, [achievements]);

  useEffect(() => {
    console.log('🔄 Carregando conquistas do localStorage...');
    const saved = localStorage.getItem('portfolio_achievements');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('📦 Conquistas carregadas do localStorage:', parsed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAchievements(parsed);
        } else {
          console.log('⚠️ Dados inválidos no localStorage, usando conquistas iniciais');
          setAchievements(initialAchievements);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar conquistas:', error);
        setAchievements(initialAchievements);
      }
    } else {
      console.log('📝 Criando conquistas iniciais');
      setAchievements(initialAchievements);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && achievements.length > 0) {
      console.log('💾 Salvando conquistas no localStorage:', achievements);
      localStorage.setItem('portfolio_achievements', JSON.stringify(achievements));
    }
  }, [achievements, isInitialized]);

  const unlockAchievement = (id: string) => {
    console.log('🔓 Desbloqueando conquista:', id);
    setAchievements(prev => {
      const updated = prev.map(ach => 
        ach.id === id ? { ...ach, unlocked: true, progress: ach.maxProgress } : ach
      );
      console.log('✅ Conquista desbloqueada. Novo estado:', updated);
      return updated;
    });
  };

  const updateProgress = (id: string, progress: number) => {
    console.log('📊 Atualizando progresso:', id, progress);
    setAchievements(prev => {
      const updated = prev.map(ach => {
        if (ach.id === id) {
          const newProgress = Math.min(ach.maxProgress, Math.max(0, progress));
          const unlocked = newProgress >= ach.maxProgress;
          console.log('➡️ Novo progresso para', id, ':', newProgress, '/', ach.maxProgress, 'Desbloqueado:', unlocked);
          return { ...ach, progress: newProgress, unlocked };
        }
        return ach;
      });
      console.log('✅ Progresso atualizado. Novo estado:', updated);
      return updated;
    });
  };

  const incrementProgress = (id: string, amount: number = 1) => {
    console.log('➕ Incrementando progresso:', id, 'Valor:', amount);
    setAchievements(prev => {
      const updated = prev.map(ach => {
        if (ach.id === id) {
          const newProgress = Math.min(ach.maxProgress, ach.progress + amount);
          const unlocked = newProgress >= ach.maxProgress;
          console.log('📈 Progresso atualizado para', id, ':', newProgress, '/', ach.maxProgress, 'Desbloqueado:', unlocked);
          return { ...ach, progress: newProgress, unlocked };
        }
        return ach;
      });
      console.log('✅ Progresso incrementado. Novo estado:', updated);
      return updated;
    });
  };

  useEffect(() => {
    if (!isInitialized || achievements.length === 0) {
      console.log('⏰ Timer: Aguardando inicialização...');
      return;
    }

    console.log('⏰ Iniciando timer de 30 segundos...');
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      console.log('⏳ Timer:', seconds, 'segundos');
      updateProgress('read_about', seconds);
      
      if (seconds % 5 === 0) {
        console.log('⏰ Progresso do tempo:', seconds + '/30 segundos');
      }
    }, 1000);

    return () => {
      console.log('⏰ Parando timer...');
      clearInterval(interval);
    };
  }, [isInitialized, achievements]); 

  useEffect(() => {
    if (!isInitialized || achievements.length === 0) {
      console.log('📜 Scroll detector: Aguardando inicialização...');
      return;
    }

    console.log('📜 Configurando detector de scroll...');
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      const scrollable = scrollHeight - clientHeight;
      const scrolled = scrollTop;
      const scrollPercentage = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
      
      console.log('📜 Scroll:', Math.round(scrollPercentage) + '%');
      
      if (scrollable > 0 && scrolled / scrollable > 0.9) {
        console.log('🎯 Scroll até o final detectado! Desbloqueando conquista...');
        unlockAchievement('scroll_explorer');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      console.log('📜 Removendo detector de scroll...');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInitialized, achievements]); 

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  console.log('📊 Estatísticas atuais:', unlockedAchievements + '/' + totalAchievements + ' conquistas desbloqueadas');

  if (!isInitialized || achievements.length === 0) {
    console.log('⏳ Aguardando inicialização do sistema de conquistas...');
    return null;
  }

  const value: AchievementContextType = {
    achievements,
    unlockAchievement,
    updateProgress,
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