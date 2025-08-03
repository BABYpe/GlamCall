import React from 'react';
import { Coins, Bell, Settings, User, Search, Menu } from 'lucide-react';

interface HeaderProps {
  userBalance: number;
  onAddCoins: () => void;
  onProfile: () => void;
  onNotifications?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userBalance,
  onAddCoins,
  onProfile,
  onNotifications,
  searchTerm,
  onSearchChange,
  onMenuToggle
}) => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
                GlamCall
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن العارضات..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Balance */}
            <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700">
              <Coins className="w-5 h-5 text-gold mr-2" />
              <span className="text-white font-semibold">${userBalance.toFixed(2)}</span>
            </div>

            {/* Add Coins Button */}
            <button
              onClick={onAddCoins}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-xl transition-all duration-200 font-medium"
            >
              إضافة عملات
            </button>

            {/* Notifications */}
            <button
              onClick={onNotifications || (() => {})}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button
              onClick={onProfile}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن العارضات..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};