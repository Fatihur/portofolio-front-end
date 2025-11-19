
import { Project, Experience } from '../types';
import { PROJECTS as INITIAL_PROJECTS, EXPERIENCE as INITIAL_EXPERIENCE } from '../constants';

const PROJECT_KEY = 'portfolio_projects_data';
const EXPERIENCE_KEY = 'portfolio_experience_data';
const AUTH_KEY = 'portfolio_admin_auth';

// --- Projects CRUD ---

export const getProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(PROJECT_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with constants if empty
    localStorage.setItem(PROJECT_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  } catch (e) {
    console.error("Error loading projects", e);
    return INITIAL_PROJECTS;
  }
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = project;
  } else {
    // New project, generate ID
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    projects.push({ ...project, id: newId });
  }
  
  localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: number): void => {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
};

// --- Experience CRUD ---

export const getExperiences = (): Experience[] => {
  try {
    const stored = localStorage.getItem(EXPERIENCE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(INITIAL_EXPERIENCE));
    return INITIAL_EXPERIENCE;
  } catch (e) {
    return INITIAL_EXPERIENCE;
  }
};

export const saveExperience = (exp: Experience): void => {
  const list = getExperiences();
  const index = list.findIndex(e => e.id === exp.id);
  
  if (index >= 0) {
    list[index] = exp;
  } else {
    const newId = Math.max(...list.map(e => e.id), 0) + 1;
    list.push({ ...exp, id: newId });
  }
  
  localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(list));
};

export const deleteExperience = (id: number): void => {
  const list = getExperiences().filter(e => e.id !== id);
  localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(list));
};

// --- Auth ---

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (password: string): boolean => {
  // Simple client-side check. In production, use a real backend.
  if (password === 'admin123') {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.hash = '';
  window.location.reload();
};
