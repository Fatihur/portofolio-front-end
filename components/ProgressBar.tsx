
import React, { useEffect, useRef } from 'react';

const ProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          if (windowHeight > 0 && barRef.current) {
            const scroll = totalScroll / windowHeight;
            barRef.current.style.transform = `scaleX(${scroll})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] mix-blend-difference">
      <div 
        ref={barRef}
        className="h-full bg-white origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(0)` }}
      />
    </div>
  );
};

export default ProgressBar;
