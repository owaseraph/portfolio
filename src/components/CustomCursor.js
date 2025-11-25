import React, {useEffect, useState} from 'react';
import '../Cursor.css';

const CustomCursor = () =>{
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);


useEffect(() =>{
    const moveCursor = e =>{
        setPosition({x: e.clientX, y: e.clientY});
    }

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const interactables = document.querySelectorAll('a, button, .project-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
}, []);

return (
    <>
      {/* The Dot */}
      <div 
        className="cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* The Trailing Ring */}
      <div 
        className={`cursor-ring ${isHovering ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;

