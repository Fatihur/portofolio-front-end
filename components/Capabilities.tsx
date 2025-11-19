
import React from 'react';
import { SectionProps } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LayoutIcon, CodeIcon, ServerIcon, ChartIcon } from './Icons';

interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  tools: string[];
  icon: React.ReactNode;
}

const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Creating visual identities and intuitive interfaces that communicate clarity and purpose.',
    tools: ['Figma', 'Adobe XD', 'Illustrator', 'UI/UX', 'Prototyping'],
    icon: <LayoutIcon className="w-8 h-8" />
  },
  {
    id: 'software',
    title: 'Software Engineer',
    description: 'Building robust, scalable, and high-performance web applications using modern architectures.',
    tools: ['React', 'TypeScript', 'Next.js', 'Node.js', 'DevOps'],
    icon: <CodeIcon className="w-8 h-8" />
  },
  {
    id: 'network',
    title: 'Networking',
    description: 'Designing and maintaining secure network infrastructures for seamless data flow and connectivity.',
    tools: ['Cisco', 'TCP/IP', 'Cloud Infrastructure', 'Security', 'VPN'],
    icon: <ServerIcon className="w-8 h-8" />
  },
  {
    id: 'data',
    title: 'Data Analysis',
    description: 'Transforming raw data into actionable insights through statistical processing and visualization.',
    tools: ['Python', 'SQL', 'Tableau', 'Pandas', 'PowerBI'],
    icon: <ChartIcon className="w-8 h-8" />
  }
];

const Capabilities: React.FC<SectionProps> = ({ id }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id={id} ref={ref} className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-200">
      <div className={`mb-16 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}>
        <div className="flex items-baseline gap-4 mb-4">
           <div className="w-2 h-2 bg-neutral-900"></div>
           <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900">Core Capabilities</h2>
        </div>
        <p className="text-2xl md:text-3xl font-medium text-neutral-900 max-w-2xl tracking-tight">
          A multidisciplinary approach combining technical precision with creative problem-solving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-neutral-200">
        {CAPABILITIES_DATA.map((item, index) => (
          <div 
            key={item.id}
            className={`group border-r border-b border-neutral-200 p-8 md:p-10 hover:bg-neutral-50 transition-colors duration-500 reveal-hidden ${isVisible ? 'reveal-visible' : ''}`}
            style={{ 
                transitionDelay: `${index * 100}ms`,
                borderTop: '1px solid #e5e7eb' // Manual top border to ensure grid closure
            }}
          >
            <div className="mb-8 text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300">
                {item.icon}
            </div>
            
            <h3 className="text-xl font-bold text-neutral-900 mb-4 tracking-tight">
              {item.title}
            </h3>
            
            <p className="text-neutral-500 text-sm leading-relaxed mb-8 h-16">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
               {item.tools.map(tool => (
                   <span 
                    key={tool} 
                    className="text-[10px] font-mono uppercase border border-neutral-200 px-2 py-1 rounded-sm text-neutral-400 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-colors duration-300"
                   >
                       {tool}
                   </span>
               ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;
