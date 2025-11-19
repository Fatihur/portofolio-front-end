
import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleSpeed?: number; // How fast the interval runs
  revealSpeed?: number; // How fast the real text reveals (higher = slower)
  triggerOnMount?: boolean;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = 30,
  revealSpeed = 1/3, // Increment per interval
  triggerOnMount = false,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovering = useRef(false);

  const scramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Return random character or space if original is space
            if (text[index] === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += revealSpeed; 
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (triggerOnMount) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    isHovering.current = true;
    scramble();
  };

  return (
    <Component 
      className={`inline-block tabular-nums ${className}`} 
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
};

export default TextScramble;
