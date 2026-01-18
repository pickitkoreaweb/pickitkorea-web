import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactable');
        
      setIsPointer(!!isClickable);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mouseenter', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mouseenter', updateCursor);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <style>{`
        body, a, button, input { cursor: none !important; }
      `}</style>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out flex items-center justify-center"
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
          opacity: isVisible ? 1 : 0
        }}
      >
        <div className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${isPointer ? 'w-full h-full opacity-20' : ''}`}></div>
        <div className={`absolute inset-0 border border-white rounded-full transition-all duration-300 ${isPointer ? 'scale-0' : 'scale-100 opacity-50'}`}></div>
      </div>
    </>
  );
};

export default CustomCursor;