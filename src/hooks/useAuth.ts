import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { auth, db } from '../lib/supabase';
import { showErrorToast, showSuccessToast, withErrorHandling } from '../utils/errorHandling';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    auth.getCurrentUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        loadUserProfile(user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    await withErrorHandling(async () => {
      const { data, error } = await db.getUser(userId);
      if (error) throw error;
      setUserProfile(data);
    }, 'فشل في تحميل الملف الشخصي');
  };

  const signUp = async (email: string, password: string, userData: any) => {
    return await withErrorHandling(async () => {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || 
          import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        throw new Error('Supabase is not configured. Please set up your Supabase project first.');
      }
      
      const { data, error } = await auth.signUp(email, password, {
        username: userData.username,
        full_name: userData.fullName,
        country: userData.country,
        user_type: userData.userType,
        phone: userData.phone
      });

      if (error) throw error;

      // Create user profile in users table
      if (data.user) {
        const { error: profileError } = await db.createUserProfile({
          id: data.user.id,
          email: data.user.email!,
          username: userData.username,
          full_name: userData.fullName,
          country: userData.country,
          user_type: userData.userType,
          phone: userData.phone
        });
        
        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }

      showSuccessToast('تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني.');
      return { data, error: null };
    }, 'فشل في إنشاء الحساب').finally(() => {
      setLoading(false);
    });
  };

  const signIn = async (email: string, password: string) => {
    return await withErrorHandling(async () => {
      setLoading(true);
      
      const { data, error } = await auth.signIn(email, password);
      
      if (error) throw error;

      // Update last login
      if (data.user) {
        await db.updateUser(data.user.id, { last_login: new Date().toISOString() });
      }

      showSuccessToast('مرحباً بعودتك!');
      return { data, error: null };
    }, 'فشل في تسجيل الدخول').finally(() => {
      setLoading(false);
    });
  };

  const signOut = async () => {
    await withErrorHandling(async () => {
      setLoading(true);
      const { error } = await auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProfile(null);
      showSuccessToast('تم تسجيل الخروج بنجاح');
    }, 'فشل في تسجيل الخروج').finally(() => {
      setLoading(false);
    });
  };

  const updateProfile = async (updates: any) => {
    return await withErrorHandling(async () => {
      if (!user) throw new Error('No user logged in');
      
      const { data, error } = await db.updateUser(user.id, updates);
      if (error) throw error;
      
      setUserProfile(data);
      showSuccessToast('تم تحديث الملف الشخصي بنجاح');
      return { data, error: null };
    }, 'فشل في تحديث الملف الشخصي');
  };

  return {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };
};

export { AuthContext };