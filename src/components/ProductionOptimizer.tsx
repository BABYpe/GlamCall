import React, { useEffect } from 'react';
import { optimizeForProduction, addResourceHints } from '../utils/buildOptimization';

export const ProductionOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (import.meta.env.PROD) {
      // Apply production optimizations
      optimizeForProduction();
      addResourceHints();

      // Disable right-click in production (optional)
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      // Disable F12 and other dev tools shortcuts (optional)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return <>{children}</>;
};