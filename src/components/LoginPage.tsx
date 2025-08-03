import React, { useState } from 'react';
import { Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { EnhancedRegistration } from './EnhancedRegistration';
import { UserRegistration } from '../types';

interface LoginPageProps {
  onLogin: () => void;
  onModelApplication?: () => void;
  onModelDashboard?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onModelApplication, onModelDashboard }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showEnhancedRegistration, setShowEnhancedRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegistration = (userData: UserRegistration) => {
    console.log('تسجيل مستخدم جديد:', userData);
    // هنا يمكن إضافة منطق حفظ البيانات
    onLogin(); // تسجيل دخول تلقائي بعد التسجيل
  };

  if (showEnhancedRegistration) {
    return (
      <EnhancedRegistration
        onRegister={handleRegistration}
        onBack={() => setShowEnhancedRegistration(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
            GlamCall
          </h1>
          <p className="text-gray-400 mt-2">تجربة محادثات مرئية فاخرة</p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setShowEnhancedRegistration(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              تسجيل الدخول
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">أو المتابعة بـ</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              المتابعة بـ Google
            </button>
            <button className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              المتابعة بـ Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            بالمتابعة، فإنك توافق على{' '}
            <a href="#" className="text-purple-400 hover:underline">شروط الخدمة</a>
            {' '}و{' '}
            <a href="#" className="text-purple-400 hover:underline">سياسة الخصوصية</a>
          </p>

          {/* Model Registration Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-3">هل تريدين أن تصبحي عارضة وتكسبي المال؟</p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={onModelApplication}
                className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
              >
                تقدمي لتصبحي عارضة ←
              </button>
              <button
                onClick={onModelDashboard}
                className="text-gold hover:text-yellow-400 font-semibold text-sm transition-colors"
              >
                لوحة العارضة (تجريبي) ←
              </button>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-xs mb-2">الميزات التجريبية المتاحة:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">🛡️ مركز الأمان</span>
                  <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">💳 نظام الدفع</span>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">❓ مركز الدعم</span>
                  <span className="bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs">✅ التحقق</span>
                  <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">👑 لوحة الإدارة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};