import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerification?: boolean;
  allowedUserTypes?: ('user' | 'model')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireVerification = false,
  allowedUserTypes = ['user', 'model']
}) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access this page</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (requireVerification && userProfile && !userProfile.is_verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Verification Required</h2>
          <p className="text-gray-400 mb-6">Please verify your account to continue</p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">
            Verify Account
          </button>
        </div>
      </div>
    );
  }

  if (userProfile && !allowedUserTypes.includes(userProfile.user_type)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-6">You don't have permission to access this page</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};