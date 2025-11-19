
import React, { useEffect, useState, useCallback } from 'react';
import { Project } from '../types';
import { CloseIcon, ArrowUpRight, ChevronLeft, ChevronRight } from './Icons';
import Magnetic from './Magnetic';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
        setCurrentSlide(0); // Reset slider on close
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project.gallery || project.gallery.length === 0) return;
      
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      } else if (isOpen) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLightboxOpen, currentSlide, project.gallery]);


  const nextSlide = useCallback(() => {
    if (!project.gallery) return;
    setCurrentSlide((prev) => (prev === project.gallery!.length - 1 ? 0 : prev + 1));
  }, [project.gallery]);

  const prevSlide = useCallback(() => {
    if (!project.gallery) return;
    setCurrentSlide((prev) => (prev === 0 ? project.gallery!.length - 1 : prev - 1));
  }, [project.gallery]);

  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* Main Modal */}
      <div 
          className={`fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-500 ease-out-quart overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Close Button */}
        <div className="sticky top-0 w-full flex justify-end p-6 md:p-12 z-20 bg-white/80 backdrop-blur-sm">
          <Magnetic>
              <button 
              onClick={onClose}
              className="p-4 bg-neutral-100 rounded-full hover:bg-neutral-900 hover:text-white transition-colors duration-300 group"
              aria-label="Close details"
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

          {/* Carousel / Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
              <div className={`mt-32 transition-all duration-700 delay-500 ease-out-quart ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                  <div className="flex justify-between items-end mb-8 border-t border-neutral-200 pt-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                        Project Gallery
                    </h3>
                    
                    {/* Carousel Controls */}
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-neutral-500">
                            {String(currentSlide + 1).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={prevSlide} className="p-3 border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors rounded-full">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button onClick={nextSlide} className="p-3 border border-neutral-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors rounded-full">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                  </div>

                  {/* Carousel Viewport */}
                  <div className="relative overflow-hidden bg-neutral-100 aspect-[16/10] group cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
                      <div 
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                          {project.gallery.map((imgUrl, index) => (
                              <div key={index} className="min-w-full h-full relative">
                                  <img 
                                      src={imgUrl} 
                                      alt={`Gallery ${index + 1}`}
                                      className="w-full h-full object-cover"
                                  />
                              </div>
                          ))}
                      </div>
                      {/* Overlay Hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                          <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-neutral-900 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                              View Fullscreen
                          </span>
                      </div>
                  </div>
              </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && project.gallery && (
        <div className="fixed inset-0 z-[70] bg-neutral-900/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 animate-in fade-in">
            
            {/* Lightbox Close */}
            <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-[80]"
            >
                <CloseIcon className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-24">
                <img 
                    src={project.gallery[currentSlide]} 
                    alt="Fullscreen view" 
                    className="max-w-full max-h-full object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {/* Lightbox Navigation */}
            <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-[80]"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-[80]"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

             {/* Counter */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm tracking-widest">
                {String(currentSlide + 1).padStart(2, '0')} — {String(project.gallery.length).padStart(2, '0')}
             </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetailModal;
