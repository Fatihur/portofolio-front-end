
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Counter Logic
    const interval = setInterval(() => {
      setCount((prev) => {
        // Random increment to simulate loading
        const next = prev + Math.floor(Math.random() * 15) + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger exit animation when counter hits 100
    if (count === 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        
        // Call onComplete after animation finishes to unmount
        setTimeout(() => {
          onComplete();
        }, 1000); // Match this with duration-1000
      }, 500); // Wait a bit at 100% before sliding up

      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-neutral-900 text-white transition-transform duration-1000 ease-out-expo ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="absolute bottom-10 left-6 md:left-12 flex flex-col items-start overflow-hidden">
         <div className={`transition-transform duration-700 delay-300 ${isExiting ? 'translate-y-full' : 'translate-y-0'}`}>
            <h1 className="text-9xl md:text-[12rem] font-bold tracking-tighter leading-none tabular-nums">
                {count}%
            </h1>
            <div className="h-[1px] w-full bg-neutral-700 mt-4 relative overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${count}%` }}
                />
            </div>
            <div className="flex justify-between items-center mt-2 text-neutral-500 text-xs uppercase tracking-widest font-mono">
                <span>Loading Portfolio</span>
                <span>Dev. 2025</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SplashScreen;
