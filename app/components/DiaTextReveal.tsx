import React from 'react';

export function DiaTextReveal({ text, colors, className }: { text: string, colors?: string[], className?: string }) {
  const gradient = colors && colors.length > 0 
    ? `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`
    : `linear-gradient(to right, currentColor, currentColor)`; // fallback

  return (
    <span 
      className={`inline-block relative ${className || ''}`}
      style={{ 
        backgroundImage: gradient, 
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: 'dia-reveal-shine 5s linear infinite' 
      }}
    >
      {text}
    </span>
  );
}
