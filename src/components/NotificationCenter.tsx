import React, { useState } from 'react';
import { Bell, X, Check, Heart, Gift, Star, Clock, User } from 'lucide-react';

interface Notification {
  id: string;
  type: 'call' | 'favorite' | 'promotion' | 'system' | 'rating';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'call',
      title: 'Missed Call',
      message: 'Sofia Rodriguez tried to call you',
      timestamp: '2 minutes ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      action: {
        label: 'Call Back',
        onClick: () => console.log('Call back')
      }
    },
    {
      id: '2',
      type: 'favorite',
      title: 'Model Online',
      message: 'Emma Thompson is now online',
      timestamp: '5 minutes ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 50% extra coins on your next purchase!',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: '4',
      type: 'rating',
      title: 'Rate Your Call',
      message: 'How was your call with Isabella Silva?',
      timestamp: '2 hours ago',
      read: true,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'call': return <Bell className="w-5 h-5 text-blue-400" />;
      case 'favorite': return <Heart className="w-5 h-5 text-red-400" />;
      case 'promotion': return <Gift className="w-5 h-5 text-green-400" />;
      case 'rating': return <Star className="w-5 h-5 text-gold" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Notification Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="p-4 border-b border-gray-700/50">
              <button
                onClick={markAllAsRead}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-purple-600/10 border-l-2 border-purple-500' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="p-2 bg-gray-700/50 rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                          {notification.action && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action!.onClick();
                              }}
                              className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition-colors"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Bell className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
                <p className="text-gray-400 text-sm">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};