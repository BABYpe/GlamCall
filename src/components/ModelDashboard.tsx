import React, { useState } from 'react';
import { 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp, 
  Calendar,
  Settings,
  Eye,
  EyeOff,
  Phone,
  Star,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { ModelProfile, Payout } from '../types';
import { mockModelProfile, mockPayouts } from '../data/mockData';

interface ModelDashboardProps {
  onBack: () => void;
}

export const ModelDashboard: React.FC<ModelDashboardProps> = ({ onBack }) => {
  const [isOnline, setIsOnline] = useState(mockModelProfile.isOnline);
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings' | 'schedule' | 'settings'>('overview');
  const model = mockModelProfile;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusToggle = () => {
    setIsOnline(!isOnline);
  };

  const handlePayoutRequest = () => {
    if (model.earnings.total >= model.paymentInfo.minimumPayout) {
      alert(`Payout request of ${formatCurrency(model.earnings.total)} has been submitted!`);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Status Control */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Online Status</h3>
            <p className="text-gray-400">Control your availability for video calls</p>
          </div>
          <button
            onClick={handleStatusToggle}
            className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-semibold transition-all ${
              isOnline
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {isOnline ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formatCurrency(model.earnings.today)}</div>
              <div className="text-gray-400 text-sm">Today</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{model.stats.totalMinutes}</div>
              <div className="text-gray-400 text-sm">Total Minutes</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{model.stats.totalCalls}</div>
              <div className="text-gray-400 text-sm">Total Calls</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gold/20 rounded-lg">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{model.rating}</div>
              <div className="text-gray-400 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Phone className="w-5 h-5 mr-3 text-purple-400" />
            Recent Calls
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    U{i}
                  </div>
                  <div>
                    <div className="text-white font-medium">User {i}</div>
                    <div className="text-gray-400 text-sm">2 hours ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">+$21.50</div>
                  <div className="text-gray-400 text-sm">8 minutes</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
          <div className="text-3xl font-bold text-green-400 mb-2">{formatCurrency(model.earnings.thisWeek)}</div>
          <div className="text-gray-400 text-sm">+12% from last week</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
          <div className="text-3xl font-bold text-purple-400 mb-2">{formatCurrency(model.earnings.thisMonth)}</div>
          <div className="text-gray-400 text-sm">+8% from last month</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Total Earnings</h3>
          <div className="text-3xl font-bold text-gold mb-2">{formatCurrency(model.earnings.total)}</div>
          <div className="text-gray-400 text-sm">All time</div>
        </div>
      </div>

      {/* Payout Section */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <CreditCard className="w-5 h-5 mr-3 text-green-400" />
              Payout Management
            </h3>
            <button
              onClick={handlePayoutRequest}
              disabled={model.earnings.total < model.paymentInfo.minimumPayout}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                model.earnings.total >= model.paymentInfo.minimumPayout
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Request Payout
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Available Balance:</span>
              <span className="text-2xl font-bold text-green-400">{formatCurrency(model.earnings.total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Minimum payout: {formatCurrency(model.paymentInfo.minimumPayout)}</span>
              <span className="text-gray-400">Method: {model.paymentInfo.method}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Recent Payouts</h4>
            {mockPayouts.map(payout => (
              <div key={payout.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">{formatCurrency(payout.amount)}</div>
                  <div className="text-gray-400 text-sm">{formatDate(payout.requestDate)}</div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payout.status === 'completed' ? 'bg-green-600/20 text-green-400' :
                    payout.status === 'processing' ? 'bg-yellow-600/20 text-yellow-400' :
                    payout.status === 'pending' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{payout.method}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-purple-400" />
          Weekly Schedule
        </h3>
        
        <div className="space-y-4">
          {Object.entries(model.schedule).map(([day, schedule]) => (
            <div key={day} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="text-white font-medium capitalize">{day}</span>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedule.available}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    readOnly
                  />
                  <span className="text-gray-300 text-sm">Available</span>
                </label>
              </div>
              
              {schedule.available && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <span>{schedule.start}</span>
                  <span>-</span>
                  <span>{schedule.end}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Update Schedule
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Profile Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Price Per Minute</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={model.pricePerMinute}
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                step="0.50"
                min="1"
                max="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Bio Description</label>
            <textarea
              value={model.description}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Payment Method</label>
            <select
              value={model.paymentInfo.method}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            >
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
              <option value="wise">Wise</option>
              <option value="payoneer">Payoneer</option>
            </select>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

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
              Back
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={model.avatar}
                  alt={model.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold">{model.name}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isOnline ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'earnings' && renderEarnings()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};