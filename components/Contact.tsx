import React from 'react';
import { ArrowRight } from './Icons';
import { SectionProps } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC<SectionProps> = ({ id }) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.3);

  return (
    <section id={id} ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-neutral-900 text-white overflow-hidden relative">
      {/* Decorative Circle */}
      <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] bg-neutral-800/50 rounded-full blur-3xl transition-transform duration-[1.5s] ease-out-expo ${sectionVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />

      <div className="relative z-10 max-w-4xl">
        <div className={`mb-16 reveal-hidden ${sectionVisible ? 'reveal-visible' : ''}`}>
            <p className="text-neutral-400 uppercase tracking-widest text-sm mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-neutral-600"></span>
                Get in touch
            </p>
            
            <div className="text-reveal-wrapper">
                <h2 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-2 text-reveal-inner transition-transform duration-1000 delay-100 ${sectionVisible ? 'translate-y-0' : 'translate-y-[110%]'}`}>
                  LET'S WORK
                </h2>
            </div>
            <div className="text-reveal-wrapper">
                <h2 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-neutral-500 text-reveal-inner transition-transform duration-1000 delay-200 ${sectionVisible ? 'translate-y-0' : 'translate-y-[110%]'}`}>
                  TOGETHER.
                </h2>
            </div>
        </div>
        
        <div className={`flex flex-col gap-10 reveal-hidden delay-300 ${sectionVisible ? 'reveal-visible' : ''}`}>
          <a href="mailto:hello@dev-portfolio.com" className="flex items-center gap-6 text-2xl md:text-4xl group w-fit">
            <div className="relative overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">hello@dev-portfolio.com</span>
                <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-neutral-400">hello@dev-portfolio.com</span>
            </div>
            <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 group-hover:translate-x-2 transition-all duration-500 ease-out-expo" />
          </a>
          
          <div className="flex gap-12 mt-12 pt-12 border-t border-neutral-800">
            {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
              <a key={social} href="#" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest relative group">
                {social}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`mt-32 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm reveal-hidden delay-500 ${sectionVisible ? 'reveal-visible' : ''}`}>
        <p>&copy; {new Date().getFullYear()} Dev Portfolio.</p>
        <p>Crafted with React, Tailwind & Gemini AI.</p>
      </div>
    </section>
  );
};

export default Contact;