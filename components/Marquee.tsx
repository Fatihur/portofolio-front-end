
import React from 'react';
import TextScramble from './TextScramble';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', className = '' }) => {
  return (
    <div className={`relative flex overflow-hidden py-12 bg-neutral-900 text-white user-select-none ${className}`}>
      <div className={`animate-marquee whitespace-nowrap flex gap-12 ${direction === 'right' ? 'animate-marquee-reverse' : ''}`}>
        {/* Triple duplication for smooth infinite loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="text-6xl md:text-8xl font-bold uppercase tracking-tighter opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
            <TextScramble text={item} /> 
            <span className="mx-4 text-neutral-700">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
