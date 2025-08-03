import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { db, supabase } from '../lib/supabase';
import { mockModels } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useModels = (filters?: any) => {
  const queryClient = useQueryClient();

  const {
    data: models,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['models', filters],
    async () => {
      try {
        const { data, error } = await db.getModels(filters);
        if (error) throw error;
        
        // إذا لم توجد بيانات في قاعدة البيانات، استخدم البيانات التجريبية
        if (!data || data.length === 0) {
          return { data: mockModels, error: null };
        }
        
        return { data, error: null };
      } catch (error) {
        console.error('Error fetching models:', error);
        // في حالة الخطأ، استخدم البيانات التجريبية
        return { data: mockModels, error: null };
      }
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      select: (data) => data?.data || mockModels
    }
  );

  // Real-time subscription for model status updates
  useEffect(() => {
    try {
      const subscription = db.subscribeToModelStatus((payload) => {
        queryClient.invalidateQueries(['models']);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up real-time subscription:', error);
    }
  }, [queryClient]);

  return {
    models: models || mockModels,
    isLoading,
    error,
    refetch
  };
};

export const useModel = (modelId: string) => {
  return useQuery(
    ['model', modelId],
    async () => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        const model = mockModels.find(m => m.id === modelId);
        return { data: model, error: model ? null : { message: 'Model not found' } };
      }
      return db.getModel(modelId);
    },
    {
      enabled: !!modelId,
      staleTime: 2 * 60 * 1000, // 2 minutes
      select: (data) => data.data
    }
  );
};

export const useFavorites = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery(
    ['favorites', userId],
    async () => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          model_id,
          models(*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    {
      enabled: !!userId,
      select: (data) => data?.map(fav => fav.models) || []
    }
  );

  const addToFavorites = useMutation(
    async (modelId: string) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return { data: null, error: null };
      }
      
      const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, model_id: modelId });
      
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['favorites', userId]);
        toast.success('Added to favorites');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to add to favorites');
      }
    }
  );

  const removeFromFavorites = useMutation(
    async (modelId: string) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return { error: null };
      }
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('model_id', modelId);
      
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['favorites', userId]);
        toast.success('Removed from favorites');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to remove from favorites');
      }
    }
  );

  return {
    favorites: favorites || [],
    addToFavorites: addToFavorites.mutate,
    removeFromFavorites: removeFromFavorites.mutate,
    isAddingToFavorites: addToFavorites.isLoading,
    isRemovingFromFavorites: removeFromFavorites.isLoading
  };
};

export const useModelSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchModels = async (criteria: any) => {
    try {
      setIsSearching(true);
      
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        const filtered = mockModels.filter(model => 
          (!criteria.name || model.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
          (!criteria.country || model.country === criteria.country) &&
          (!criteria.rating || model.rating >= criteria.rating) &&
          (!criteria.priceRange || model.pricePerMinute <= criteria.priceRange[1]) &&
          (!criteria.availability || criteria.availability !== 'online' || model.isOnline)
        );
        setSearchResults(filtered);
        return filtered;
      }
      
      const { data, error } = await supabase.rpc('search_models', {
        search_term: criteria.name || '',
        country_filter: criteria.country || '',
        min_rating: criteria.rating || 0,
        max_price: criteria.priceRange?.[1] || 1000,
        online_only: criteria.availability === 'online'
      });

      if (error) throw error;
      
      setSearchResults(data || []);
      return data;
    } catch (error: any) {
      toast.error(error.message || 'Search failed');
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchResults,
    isSearching,
    searchModels
  };
};