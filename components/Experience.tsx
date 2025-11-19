import React from 'react';
import { EXPERIENCE } from '../constants';
import { SectionProps } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ExperienceItem: React.FC<{ job: typeof EXPERIENCE[0]; index: number }> = ({ job, index }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <div 
      ref={ref}
      className={`group border-l-2 border-neutral-200 pl-8 py-2 relative reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute left-[-9px] top-0 h-full w-[2px] bg-neutral-900 origin-top scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"></div>
      <div className="absolute left-[-5px] top-3 w-2 h-2 bg-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">{job.role}</h3>
        <span className="text-neutral-400 font-mono text-sm mt-1 sm:mt-0 bg-white px-2 z-10">{job.period}</span>
      </div>
      <h4 className="text-lg text-neutral-600 mb-4 font-medium">{job.company}</h4>
      <p className="text-neutral-500 leading-relaxed max-w-2xl">
        {job.description}
      </p>
    </div>
  );
};

const Experience: React.FC<SectionProps> = ({ id }) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

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
          {EXPERIENCE.map((job, index) => (
            <ExperienceItem key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;