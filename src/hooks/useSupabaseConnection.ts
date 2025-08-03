import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Test connection by trying to fetch from a simple table
        const { data, error } = await supabase
          .from('users')
          .select('count')
          .limit(1);

        if (error) {
          throw error;
        }

        setIsConnected(true);
      } catch (err: any) {
        console.error('Supabase connection error:', err);
        setError(err.message || 'Failed to connect to Supabase');
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Only check if environment variables are configured
    if (import.meta.env.VITE_SUPABASE_URL && 
        !import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
      checkConnection();
    } else {
      setIsLoading(false);
      setIsConnected(false);
      setError('Supabase environment variables not configured');
    }
  }, []);

  const reconnect = () => {
    if (import.meta.env.VITE_SUPABASE_URL && 
        !import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
      setIsLoading(true);
      setError(null);
      // Trigger re-check
      window.location.reload();
    }
  };

  return {
    isConnected,
    isLoading,
    error,
    reconnect
  };
};