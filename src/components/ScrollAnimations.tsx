import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  threshold?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-10`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-10`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-10`;
        case 'scaleIn':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-x-0 translate-y-0 scale-100`;
  };

  return (
    <div ref={elementRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Floating Animation Component
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}> = ({ children, duration = 3, delay = 0 }) => {
  return (
    <div
      className="animate-float"
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Pulse Animation Component
export const PulseElement: React.FC<{
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}> = ({ children, intensity = 'medium' }) => {
  const getIntensityClass = () => {
    switch (intensity) {
      case 'low': return 'animate-pulse-slow';
      case 'medium': return 'animate-pulse';
      case 'high': return 'animate-pulse-fast';
      default: return 'animate-pulse';
    }
  };

  return (
    <div className={getIntensityClass()}>
      {children}
    </div>
  );
};