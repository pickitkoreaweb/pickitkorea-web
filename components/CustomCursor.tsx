import React, { useEffect, useState } from 'react';

interface ClickRipple {
  x: number;
  y: number;
  id: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

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
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactable');
        
      setIsPointer(!!isClickable);
    };

    const mouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Create a ripple at click position
      const id = Date.now();
      setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 800);
    };

    const mouseUp = () => setIsClicking(false);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('mouseenter', updateCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('mouseenter', updateCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <style>{`
        body, a, button, input, textarea { cursor: none !important; }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; border-width: 2px; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; border-width: 0px; }
        }
        .animate-ripple {
          animation: ripple 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* Click Ripples */}
      {ripples.map(r => (
         <div 
            key={r.id}
            className="fixed w-10 h-10 rounded-full border-[#D4AF37] z-[9998] pointer-events-none animate-ripple"
            style={{ left: r.x, top: r.y, borderStyle: 'solid' }}
         />
      ))}

      {/* Main Cursor */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out flex items-center justify-center"
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isClicking ? 0.9 : (isPointer ? 1.5 : 1)})`,
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