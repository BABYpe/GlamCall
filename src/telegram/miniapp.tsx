import React, { useEffect, useState } from 'react';
import { TelegramWebApp } from './telegram-webapp';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramMiniAppProps {
  children: React.ReactNode;
}

export const TelegramMiniApp: React.FC<TelegramMiniAppProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if running in Telegram
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();
      
      // Set theme
      tg.setHeaderColor('#1F2937');
      tg.setBackgroundColor('#0F0F0F');
      
      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
      
      // Show main button
      tg.MainButton.setText('Open Full App');
      tg.MainButton.color = '#8B5CF6';
      tg.MainButton.textColor = '#FFFFFF';
      tg.MainButton.show();
      
      tg.MainButton.onClick(() => {
        tg.openLink('https://glamcall.com');
      });
      
      // Handle back button
      tg.BackButton.onClick(() => {
        tg.close();
      });
      
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading GlamCall...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="telegram-mini-app">
      {children}
    </div>
  );
};

// Telegram Mini App specific components
export const TelegramModelCard: React.FC<{ model: any }> = ({ model }) => {
  const handleCallModel = () => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.showPopup({
        title: 'Start Video Call',
        message: `Start a video call with ${model.name}?\nRate: $${model.pricePerMinute}/minute`,
        buttons: [
          { id: 'cancel', type: 'cancel' },
          { id: 'call', type: 'default', text: 'Start Call' }
        ]
      }, (buttonId) => {
        if (buttonId === 'call') {
          // Redirect to full app for video call
          tg.openLink(`https://glamcall.com/call/${model.id}`);
        }
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={model.avatar}
          alt={model.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold">{model.name}</h3>
          <p className="text-gray-400 text-sm">{model.country}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          model.isOnline ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
        }`}>
          {model.isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-3">{model.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-purple-400 font-semibold">
          ${model.pricePerMinute}/min
        </div>
        <button
          onClick={handleCallModel}
          disabled={!model.isOnline}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            model.isOnline
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {model.isOnline ? 'Call Now' : 'Offline'}
        </button>
      </div>
    </div>
  );
};

export const TelegramCoinPurchase: React.FC = () => {
  const packages = [
    { id: 1, coins: 100, price: 9.99, bonus: 0 },
    { id: 2, coins: 250, price: 19.99, bonus: 25 },
    { id: 3, coins: 500, price: 34.99, bonus: 75 },
    { id: 4, coins: 1000, price: 59.99, bonus: 200 }
  ];

  const handlePurchase = (pkg: any) => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Use Telegram Payments API
      tg.openInvoice(`https://glamcall.com/api/telegram/invoice/${pkg.id}`, (status) => {
        if (status === 'paid') {
          tg.showAlert('Payment successful! Coins added to your account.');
        } else if (status === 'cancelled') {
          tg.showAlert('Payment cancelled.');
        } else {
          tg.showAlert('Payment failed. Please try again.');
        }
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-4">Buy Coins</h2>
      <div className="space-y-3">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-white font-semibold">{pkg.coins} Coins</div>
                {pkg.bonus > 0 && (
                  <div className="text-green-400 text-sm">+{pkg.bonus} Bonus!</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">${pkg.price}</div>
                {pkg.bonus > 0 && (
                  <div className="text-gray-400 text-sm">
                    Total: {pkg.coins + pkg.bonus}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handlePurchase(pkg)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};