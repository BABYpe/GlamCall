import React, { useState, useEffect } from 'react';
import { X, Gift, Shield, Lightbulb, Heart } from 'lucide-react';
import { welcomeMessages, modelWelcomeMessages } from '../data/welcomeMessages';
import { mockModels } from '../data/mockData';

interface WelcomeSystemProps {
  isNewUser: boolean;
  onClose: () => void;
}

export const WelcomeSystem: React.FC<WelcomeSystemProps> = ({ isNewUser, onClose }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showModelMessages, setShowModelMessages] = useState(false);

  useEffect(() => {
    if (!isNewUser) return;

    // عرض رسائل الترحيب تدريجياً
    const timer = setTimeout(() => {
      if (currentMessageIndex < welcomeMessages.length - 1) {
        setCurrentMessageIndex(prev => prev + 1);
      } else {
        // بعد انتهاء رسائل الترحيب، عرض رسائل العارضات
        setTimeout(() => {
          setShowModelMessages(true);
        }, 2000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, isNewUser]);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'welcome': return <Heart className="w-6 h-6 text-purple-400" />;
      case 'tips': return <Lightbulb className="w-6 h-6 text-yellow-400" />;
      case 'promotion': return <Gift className="w-6 h-6 text-green-400" />;
      case 'safety': return <Shield className="w-6 h-6 text-blue-400" />;
      default: return <Heart className="w-6 h-6 text-purple-400" />;
    }
  };

  if (!isNewUser) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-semibold text-white">مرحباً بك في GlamCall</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Welcome Messages */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {welcomeMessages.slice(0, currentMessageIndex + 1).map((message, index) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-500 ${
                index === currentMessageIndex ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-gray-700/30'
              }`}
            >
              <div className="p-2 bg-gray-700/50 rounded-full">
                {getMessageIcon(message.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{message.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{message.message}</p>
                <p className="text-gray-500 text-xs mt-2">من {message.sender}</p>
              </div>
            </div>
          ))}

          {/* Model Welcome Messages */}
          {showModelMessages && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <h3 className="text-white font-semibold mb-4 text-center">رسائل من العارضات 💕</h3>
              {modelWelcomeMessages.map((modelMsg) => {
                const model = mockModels.find(m => m.id === modelMsg.modelId);
                if (!model) return null;

                return (
                  <div
                    key={modelMsg.id}
                    className="flex items-start space-x-3 p-4 bg-pink-600/10 border border-pink-500/20 rounded-lg mb-3"
                  >
                    <img
                      src={model.avatar}
                      alt={model.name}
                      className="w-10 h-10 rounded-full border-2 border-pink-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-pink-400 font-semibold">{model.name}</h4>
                        <span className="text-xs text-gray-500">{model.country}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{modelMsg.message}</p>
                      <button className="mt-2 text-pink-400 hover:text-pink-300 text-xs font-medium">
                        رد على الرسالة →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              {currentMessageIndex + 1} من {welcomeMessages.length}
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              ابدأ الاستكشاف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};