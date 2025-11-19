
import React, { useState, useEffect, useRef } from 'react';
import { SectionProps, Experience as ExperienceType } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getExperiences } from '../services/dataService';

const ExperienceItem: React.FC<{ job: ExperienceType; index: number }> = ({ job, index }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div 
      ref={ref}
      className={`group border-l-2 border-neutral-200 pl-8 py-2 relative reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        ref={itemRef}
        className="relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
          <div className="absolute left-[-41px] top-0 h-full w-[2px] bg-neutral-900 origin-top scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"></div>
          <div className="absolute left-[-37px] top-3 w-2 h-2 bg-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
            <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">{job.role}</h3>
            <span className="text-neutral-400 font-mono text-sm mt-1 sm:mt-0 bg-white px-2 z-10">{job.period}</span>
          </div>
          <h4 className="text-lg text-neutral-600 mb-4 font-medium">{job.company}</h4>
          <p className="text-neutral-500 leading-relaxed max-w-2xl">
            {job.description}
          </p>

          {/* Floating Image Reveal */}
          {job.image && (
            <div 
              className="fixed pointer-events-none z-50 w-64 h-40 bg-neutral-900 overflow-hidden shadow-2xl transition-opacity duration-300 ease-out"
              style={{
                opacity: isHovered ? 1 : 0,
                left: 0, // We use fixed positioning relative to viewport but update via transform based on mouse
                top: 0,
                transform: `translate(${mousePos.x + 20}px, ${mousePos.y - 80}px)`, // Local coordinates won't work well with fixed, let's try a different approach or use clientX from parent
                // Note: For a robust implementation, we usually track clientX/Y globally or relative to viewport. 
                // Here, since we used local logic in previous steps, let's fix the positioning logic slightly or assume the parent is relative.
                // Actually, let's stick to a simple absolute position if the container allows, or simple display none.
                display: isHovered ? 'block' : 'none',
                // Re-adjusting to be absolute relative to the item for simplicity in this context:
                position: 'absolute'
              }}
            >
               <img src={job.image} alt={job.company} className="w-full h-full object-cover" />
            </div>
          )}
      </div>
    </div>
  );
};

const Experience: React.FC<SectionProps> = ({ id }) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    setExperiences(getExperiences());
  }, []);

  return (
    <section id={id} className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-neutral-50/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 
                ref={titleRef}
                className={`text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 mb-6 reveal-hidden ${titleVisible ? 'reveal-visible' : ''}`}
            >
                Experience
            </h2>
            <p className="text-neutral-500 leading-relaxed max-w-xs">
                My professional journey through various roles in the tech industry.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-16">
          {experiences.map((job, index) => (
            <ExperienceItem key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
