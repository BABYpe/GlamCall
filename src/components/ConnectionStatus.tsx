import React from 'react';
import { Wifi, WifiOff, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';

export const ConnectionStatus: React.FC = () => {
  const { isConnected, isLoading, error } = useSupabaseConnection();

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 bg-gray-900/90 backdrop-blur-lg rounded-lg border border-gray-700 px-3 py-2 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-blue-400 text-sm">فحص الاتصال...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 bg-gray-900/90 backdrop-blur-lg rounded-lg border border-gray-700 px-3 py-2 z-50">
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">متصل</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">غير متصل</span>
          </>
        )}
      </div>
    </div>
  );
};