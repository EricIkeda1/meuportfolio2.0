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

