import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// تحقق من وجود متغيرات البيئة في الإنتاج فقط
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-anon'))) {
  console.warn('Supabase environment variables not configured. Please set up Supabase connection.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Create user profile
  createUserProfile: async (userData: any) => {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    return { data, error };
  },

  // Users
  getUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateUser: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Models
  getModels: async (filters?: any) => {
    let query = supabase
      .from('models')
      .select(`
        *,
        model_profiles(*),
        model_stats(*)
      `)
      .eq('status', 'approved');

    if (filters?.isOnline) {
      query = query.eq('is_online', true);
    }

    if (filters?.country) {
      query = query.eq('country', filters.country);
    }

    if (filters?.priceRange) {
      query = query
        .gte('price_per_minute', filters.priceRange[0])
        .lte('price_per_minute', filters.priceRange[1]);
    }

    const { data, error } = await query.order('is_online', { ascending: false });
    return { data, error };
  },

  getModel: async (modelId: string) => {
    const { data, error } = await supabase
      .from('models')
      .select(`
        *,
        model_profiles(*),
        model_stats(*),
        model_reviews(*, users(username, avatar))
      `)
      .eq('id', modelId)
      .single();
    return { data, error };
  },

  // Calls
  createCall: async (callData: any) => {
    const { data, error } = await supabase
      .from('calls')
      .insert(callData)
      .select()
      .single();
    return { data, error };
  },

  updateCall: async (callId: string, updates: any) => {
    const { data, error } = await supabase
      .from('calls')
      .update(updates)
      .eq('id', callId)
      .select()
      .single();
    return { data, error };
  },

  getUserCalls: async (userId: string) => {
    const { data, error } = await supabase
      .from('calls')
      .select(`
        *,
        models(name, avatar, country)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Transactions
  createTransaction: async (transactionData: any) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();
    return { data, error };
  },

  getUserTransactions: async (userId: string) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Real-time subscriptions
  subscribeToModelStatus: (callback: (payload: any) => void) => {
    return supabase
      .channel('model-status')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'models',
        filter: 'is_online=eq.true'
      }, callback)
      .subscribe();
  },

  subscribeToUserCalls: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`user-calls-${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'calls',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe();
  }
};