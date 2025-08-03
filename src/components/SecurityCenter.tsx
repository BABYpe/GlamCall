import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, X, Flag, UserX } from 'lucide-react';

interface SecurityCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'safety' | 'privacy' | 'report' | 'block'>('safety');

  const safetyTips = [
    {
      icon: Shield,
      title: 'Never Share Personal Information',
      description: 'Keep your real name, address, phone number, and financial details private.'
    },
    {
      icon: Lock,
      title: 'Use Strong Passwords',
      description: 'Create unique, complex passwords and enable two-factor authentication.'
    },
    {
      icon: Eye,
      title: 'Be Aware of Scams',
      description: 'Never send money or gifts outside the platform. Report suspicious behavior.'
    },
    {
      icon: AlertTriangle,
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, end the conversation and report the user.'
    }
  ];

  const renderSafetyTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your Safety is Our Priority</h2>
        <p className="text-gray-400">Follow these guidelines to stay safe while using GlamCall</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="bg-gray-700/30 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Platform Security Features</h3>
        </div>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• End-to-end encrypted video calls</li>
          <li>• Secure payment processing</li>
          <li>• 24/7 moderation and monitoring</li>
          <li>• Identity verification for all models</li>
          <li>• Automatic content filtering</li>
          <li>• Quick report and block features</li>
        </ul>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Privacy Controls</h2>
        <p className="text-gray-400">Manage your privacy settings and data</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Profile Visibility</h3>
              <p className="text-gray-400 text-sm">Control who can see your profile information</p>
            </div>
            <select className="bg-gray-600 text-white px-3 py-2 rounded-lg">
              <option>Public</option>
              <option>Members Only</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Online Status</h3>
              <p className="text-gray-400 text-sm">Show when you're online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Data Collection</h3>
              <p className="text-gray-400 text-sm">Allow analytics for better experience</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h3 className="text-red-400 font-semibold mb-3">Delete Account</h3>
        <p className="text-gray-400 text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderReportTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Flag className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Report a Problem</h2>
        <p className="text-gray-400">Help us keep the community safe by reporting issues</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Report Type</label>
          <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white">
            <option>Select report type</option>
            <option>Inappropriate Content</option>
            <option>Harassment</option>
            <option>Spam</option>
            <option>Scam/Fraud</option>
            <option>Underage User</option>
            <option>Technical Issue</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">User/Model Name</label>
          <input
            type="text"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            placeholder="Enter username or model name"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
            rows={4}
            placeholder="Please provide details about the issue..."
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Evidence (Optional)</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-2">Upload screenshots or other evidence</p>
            <button type="button" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
              Choose Files
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  );

  const renderBlockTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <UserX className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Blocked Users</h2>
        <p className="text-gray-400">Manage your blocked users list</p>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Block a User</h3>
        </div>
        <div className="flex space-x-3">
          <input
            type="text"
            className="flex-1 bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white"
            placeholder="Enter username to block"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
            Block
          </button>
        </div>
      </div>

      <div className="bg-gray-700/30 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Currently Blocked (0)</h3>
        <div className="text-center py-8">
          <UserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No blocked users</p>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">Security Center</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            {[
              { id: 'safety', label: 'Safety Tips', icon: Shield },
              { id: 'privacy', label: 'Privacy', icon: Lock },
              { id: 'report', label: 'Report', icon: Flag },
              { id: 'block', label: 'Block Users', icon: UserX }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'safety' && renderSafetyTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'report' && renderReportTab()}
            {activeTab === 'block' && renderBlockTab()}
          </div>
        </div>
      </div>
    </>
  );
};