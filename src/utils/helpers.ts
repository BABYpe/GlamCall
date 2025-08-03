import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ar } from 'date-fns/locale';

// Date formatting utilities
export const formatDate = (date: string | Date, locale: string = 'en') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (locale === 'ar') {
    return format(dateObj, 'dd/MM/yyyy', { locale: ar });
  }
  
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'HH:mm');
};

export const formatRelativeTime = (date: string | Date, locale: string = 'en') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return locale === 'ar' ? 'اليوم' : 'Today';
  }
  
  if (isYesterday(dateObj)) {
    return locale === 'ar' ? 'أمس' : 'Yesterday';
  }
  
  return formatDistanceToNow(dateObj, { 
    addSuffix: true,
    locale: locale === 'ar' ? ar : undefined
  });
};

// Currency formatting
export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Duration formatting
export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// File size formatting
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// URL utilities
export const generateAvatarUrl = (userId: string, size: number = 200) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&size=${size}`;
};

export const generateShareUrl = (type: 'model' | 'call', id: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/${type}/${id}`;
};

// Validation utilities
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const isValidUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_\u0600-\u06FF]{3,20}$/;
  return usernameRegex.test(username);
};

// Text utilities
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Array utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((groups, item) => {
    const group = item[key] as string;
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Local storage utilities
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch {
      // Handle storage errors silently
    }
  }
};

// Device detection
export const device = {
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
  isDesktop: () => !device.isMobile() && !device.isTablet(),
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: () => /Android/.test(navigator.userAgent)
};

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Error handling
export const handleError = (error: any, fallbackMessage: string = 'An error occurred') => {
  console.error('Error:', error);
  
  if (error?.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return fallbackMessage;
};

// Analytics utilities
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In production, integrate with analytics service
  console.log('Track event:', eventName, properties);
};

export const trackPageView = (pageName: string) => {
  // In production, integrate with analytics service
  console.log('Track page view:', pageName);
};