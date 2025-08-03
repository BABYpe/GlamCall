import React from 'react';
import { ArrowLeft, Clock, Star, Calendar, TrendingUp, Coins, Settings, User } from 'lucide-react';
import { User as UserType, CallHistory } from '../types';
import { mockCallHistory } from '../data/mockData';

interface DashboardProps {
  user: UserType;
  onBack: () => void;
  onAddCoins: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onBack, onAddCoins }) => {
  const totalCalls = mockCallHistory.length;
  const totalMinutes = mockCallHistory.reduce((sum, call) => sum + call.duration, 0);
  const totalSpent = mockCallHistory.reduce((sum, call) => sum + call.cost, 0);
  const averageRating = mockCallHistory.reduce((sum, call) => sum + (call.rating || 0), 0) / mockCallHistory.filter(call => call.rating).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-gold mr-2" />
                <span className="text-white font-semibold">${user.balance.toFixed(2)}</span>
              </div>
              <button
                onClick={onAddCoins}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all"
              >
                Add Coins
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full border-4 border-purple-500"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-2">{user.email}</p>
              <p className="text-gray-400 text-sm">Member since {formatDate(user.joinDate)}</p>
            </div>
            <button className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalMinutes}</div>
                <div className="text-gray-400 text-sm">Total Minutes</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalCalls}</div>
                <div className="text-gray-400 text-sm">Total Calls</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gold/20 rounded-lg">
                <Coins className="w-6 h-6 text-gold" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">${totalSpent.toFixed(0)}</div>
                <div className="text-gray-400 text-sm">Total Spent</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-600/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</div>
                <div className="text-gray-400 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-400" />
              Recent Calls
            </h2>
          </div>

          <div className="p-6">
            {mockCallHistory.length > 0 ? (
              <div className="space-y-4">
                {mockCallHistory.map(call => (
                  <div
                    key={call.id}
                    className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                  >
                    <img
                      src={call.modelAvatar}
                      alt={call.modelName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{call.modelName}</h3>
                      <p className="text-gray-400 text-sm">{formatDate(call.date)}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{call.duration} min</div>
                      <div className="text-gray-400 text-sm">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-semibold">${call.cost.toFixed(2)}</div>
                      <div className="text-gray-400 text-sm">Cost</div>
                    </div>
                    {call.rating && (
                      <div className="text-center">
                        <div className="flex items-center text-gold">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 font-semibold">{call.rating}</span>
                        </div>
                        <div className="text-gray-400 text-sm">Rating</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No calls yet</p>
                <p className="text-gray-500 text-sm">Start your first video call to see your history here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};