import React from 'react';
import { Database, AlertCircle, ExternalLink, Settings } from 'lucide-react';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';
import { SupabaseSetupGuide } from './SupabaseSetupGuide';

export const SupabaseConnectionBanner: React.FC = () => {
  const { isConnected, isLoading, error } = useSupabaseConnection();
  const [showSetupGuide, setShowSetupGuide] = React.useState(false);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-blue-400 font-semibold">جاري فحص اتصال قاعدة البيانات...</span>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-green-400" />
          <div>
            <h3 className="text-green-400 font-semibold">قاعدة البيانات متصلة بنجاح</h3>
            <p className="text-gray-300 text-sm">جميع الميزات متاحة الآن</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-2">
              {error ? 'خطأ في الاتصال بقاعدة البيانات' : 'إعداد قاعدة البيانات مطلوب'}
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {error ? 
                `خطأ: ${error}` : 
                'التطبيق يعمل حالياً بالبيانات التجريبية. لتفعيل جميع الميزات، يرجى ربط قاعدة بيانات Supabase.'
              }
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSetupGuide(true)}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>دليل الإعداد المفصل</span>
              </button>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Database className="w-4 h-4" />
                <span>فتح Supabase</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <SupabaseSetupGuide
        isOpen={showSetupGuide}
        onClose={() => setShowSetupGuide(false)}
      />
    </>
  );
};