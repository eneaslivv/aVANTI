import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in seconds
  duration?: 'slow' | 'fast';
}

/**
 * Reveal: Animates a block (div, card, paragraph) with a blur/slide-up effect.
 * Perfect for cards, images, and body text.
 */
export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 'fast' 
}) => {
  const animationClass = duration === 'slow' ? 'animate-blur-reveal' : 'animate-blur-reveal-fast';
  
  return (
    <div 
      className={`opacity-0 ${animationClass} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

interface WordRevealProps { 
  text: string; 
  className?: string; 
  delay?: number;
  gradient?: boolean;
}

/**
 * WordReveal: Splits text into words and animates them sequentially.
 * Perfect for H1, H2, and big impact titles.
 */
export const WordReveal: React.FC<WordRevealProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  gradient = false 
}) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          // Apply text-gold-gradient to each word individually to ensure visibility during transforms
          className={`inline-block opacity-0 animate-blur-reveal mr-[0.25em] ${gradient ? 'text-gold-gradient' : ''}`}
          style={{ 
            animationDelay: `${delay + (index * 0.12)}s` // Cinematic wave effect
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};
