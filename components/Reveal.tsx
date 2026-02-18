import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in seconds
  duration?: 'slow' | 'fast';
}

/**
 * Reveal: Now renders children statically as requested.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={className}>
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
 * WordReveal: Now renders text statically as requested.
 */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = "",
  gradient = false
}) => {
  return (
    <span className={`${className} ${gradient ? 'text-gold-gradient' : ''}`}>
      {text}
    </span>
  );
};
