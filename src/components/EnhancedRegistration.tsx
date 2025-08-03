import React, { useState } from 'react';
import { Mail, Lock, Phone, Eye, EyeOff, User, MapPin, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import { UserRegistration } from '../types';

interface EnhancedRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const EnhancedRegistration: React.FC<EnhancedRegistrationProps> = ({ onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues
  } = useForm<UserRegistration>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      country: '',
      userType: 'user',
      agreeToTerms: false
    }
  });

  const watchedValues = watch();

  const arabicCountries = [
    'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عُمان',
    'مصر', 'الأردن', 'لبنان', 'سوريا', 'فلسطين', 'العراق',
    'المغرب', 'الجزائر', 'تونس', 'ليبيا', 'السودان', 'اليمن'
  ];

  const onSubmit = async (data: UserRegistration) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    const { data: result, error } = await signUp(data.email, data.password, {
      username: data.username,
      fullName: data.username, // يمكن إضافة حقل منفصل للاسم الكامل
      country: data.country,
      userType: data.userType,
      phone: data.phone
    });

    if (!error && result) {
      onSuccess();
    }
  };

  const handleNextStep = () => {
    const currentData = getValues();
    
    // Validate current step
    if (currentStep === 1) {
      if (!currentData.username || !currentData.country || !currentData.userType) {
        return;
      }
    } else if (currentStep === 2) {
      if (!currentData.email || !currentData.phone) {
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد</h2>
        <p className="text-gray-400">انضم إلى مجتمع GlamCall اليوم</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">نوع الحساب</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setValue('userType', 'user')}
              className={`p-4 rounded-lg border-2 transition-all ${
                watchedValues.userType === 'user'
                  ? 'border-purple-500 bg-purple-600/20 text-purple-400'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              <User className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">مستخدم</div>
              <div className="text-xs mt-1">للاستمتاع بالمحادثات</div>
            </button>
            <button
              type="button"
              onClick={() => setValue('userType', 'model')}
              className={`p-4 rounded-lg border-2 transition-all ${
                watchedValues.userType === 'model'
                  ? 'border-purple-500 bg-purple-600/20 text-purple-400'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">★</span>
              </div>
              <div className="font-semibold">عارضة</div>
              <div className="text-xs mt-1">لكسب المال</div>
            </button>
          </div>
          {errors.userType && (
            <p className="mt-1 text-sm text-red-400">{errors.userType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">اسم المستخدم</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('username')}
              type="text"
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.username ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="اختر اسم مستخدم فريد"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">البلد</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              {...register('country')}
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                errors.country ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="">اختر بلدك</option>
              {arabicCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          {errors.country && (
            <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">معلومات الاتصال</h2>
        <p className="text-gray-400">أدخل بياناتك للتواصل</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('email')}
              type="email"
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">رقم الهاتف</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('phone')}
              type="tel"
              className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.phone ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="+966 50 123 4567"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">كلمة المرور</h2>
        <p className="text-gray-400">اختر كلمة مرور قوية لحسابك</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="كلمة مرور قوية"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">تأكيد كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="أعد كتابة كلمة المرور"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('agreeToTerms')}
              type="checkbox"
              className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 mt-0.5"
            />
            <span className="text-gray-300 text-sm leading-relaxed">
              أوافق على{' '}
              <a href="#" className="text-purple-400 hover:underline">شروط الخدمة</a>
              {' '}و{' '}
              <a href="#" className="text-purple-400 hover:underline">سياسة الخصوصية</a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-400">{errors.agreeToTerms.message}</p>
          )}
        </div>

        {watchedValues.userType === 'model' && (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-purple-400 font-semibold mb-2">للعارضات:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• يجب أن تكوني 18 سنة أو أكثر</li>
              <li>• ستحتاجين لتأكيد هويتك</li>
              <li>• يمكنك تحديد أسعارك الخاصة</li>
              <li>• دفعات أسبوعية مضمونة</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent">
            GlamCall
          </h1>
          <p className="text-gray-400 mt-2">منصة المحادثات المرئية الرائدة</p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">الخطوة {currentStep} من 3</span>
              <span className="text-gray-400 text-sm">{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => currentStep === 1 ? onBack() : setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
              >
                {currentStep === 1 ? 'العودة' : 'السابق'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || loading || !watchedValues.agreeToTerms}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                    isSubmitting || loading || !watchedValues.agreeToTerms
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                  }`}
                >
                  {isSubmitting || loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>جاري الإنشاء...</span>
                    </>
                  ) : (
                    <span>إنشاء الحساب</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};