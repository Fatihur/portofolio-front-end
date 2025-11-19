
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription?: string; // New field for modal
  client?: string;          // New field for modal
  year?: string;            // New field for modal
  image: string;
  gallery?: string[];       // New field for gallery images
  technologies: string[];
  link: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SectionProps {
  id: string;
  className?: string;
}
