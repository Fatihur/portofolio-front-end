
import React, { useRef, useState } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // Higher number = stronger pull (distance)
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.5, y: y * 0.5 }); // 0.5 is the speed factor
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)', // Spring-like easing
        display: 'inline-block'
      }}
    >
      {React.cloneElement(children, {
        // Ensure children don't block pointer events if needed, though usually fine
      })}
    </div>
  );
};

export default Magnetic;
