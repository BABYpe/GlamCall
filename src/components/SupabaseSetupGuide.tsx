import React, { useState } from 'react';
import { Database, ExternalLink, Copy, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface SupabaseSetupGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSetupGuide: React.FC<SupabaseSetupGuideProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const migrationSQL = `-- Run this SQL in your Supabase SQL Editor
-- This will create all necessary tables and security policies

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar text,
  phone text,
  country text,
  date_of_birth date,
  is_verified boolean DEFAULT false,
  balance decimal(10,2) DEFAULT 0.00,
  total_spent decimal(10,2) DEFAULT 0.00,
  user_type text DEFAULT 'user' CHECK (user_type IN ('user', 'model')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Models table
CREATE TABLE IF NOT EXISTS models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar text NOT NULL,
  cover_image text NOT NULL,
  country text NOT NULL,
  ethnicity text,
  languages text[] DEFAULT '{}',
  age integer NOT NULL CHECK (age >= 18),
  height text,
  body_type text,
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  price_per_minute decimal(5,2) NOT NULL CHECK (price_per_minute > 0),
  is_online boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  total_minutes integer DEFAULT 0,
  total_earnings decimal(10,2) DEFAULT 0.00,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_online timestamptz
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read approved models" ON models
  FOR SELECT TO authenticated
  USING (status = 'approved');`;

  const steps = [
    {
      title: 'إنشاء مشروع Supabase',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            اذهب إلى موقع Supabase وأنشئ مشروع جديد
          </p>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Database className="w-4 h-4" />
            <span>فتح Supabase Dashboard</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">خطوات الإنشاء:</h4>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>انقر على "New Project"</li>
              <li>اختر اسماً للمشروع (مثل: glamcall-app)</li>
              <li>اختر كلمة مرور قوية لقاعدة البيانات</li>
              <li>اختر المنطقة الأقرب لك</li>
              <li>انقر على "Create new project"</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: 'الحصول على مفاتيح API',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            بعد إنشاء المشروع، احصل على مفاتيح API من إعدادات المشروع
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-400 font-semibold mb-2">كيفية الحصول على المفاتيح:</h4>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>اذهب إلى Settings → API</li>
              <li>انسخ "Project URL"</li>
              <li>انسخ "anon public" key</li>
              <li>احتفظ بهما في مكان آمن</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: 'تحديث متغيرات البيئة',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            حدث ملف .env بمفاتيح Supabase الخاصة بك
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">ملف .env</span>
              <button
                onClick={() => copyToClipboard(`VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here`, 'env')}
                className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                {copiedText === 'env' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText === 'env' ? 'تم النسخ!' : 'نسخ'}</span>
              </button>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here`}
            </pre>
          </div>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-semibold">مهم جداً:</span>
            </div>
            <p className="text-gray-300 text-sm">
              استبدل "your_project_url_here" و "your_anon_key_here" بالقيم الحقيقية من مشروعك
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'تشغيل SQL Migration',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            شغل هذا الكود في SQL Editor لإنشاء قاعدة البيانات
          </p>
          <div className="bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">SQL Migration</span>
              <button
                onClick={() => copyToClipboard(migrationSQL, 'sql')}
                className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm"
              >
                {copiedText === 'sql' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText === 'sql' ? 'تم النسخ!' : 'نسخ'}</span>
              </button>
            </div>
            <pre className="text-green-400 text-xs overflow-x-auto">
              {migrationSQL}
            </pre>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">كيفية تشغيل SQL:</h4>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>اذهب إلى SQL Editor في Supabase Dashboard</li>
              <li>انسخ والصق الكود أعلاه</li>
              <li>انقر على "Run" لتشغيل الكود</li>
              <li>تأكد من عدم وجود أخطاء</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: 'اختبار الاتصال',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            بعد إكمال الخطوات السابقة، أعد تحميل التطبيق لاختبار الاتصال
          </p>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-400 font-semibold mb-2">علامات نجاح الاتصال:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• اختفاء رسالة "إعداد قاعدة البيانات مطلوب"</li>
              <li>• إمكانية تسجيل حسابات جديدة</li>
              <li>• حفظ البيانات في قاعدة البيانات</li>
              <li>• عمل جميع الميزات بشكل طبيعي</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            إعادة تحميل التطبيق
          </button>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-white">دليل إعداد Supabase</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* Progress */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">الخطوة {currentStep} من {steps.length}</span>
              <span className="text-gray-400">{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <h2 className="text-2xl font-bold text-white mb-4">
              {steps[currentStep - 1].title}
            </h2>
            {steps[currentStep - 1].content}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-700/50">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              السابق
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
              >
                <span>التالي</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all"
              >
                إنهاء الإعداد
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};