
import React, { useState, useEffect, useRef } from 'react';
import { SectionProps, Experience as ExperienceType } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getExperiences } from '../services/dataService';

const ExperienceItem: React.FC<{ job: ExperienceType; index: number; total: number }> = ({ job, index, total }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imgRef.current) {
      const x = e.clientX;
      const y = e.clientY;
      
      // Move image near cursor using fixed position
      // Adjust offset to position image nicely relative to cursor
      imgRef.current.style.transform = `translate3d(${x + 20}px, ${y - 100}px, 0)`;
    }
  };

  // Calculate sticky top offset: Base start + (Index * Stack Height)
  // 120px is roughly top-32 (header spacing)
  // 50px is the visible "lip" of the card underneath
  const stickyTop = `calc(120px + ${index * 50}px)`;

  return (
    <article 
      ref={ref}
      className={`sticky w-full mb-4 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
      style={{ 
        top: stickyTop, 
        zIndex: index + 1,
        transitionDelay: `${index * 100}ms` 
      }}
    >
      <div 
        ref={containerRef}
        className="relative bg-white border border-neutral-200 p-6 md:p-10 transition-all duration-500 hover:border-neutral-900 group cursor-default min-h-[250px] flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 border-b border-neutral-100 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {job.role}
            </h3>
            <span className="text-neutral-400 font-mono text-sm mt-2 md:mt-0 uppercase tracking-wider">
                {job.period}
            </span>
          </div>

          {/* Card Body */}
          <div>
             <h4 className="text-lg font-bold text-neutral-900 mb-3">{job.company}</h4>
             <p className="text-neutral-500 leading-relaxed max-w-3xl text-base md:text-lg">
                {job.description}
             </p>
          </div>
          
          {/* Decorative Number */}
          <div className="absolute bottom-6 right-6 text-6xl font-bold text-neutral-100 -z-0 select-none group-hover:text-neutral-900/5 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Floating Image Reveal */}
          {job.image && (
            <div 
              ref={imgRef}
              className="fixed top-0 left-0 pointer-events-none z-[60] w-72 h-48 bg-neutral-900 overflow-hidden shadow-2xl transition-opacity duration-200 ease-out will-change-transform border-2 border-white"
              style={{
                opacity: isHovered ? 1 : 0,
              }}
            >
               <img 
                src={job.image} 
                alt={`${job.company} office or logo`} 
                loading="lazy" 
                className="w-full h-full object-cover grayscale" 
               />
            </div>
          )}
      </div>
    </article>
  );
};

const Experience: React.FC<SectionProps> = ({ id }) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    setExperiences(getExperiences());
  }, []);

  return (
    <section id={id} className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-neutral-50/30">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Sticky Title */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 
                ref={titleRef}
                className={`text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 mb-8 reveal-hidden ${titleVisible ? 'reveal-visible' : ''}`}
            >
                Experience
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-xs mb-8">
                A timeline of my professional career, focusing on scalable architecture and user-centric design.
            </p>
            
            <div className="hidden lg:block h-[1px] w-12 bg-neutral-900 mb-4"></div>
            <div className="hidden lg:block text-xs font-mono text-neutral-400">
                SCROLL TO EXPLORE
            </div>
          </div>
        </div>
        
        {/* Right Column - Sticky Stack Cards */}
        <div className="lg:col-span-8 relative min-h-[100vh]">
          {experiences.map((job, index) => (
            <ExperienceItem 
                key={job.id} 
                job={job} 
                index={index} 
                total={experiences.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
