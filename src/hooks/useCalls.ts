import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { db } from '../lib/supabase';
import { mockCallHistory } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useCalls = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: calls,
    isLoading,
    error
  } = useQuery(
    ['calls', userId],
    async () => {
      try {
        const { data, error } = await db.getUserCalls(userId);
        if (error) throw error;
        
        // إذا لم توجد بيانات، استخدم البيانات التجريبية
        if (!data || data.length === 0) {
          return { data: mockCallHistory, error: null };
        }
        
        return { data, error: null };
      } catch (error) {
        console.error('Error fetching calls:', error);
        return { data: mockCallHistory, error: null };
      }
    },
    {
      enabled: !!userId,
      select: (data) => data?.data || mockCallHistory
    }
  );

  // Real-time subscription for user calls
  useEffect(() => {
    if (!userId) return;

    try {
      const subscription = db.subscribeToUserCalls(userId, (payload) => {
        queryClient.invalidateQueries(['calls', userId]);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up calls subscription:', error);
    }
  }, [userId, queryClient]);

  const startCall = useMutation(
    async ({ modelId, userId }: { modelId: string; userId: string }) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return { data: { id: `call_${Date.now()}`, model_id: modelId, user_id: userId }, error: null };
      }
      
      const callData = {
        user_id: userId,
        model_id: modelId,
        status: 'active',
        started_at: new Date().toISOString()
      };

      const { data, error } = await db.createCall(callData);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calls', userId]);
        toast.success('Call started successfully');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to start call');
      }
    }
  );

  const endCall = useMutation(
    async ({ callId, duration, cost }: { callId: string; duration: number; cost: number }) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return { data: { id: callId, duration, cost }, error: null };
      }
      
      const updates = {
        duration,
        cost,
        status: 'ended',
        ended_at: new Date().toISOString()
      };

      const { data, error } = await db.updateCall(callId, updates);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calls', userId]);
        toast.success('Call ended');
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to end call');
      }
    }
  );

  return {
    calls: calls || mockCallHistory,
    isLoading,
    error,
    startCall: startCall.mutate,
    endCall: endCall.mutate,
    isStartingCall: startCall.isLoading,
    isEndingCall: endCall.isLoading
  };
};

export const useCallStats = (userId: string) => {
  return useQuery(
    ['call-stats', userId],
    async () => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        const calls = mockCallHistory;
        const totalCalls = calls.length;
        const totalMinutes = calls.reduce((sum, call) => sum + (call.duration || 0), 0);
        const totalSpent = calls.reduce((sum, call) => sum + (call.cost || 0), 0);
        const averageRating = calls
          .filter(call => call.rating)
          .reduce((sum, call) => sum + call.rating!, 0) / 
          calls.filter(call => call.rating).length || 0;

        return {
          totalCalls,
          totalMinutes,
          totalSpent,
          averageRating
        };
      }
      
      const { data: calls } = await db.getUserCalls(userId);
      
      if (!calls) return null;

      const totalCalls = calls.length;
      const totalMinutes = calls.reduce((sum, call) => sum + (call.duration || 0), 0);
      const totalSpent = calls.reduce((sum, call) => sum + (call.cost || 0), 0);
      const averageRating = calls
        .filter(call => call.quality_rating)
        .reduce((sum, call) => sum + call.quality_rating!, 0) / 
        calls.filter(call => call.quality_rating).length || 0;

      return {
        totalCalls,
        totalMinutes,
        totalSpent,
        averageRating
      };
    },
    {
      enabled: !!userId,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  );
};