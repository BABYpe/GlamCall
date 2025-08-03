import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Gift, Image, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'model';
  content: string;
  timestamp: Date;
  type: 'text' | 'gift' | 'image';
  gift?: {
    name: string;
    value: number;
    icon: string;
  };
}

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
  modelAvatar: string;
  onSendGift: (gift: any) => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({ 
  isOpen, 
  onClose, 
  modelName, 
  modelAvatar,
  onSendGift 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'model',
      content: 'Hi there! Thanks for joining my stream! 💕',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      content: 'Hello! You look amazing today!',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      sender: 'model',
      content: 'Aww thank you so much! You\'re so sweet! 😊',
      timestamp: new Date(Date.now() - 180000),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showGifts, setShowGifts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const gifts = [
    { id: '1', name: 'Rose', value: 1, icon: '🌹' },
    { id: '2', name: 'Heart', value: 2, icon: '💖' },
    { id: '3', name: 'Kiss', value: 3, icon: '💋' },
    { id: '4', name: 'Diamond', value: 10, icon: '💎' },
    { id: '5', name: 'Crown', value: 25, icon: '👑' },
    { id: '6', name: 'Champagne', value: 50, icon: '🍾' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate model response
      setTimeout(() => {
        const responses = [
          'Thank you! 😘',
          'You\'re so kind! 💕',
          'I love chatting with you! ✨',
          'That made my day! 🥰',
          'You always know what to say! 💖'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const modelMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'model',
          content: randomResponse,
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, modelMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleSendGift = (gift: any) => {
    const giftMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: `Sent a ${gift.name}!`,
      timestamp: new Date(),
      type: 'gift',
      gift
    };
    setMessages(prev => [...prev, giftMessage]);
    onSendGift(gift);
    setShowGifts(false);

    // Model response to gift
    setTimeout(() => {
      const giftResponses = [
        `OMG! Thank you for the ${gift.name}! You're amazing! 💕`,
        `Wow! A ${gift.name}! You're so generous! 😍`,
        `Thank you so much for the ${gift.name}! I love it! ✨`,
        `You're the best! Thanks for the ${gift.name}! 🥰`
      ];
      const randomResponse = giftResponses[Math.floor(Math.random() * giftResponses.length)];
      
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        content: randomResponse,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, modelMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <img
            src={modelAvatar}
            alt={modelName}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-white font-semibold">{modelName}</h3>
            <p className="text-green-400 text-xs">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'model' && (
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={modelAvatar}
                    alt={modelName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-gray-400">{modelName}</span>
                </div>
              )}
              
              <div
                className={`px-3 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : message.type === 'gift'
                    ? 'bg-gradient-to-r from-gold/20 to-yellow-500/20 border border-gold/30 text-gold'
                    : 'bg-gray-700/50 text-white'
                }`}
              >
                {message.type === 'gift' && message.gift && (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{message.gift.icon}</span>
                    <div>
                      <div className="font-semibold">{message.gift.name}</div>
                      <div className="text-xs opacity-75">${message.gift.value}</div>
                    </div>
                  </div>
                )}
                {message.type === 'text' && (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-1 text-center">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Gift Panel */}
      {showGifts && (
        <div className="p-4 border-t border-gray-700/50 bg-gray-800/50">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {gifts.map(gift => (
              <button
                key={gift.id}
                onClick={() => handleSendGift(gift)}
                className="flex flex-col items-center p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
              >
                <span className="text-2xl mb-1">{gift.icon}</span>
                <span className="text-xs text-white">{gift.name}</span>
                <span className="text-xs text-gold">${gift.value}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowGifts(false)}
            className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            Close Gifts
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white text-sm"
            />
          </div>
          <button
            onClick={() => setShowGifts(!showGifts)}
            className="p-2 text-gold hover:text-yellow-400 transition-colors"
          >
            <Gift className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};