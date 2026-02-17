import React, { useRef, useState } from 'react';

interface InteractiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-avanti-light ${className}`}
    >
      {/* Subtle Glow/Lighting effect behind the illustration */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none mix-blend-soft-light"
        style={{
            opacity: opacity * 0.5,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(189, 159, 99, 0.15), transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
};