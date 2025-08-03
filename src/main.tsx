import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/OptimizedApp';
import './index.css';
import './i18n';
import { initializeProductionOptimizations } from './utils/productionOptimizations';
import { initializeMonitoring } from './utils/monitoring';

// Initialize production optimizations
initializeProductionOptimizations();

// Initialize monitoring in production
initializeMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
