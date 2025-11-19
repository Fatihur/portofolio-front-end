
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { CloseIcon, ArrowUpRight } from './Icons';
import Magnetic from './Magnetic';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to allow mounting before animating in
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
        className={`fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-500 ease-out-quart overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Close Button */}
      <div className="sticky top-0 w-full flex justify-end p-6 md:p-12 z-20 bg-white/80 backdrop-blur-sm">
        <Magnetic>
            <button 
            onClick={onClose}
            className="p-4 bg-neutral-100 rounded-full hover:bg-neutral-900 hover:text-white transition-colors duration-300 group"
            >
            <CloseIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
            </button>
        </Magnetic>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 w-full">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 delay-100 ease-out-quart ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-neutral-500 uppercase tracking-widest text-sm border border-neutral-200 px-3 py-1 rounded-full mb-6 inline-block">
                {project.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-neutral-900 mb-6">
                {project.title}
            </h1>
        </div>

        {/* Main Image */}
        <div className={`w-full aspect-video bg-neutral-100 mb-16 overflow-hidden transition-all duration-1000 delay-200 ease-out-quart ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            
            {/* Sidebar Details */}
            <div className={`md:col-span-4 space-y-8 transition-all duration-700 delay-300 ease-out-quart ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Client</h3>
                    <p className="text-neutral-600">{project.client || "Confidential"}</p>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Year</h3>
                    <p className="text-neutral-600">{project.year || "2024"}</p>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Services</h3>
                    <ul className="flex flex-col gap-1">
                        {project.technologies.map(tech => (
                            <li key={tech} className="text-neutral-600">{tech}</li>
                        ))}
                    </ul>
                </div>
                <div className="pt-8">
                    <a 
                        href={project.link}
                        className="inline-flex items-center gap-2 text-lg font-medium text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity"
                    >
                        Visit Live Site
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Main Text */}
            <div className={`md:col-span-8 transition-all duration-700 delay-400 ease-out-quart ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <h3 className="text-2xl font-medium text-neutral-900 mb-8 leading-tight">
                    {project.description}
                </h3>
                <div className="text-neutral-600 text-lg leading-relaxed space-y-6">
                    <p>{project.longDescription}</p>
                    <p>
                        The project focused on creating a seamless user experience while maintaining high performance standards. 
                        We approached the design with a mobile-first methodology, ensuring accessibility across all devices.
                    </p>
                    <p>
                        By leveraging modern frameworks like {project.technologies[0]}, we were able to reduce load times significantly compared to the previous iteration.
                    </p>
                </div>
            </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
            <div className={`mt-32 transition-all duration-700 delay-500 ease-out-quart ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-12 border-t border-neutral-200 pt-8">
                    Project Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.gallery.map((imgUrl, index) => (
                        <div 
                            key={index} 
                            className={`relative overflow-hidden group bg-neutral-100 aspect-[4/3] md:aspect-auto ${index % 3 === 0 ? 'md:col-span-2 md:aspect-video' : 'md:aspect-[4/3]'}`}
                        >
                            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 z-10 transition-colors duration-500 pointer-events-none"></div>
                            <img 
                                src={imgUrl} 
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailModal;
