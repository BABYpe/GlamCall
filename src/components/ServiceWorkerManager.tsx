import React, { useEffect, useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';

export const ServiceWorkerManager: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    // Skip Service Worker registration in StackBlitz environment
    if (window.location.hostname.includes('webcontainer') || 
        window.location.hostname.includes('stackblitz') ||
        window.location.hostname.includes('local-credentialless') ||
        window.location.hostname.includes('webcontainer-api')) {
      return;
    }
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
          
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setWaitingWorker(newWorker);
                  setShowUpdatePrompt(true);
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('SW registration failed:', error);
        });

      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload();
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600/95 backdrop-blur-xl rounded-lg border border-blue-500/50 p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center space-x-3">
        <Download className="w-5 h-5 text-white" />
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm">تحديث متاح</h3>
          <p className="text-blue-100 text-xs">إصدار جديد من التطبيق متاح</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-3">
        <button
          onClick={handleUpdate}
          className="flex items-center space-x-1 bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>تحديث</span>
        </button>
        <button
          onClick={handleDismiss}
          className="text-blue-100 hover:text-white text-xs transition-colors"
        >
          لاحقاً
        </button>
      </div>
    </div>
  );
};