import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { EnhancedRegistration } from './EnhancedRegistration';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

interface LoginFormData {
  email: string;
  password: string;
}

interface EnhancedLoginPageProps {
  onModelApplication?: () => void;
  onModelDashboard?: () => void;
}

export const EnhancedLoginPage: React.FC<EnhancedLoginPageProps> = ({ 
  onModelApplication, 
  onModelDashboard 
}) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    await signIn(data.email, data.password);
  };

  if (showRegistration) {
    return (
      <EnhancedRegistration
        onBack={() => setShowRegistration(false)}
        onSuccess={() => {
          setShowRegistration(false);
          // The auth state will automatically redirect to home
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
            GlamCall
          </h1>
          <p className="text-gray-400 mt-2">منصة المحادثات المرئية الاحترافية</p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-700/50 rounded-lg p-1">
            <button
              type="button"
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium bg-purple-600 text-white shadow-lg transition-all"
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => setShowRegistration(true)}
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-400 hover:text-white transition-all"
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-300 text-sm">تذكرني</span>
              </label>
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {(isSubmitting || loading) ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <span>تسجيل الدخول</span>
              )}
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
            <button 
              type="button"
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>المتابعة بـ Google</span>
            </button>
            
            <button 
              type="button"
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>المتابعة بـ Apple</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            بالمتابعة، فإنك توافق على{' '}
            <a href="#" className="text-purple-400 hover:underline">شروط الخدمة</a>
            {' '}و{' '}
            <a href="#" className="text-purple-400 hover:underline">سياسة الخصوصية</a>
          </p>

          {/* Model Registration Links */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-3">هل تريدين أن تصبحي عارضة وتكسبي المال؟</p>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={onModelApplication}
                className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
              >
                تقدمي لتصبحي عارضة ←
              </button>
              <button
                type="button"
                onClick={onModelDashboard}
                className="text-gold hover:text-yellow-400 font-semibold text-sm transition-colors"
              >
                لوحة العارضة (تجريبي) ←
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};