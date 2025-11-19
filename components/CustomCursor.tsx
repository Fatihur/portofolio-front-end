
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Update position directly without triggering React re-render
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Efficient hover detection using event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .clickable')) {
        if (dotRef.current) {
          dotRef.current.style.transform = 'scale(4)'; // 16px -> 64px equivalent
          dotRef.current.style.opacity = '0.5';
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .clickable')) {
        if (dotRef.current) {
          dotRef.current.style.transform = 'scale(1)';
          dotRef.current.style.opacity = '1';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [isVisible]);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="w-4 h-4 bg-white rounded-full transition-all duration-300 ease-out"
      />
    </div>
  );
};

export default CustomCursor;
