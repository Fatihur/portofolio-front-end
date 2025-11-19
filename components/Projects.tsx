
import React, { useRef, useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from './Icons';
import { SectionProps, Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProjectDetailModal from './ProjectDetailModal';

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const imgRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Rotation between -5 and 5 degrees
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={ref}
      onClick={() => onClick(project)}
      className={`group cursor-pointer block reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden mb-6 bg-neutral-100 aspect-[4/3] perspective-1000"
        style={{ perspective: '1000px' }}
      >
        <div 
            className="w-full h-full transition-transform duration-100 ease-out"
            style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`,
            }}
        >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 ease-out-expo grayscale group-hover:grayscale-0"
            />
        </div>
        
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-300 pointer-events-none"></div>
        
        {/* Floating Tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-neutral-900 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            {project.category}
        </div>
      </div>
      
      <div className="flex justify-between items-start border-t border-neutral-200 pt-5 relative">
        <div className="absolute top-0 left-0 w-0 h-[1px] bg-neutral-900 transition-all duration-700 ease-out-expo group-hover:w-full"></div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="text-xs font-medium border border-neutral-200 px-2 py-1 text-neutral-500 bg-neutral-50">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-3 bg-transparent border border-transparent rounded-full group-hover:border-neutral-200 transition-all duration-300 transform group-hover:rotate-45">
          <ArrowUpRight className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900" />
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC<SectionProps> = ({ id }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  // Extract unique categories from projects
  const categories = useMemo(() => {
    return ['All', ...new Set(PROJECTS.map(p => p.category))];
  }, []);

  // Filter projects based on selection
  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id={id} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-200">
      <div 
        ref={headerRef}
        className={`flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-hidden ${headerVisible ? 'reveal-visible' : ''}`}
      >
        <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 mb-6">Selected Works</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
                A collection of digital products crafted with precision, focusing on interaction and performance.
            </p>
        </div>
        <p className="text-neutral-400 mt-8 md:mt-0 text-sm font-mono bg-neutral-100 px-4 py-2 rounded-full">2021 — PRESENT</p>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap gap-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
        {categories.map((category) => (
            <button
                key={category}
                onClick={() => setFilter(category)}
                className={`text-sm uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
                    filter === category 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                }`}
            >
                {category}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onClick={setSelectedProject}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
