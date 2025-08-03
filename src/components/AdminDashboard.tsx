import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Shield, 
  BarChart3, 
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  TrendingUp,
  Calendar,
  MessageSquare,
  Flag
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'models' | 'reports' | 'payments' | 'settings'>('overview');

  const stats = {
    totalUsers: 15420,
    activeModels: 234,
    totalRevenue: 125430.50,
    pendingReports: 12,
    todayRevenue: 3250.75,
    onlineModels: 89
  };

  const pendingApplications = [
    { id: '1', name: 'Sarah Johnson', country: 'USA', appliedDate: '2024-12-20', status: 'pending' },
    { id: '2', name: 'Maria Garcia', country: 'Spain', appliedDate: '2024-12-19', status: 'pending' },
    { id: '3', name: 'Anna Kowalski', country: 'Poland', appliedDate: '2024-12-18', status: 'pending' }
  ];

  const recentReports = [
    { id: '1', type: 'inappropriate_content', reporter: 'User123', reported: 'Model456', date: '2024-12-20', status: 'pending' },
    { id: '2', type: 'harassment', reporter: 'User789', reported: 'User101', date: '2024-12-19', status: 'resolved' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Models</p>
              <p className="text-2xl font-bold text-white">{stats.activeModels}</p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.todayRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-gold" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Online Models</p>
              <p className="text-2xl font-bold text-white">{stats.onlineModels}</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Reports</p>
              <p className="text-2xl font-bold text-white">{stats.pendingReports}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Pending Applications</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApplications.map(app => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{app.name}</p>
                    <p className="text-gray-400 text-sm">{app.country} • {app.appliedDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium capitalize">{report.type.replace('_', ' ')}</p>
                    <p className="text-gray-400 text-sm">{report.reporter} → {report.reported}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    report.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-green-600/20 text-green-400'
                  }`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-white font-semibold">Admin Dashboard</div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'models', label: 'Models', icon: UserCheck },
            { id: 'reports', label: 'Reports', icon: Flag },
            { id: 'payments', label: 'Payments', icon: DollarSign },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
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
        {activeTab !== 'overview' && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
              <p>This section is under development and will be available soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};