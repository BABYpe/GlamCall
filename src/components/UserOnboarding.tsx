import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Star, Shield, Video, Coins } from 'lucide-react';

interface UserOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'user' | 'model';
}

export const UserOnboarding: React.FC<UserOnboardingProps> = ({ isOpen, onClose, userType }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const userSteps = [
    {
      icon: Video,
      title: 'مرحباً بك في GlamCall',
      description: 'منصة المحادثات المرئية الرائدة في العالم العربي',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            أهلاً وسهلاً بك في GlamCall! نحن سعداء لانضمامك إلى مجتمعنا المتنامي.
          </p>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-2">ما يمكنك فعله:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• تصفح آلاف العارضات المتحققات</li>
              <li>• محادثات فيديو عالية الجودة</li>
              <li>• دردشة مباشرة وإرسال هدايا</li>
              <li>• أمان وخصوصية كاملة</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: Coins,
      title: 'كيفية شراء العملات',
      description: 'اشتري العملات للاستمتاع بالمحادثات',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            تحتاج إلى عملات لبدء المحادثات مع العارضات. يمكنك شراؤها بسهولة وأمان.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">باقة المبتدئ</h4>
              <div className="text-purple-400 text-xl font-bold">100 عملة</div>
              <div className="text-gray-400 text-sm">$9.99</div>
            </div>
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">الباقة الشائعة</h4>
              <div className="text-purple-400 text-xl font-bold">250 عملة</div>
              <div className="text-gray-400 text-sm">$19.99 + 25 مكافأة</div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Shield,
      title: 'الأمان والخصوصية',
      description: 'نصائح مهمة للبقاء آمناً',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            أمانك وخصوصيتك أولويتنا القصوى. اتبع هذه النصائح:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">لا تشارك معلوماتك الشخصية</h4>
                <p className="text-gray-400 text-sm">احتفظ باسمك الحقيقي وعنوانك ورقم هاتفك سرياً</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">لا ترسل أموال خارج المنصة</h4>
                <p className="text-gray-400 text-sm">جميع المدفوعات يجب أن تتم داخل التطبيق فقط</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">أبلغ عن أي سلوك مشبوه</h4>
                <p className="text-gray-400 text-sm">استخدم زر الإبلاغ إذا واجهت أي مشاكل</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const modelSteps = [
    {
      icon: Star,
      title: 'مرحباً بك كعارضة',
      description: 'ابدئي رحلتك في كسب المال',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            تهانينا! لقد انضممت إلى فريق العارضات المحترفات في GlamCall.
          </p>
          <div className="bg-gold/20 border border-gold/30 rounded-lg p-4">
            <h4 className="text-gold font-semibold mb-2">إمكانيات الكسب:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• كسب $2-10 لكل دقيقة محادثة</li>
              <li>• مكافآت وهدايا من المعجبين</li>
              <li>• دفعات أسبوعية مضمونة</li>
              <li>• تحكم كامل في أوقات العمل</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: Video,
      title: 'إعداد ملفك الشخصي',
      description: 'اجعلي ملفك جذاباً للمستخدمين',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            ملف شخصي مميز يعني المزيد من المكالمات والأرباح.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">صور عالية الجودة</h4>
                <p className="text-gray-400 text-sm">استخدمي صور واضحة وجذابة</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">وصف شخصي مميز</h4>
                <p className="text-gray-400 text-sm">اكتبي عن اهتماماتك وشخصيتك</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">حددي أسعارك</h4>
                <p className="text-gray-400 text-sm">اختاري سعراً مناسباً لكل دقيقة</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Shield,
      title: 'قواعد السلامة',
      description: 'حافظي على أمانك أثناء العمل',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            سلامتك مهمة جداً. اتبعي هذه الإرشادات:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">لا تشاركي معلومات شخصية</h4>
                <p className="text-gray-400 text-sm">احتفظي بمعلوماتك الحقيقية سرية</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">أبلغي عن السلوك غير اللائق</h4>
                <p className="text-gray-400 text-sm">نحن هنا لحمايتك ودعمك</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">استخدمي أدوات الحماية</h4>
                <p className="text-gray-400 text-sm">حظر المستخدمين المزعجين فوراً</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const steps = userType === 'model' ? modelSteps : userSteps;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-8 h-8 text-white" })}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-400">
              {steps[currentStep - 1].description}
            </p>
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
          <div className="p-6">
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
                ابدأ الاستخدام
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};