import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, Shield, Bell, CreditCard } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileSettingsProps {
  user: UserType;
  onBack: () => void;
  onSave: (userData: Partial<UserType>) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'billing'>('profile');
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: '',
    location: '',
    bio: '',
    avatar: user.avatar
  });

  const [notifications, setNotifications] = useState({
    modelOnline: true,
    promotions: true,
    callReminders: true,
    newMessages: true
  });

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    allowDirectMessages: true,
    showCallHistory: false,
    dataCollection: true
  });

  const handleSave = () => {
    onSave(formData);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={formData.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-500"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Profile Photo</h3>
          <p className="text-gray-400 text-sm mb-3">Upload a clear photo of yourself</p>
          <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
            Change Photo
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="City, Country"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
          rows={4}
          placeholder="Tell us about yourself..."
        />
        <p className="text-gray-400 text-sm mt-1">{formData.bio.length}/500 characters</p>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
      
      {Object.entries(privacy).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
          <div>
            <h4 className="text-white font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p className="text-gray-400 text-sm">
              {key === 'showOnlineStatus' && 'Let others see when you\'re online'}
              {key === 'allowDirectMessages' && 'Allow models to send you direct messages'}
              {key === 'showCallHistory' && 'Show your call history to others'}
              {key === 'dataCollection' && 'Allow data collection for better experience'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
      
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
          <div>
            <h4 className="text-white font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p className="text-gray-400 text-sm">
              {key === 'modelOnline' && 'Get notified when your favorite models come online'}
              {key === 'promotions' && 'Receive notifications about special offers and promotions'}
              {key === 'callReminders' && 'Get reminders about scheduled calls'}
              {key === 'newMessages' && 'Receive notifications for new messages'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Billing & Payment</h3>
      
      <div className="bg-gray-700/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium">Current Balance</h4>
          <span className="text-2xl font-bold text-purple-400">${user.balance.toFixed(2)}</span>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
          Add Coins
        </button>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h4 className="text-white font-medium mb-4">Payment Methods</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">•••• •••• •••• 1234</p>
                <p className="text-gray-400 text-sm">Expires 12/25</p>
              </div>
            </div>
            <button className="text-purple-400 hover:text-purple-300 text-sm">Edit</button>
          </div>
          <button className="w-full py-3 border-2 border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 rounded-lg transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'billing', label: 'Billing', icon: CreditCard }
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

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'privacy' && renderPrivacyTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'billing' && renderBillingTab()}

          {/* Save Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};