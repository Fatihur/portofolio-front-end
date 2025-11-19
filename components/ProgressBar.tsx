
import React, { useEffect, useState } from 'react';

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight === 0) return;
      
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] mix-blend-difference">
      <div 
        className="h-full bg-white origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};

export default ProgressBar;
