import { toast } from 'react-hot-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error?.code === 'PGRST116') {
    return 'الجدول غير موجود. يرجى إعداد قاعدة البيانات أولاً.';
  }
  
  if (error?.code === '23505') {
    return 'هذا البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل.';
  }
  
  if (error?.code === '23503') {
    return 'خطأ في البيانات المرجعية.';
  }
  
  if (error?.message?.includes('JWT')) {
    return 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.';
  }
  
  if (error?.message?.includes('network')) {
    return 'خطأ في الاتصال بالشبكة. تحقق من اتصالك بالإنترنت.';
  }
  
  return error?.message || 'حدث خطأ غير متوقع';
};

export const showErrorToast = (error: any) => {
  const message = handleSupabaseError(error);
  toast.error(message);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  errorMessage?: string
): Promise<T | null> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Operation failed:', error);
    showErrorToast(error);
    return null;
  }
};