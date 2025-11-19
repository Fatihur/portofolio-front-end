
import React, { useEffect, useState } from 'react';
import { ArrowDown } from './Icons';
import Magnetic from './Magnetic';
import TextScramble from './TextScramble';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleLines = ["CRAFTING", "DIGITAL", "REALITY."];

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-5xl relative z-10">
        
        {/* Title with Reveal Mask Animation */}
        <div 
          className="mb-8 will-change-transform"
          style={{ transform: `translateY(${offset * 0.2}px)` }} // Parallax Effect
        >
          {titleLines.map((line, idx) => (
            <span key={idx} className={`text-reveal-wrapper ${loaded ? 'text-reveal-visible' : ''}`}>
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-neutral-900 tracking-tighter leading-[0.85] text-reveal-inner"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {line}
              </h1>
            </span>
          ))}
        </div>
        
        <div 
          className={`transition-all duration-1000 delay-700 ease-out-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transform: `translateY(${offset * 0.1}px)` }}
        >
          <p className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed mb-12 border-l border-neutral-900 pl-6 ml-2">
            I am a Senior Frontend Engineer specializing in building high-performance, accessible, and minimalist web applications using modern technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 ml-2">
             <Magnetic>
               <a 
                href="#projects" 
                className="bg-neutral-900 text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group rounded-sm"
              >
                <TextScramble text="View Work" revealSpeed={0.5} />
                <ArrowDown className="group-hover:translate-y-1 transition-transform" />
              </a>
             </Magnetic>
            
             <Magnetic>
               <a 
                href="#contact" 
                className="text-neutral-900 px-8 py-4 text-sm font-semibold tracking-widest uppercase border border-neutral-200 hover:border-neutral-900 transition-colors rounded-sm block"
              >
                <TextScramble text="Contact Me" revealSpeed={0.5} />
              </a>
             </Magnetic>
          </div>
        </div>
      </div>

      {/* Background Subtle Parallax Element */}
      <div 
        className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-neutral-100 rounded-full -z-10 blur-3xl opacity-60"
        style={{ transform: `translateY(-${offset * 0.15}px)` }}
      />
      
      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-10 right-6 md:right-12 hidden md:flex flex-col items-center gap-4 transition-opacity duration-500 ${offset > 100 ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="vertical-rl text-xs uppercase tracking-widest text-neutral-400 animate-pulse" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-[1px] h-12 bg-neutral-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-neutral-900 animate-[scrolldown_1.5s_infinite]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes scrolldown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
