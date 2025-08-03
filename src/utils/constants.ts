// App constants
export const APP_CONFIG = {
  name: 'GlamCall',
  version: '1.0.0',
  description: 'منصة المحادثات المرئية الاحترافية',
  supportEmail: 'support@glamcall.com',
  supportPhone: '+1-555-GLAMCALL',
  website: 'https://glamcall.com'
};

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
    delete: '/users/delete',
    verify: '/users/verify'
  },
  models: {
    list: '/models',
    search: '/models/search',
    profile: '/models/:id',
    apply: '/models/apply',
    update: '/models/update'
  },
  calls: {
    start: '/calls/start',
    end: '/calls/end',
    history: '/calls/history'
  },
  payments: {
    purchase: '/payments/purchase',
    history: '/payments/history',
    methods: '/payments/methods'
  }
};

// User types
export const USER_TYPES = {
  USER: 'user',
  MODEL: 'model',
  ADMIN: 'admin'
} as const;

// Model status
export const MODEL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended'
} as const;

// Call status
export const CALL_STATUS = {
  ACTIVE: 'active',
  ENDED: 'ended',
  CANCELLED: 'cancelled'
} as const;

// Transaction types
export const TRANSACTION_TYPES = {
  PURCHASE: 'purchase',
  CALL: 'call',
  TIP: 'tip',
  REFUND: 'refund',
  PAYOUT: 'payout'
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
  CRYPTO: 'crypto',
  BALANCE: 'balance'
} as const;

// Supported countries
export const COUNTRIES = [
  'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عُمان',
  'مصر', 'الأردن', 'لبنان', 'سوريا', 'فلسطين', 'العراق',
  'المغرب', 'الجزائر', 'تونس', 'ليبيا', 'السودان', 'اليمن',
  'USA', 'Canada', 'UK', 'France', 'Germany', 'Spain', 'Italy',
  'Russia', 'Brazil', 'Japan', 'China', 'India', 'Australia'
];

// Supported languages
export const LANGUAGES = [
  'العربية', 'English', 'Español', 'Français', 'Deutsch', 'Русский',
  'Português', 'Italiano', '日本語', '한국어', '中文', 'हिन्दी',
  'Türkçe', 'Nederlands', 'Svenska'
];

// Coin packages
export const COIN_PACKAGES = [
  {
    id: 'starter',
    name: 'المبتدئ',
    coins: 100,
    price: 9.99,
    bonus: 0,
    popular: false
  },
  {
    id: 'popular',
    name: 'الشائع',
    coins: 250,
    price: 19.99,
    bonus: 25,
    popular: true
  },
  {
    id: 'premium',
    name: 'المميز',
    coins: 500,
    price: 34.99,
    bonus: 75,
    popular: false
  },
  {
    id: 'vip',
    name: 'VIP',
    coins: 1000,
    price: 59.99,
    bonus: 200,
    popular: false
  }
];

// File upload limits
export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  maxFiles: 5
};

// Rate limits
export const RATE_LIMITS = {
  login: { attempts: 5, window: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  registration: { attempts: 3, window: 60 * 60 * 1000 }, // 3 attempts per hour
  passwordReset: { attempts: 3, window: 60 * 60 * 1000 }, // 3 attempts per hour
  api: { requests: 100, window: 60 * 1000 } // 100 requests per minute
};

// Feature flags
export const FEATURES = {
  TELEGRAM_INTEGRATION: true,
  CRYPTO_PAYMENTS: true,
  LIVE_STREAMING: false,
  GROUP_CALLS: false,
  MOBILE_APP: false,
  ADVANCED_ANALYTICS: true
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطأ في الاتصال بالشبكة',
  UNAUTHORIZED: 'غير مصرح لك بالوصول',
  FORBIDDEN: 'ممنوع الوصول',
  NOT_FOUND: 'الصفحة غير موجودة',
  SERVER_ERROR: 'خطأ في الخادم',
  VALIDATION_ERROR: 'خطأ في البيانات المدخلة',
  INSUFFICIENT_BALANCE: 'رصيد غير كافي',
  MODEL_OFFLINE: 'العارضة غير متصلة',
  CALL_FAILED: 'فشل في بدء المكالمة'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح',
  REGISTRATION_SUCCESS: 'تم إنشاء الحساب بنجاح',
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي',
  PAYMENT_SUCCESS: 'تم الدفع بنجاح',
  CALL_STARTED: 'تم بدء المكالمة',
  CALL_ENDED: 'تم إنهاء المكالمة',
  MESSAGE_SENT: 'تم إرسال الرسالة',
  FAVORITE_ADDED: 'تم إضافة للمفضلة',
  FAVORITE_REMOVED: 'تم إزالة من المفضلة'
};