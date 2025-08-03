import { useQuery, useMutation, useQueryClient } from 'react-query';
import { db } from '../lib/supabase';
import { mockUser } from '../data/mockData';
import { toast } from 'react-hot-toast';

export const useTransactions = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: transactions,
    isLoading,
    error
  } = useQuery(
    ['transactions', userId],
    async () => {
      try {
        const { data, error } = await db.getUserTransactions(userId);
        if (error) throw error;
        return { data: [], error: null };
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return { data: [], error: null };
      }
    },
    {
      enabled: !!userId,
      select: (data) => data.data || []
    }
  );

  const createTransaction = useMutation(
    async (transactionData: any) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        return { data: { id: `txn_${Date.now()}`, ...transactionData }, error: null };
      }
      
      const { data, error } = await db.createTransaction({
        ...transactionData,
        user_id: userId
      });
      
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transactions', userId]);
        queryClient.invalidateQueries(['user', userId]);
      },
      onError: (error: any) => {
        toast.error(error.message || 'Transaction failed');
      }
    }
  );

  const purchaseCoins = useMutation(
    async ({ packageId, amount, paymentMethod }: { 
      packageId: string; 
      amount: number; 
      paymentMethod: string;
    }) => {
      // استخدام البيانات التجريبية إذا لم يتم إعداد Supabase
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
        toast.success(`تم شراء ${amount} عملة بنجاح!`);
        return { data: { id: `txn_${Date.now()}` }, error: null };
      }
      
      // Create transaction record
      const transactionData = {
        type: 'purchase',
        amount,
        payment_method: paymentMethod,
        description: `Coin purchase - Package ${packageId}`,
        metadata: { packageId }
      };

      const { data, error } = await createTransaction.mutateAsync(transactionData);
      
      if (error) throw error;

      // In a real app, this would integrate with payment processors
      // For now, we'll simulate successful payment
      setTimeout(async () => {
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')) {
          return;
        }
        
        // Update transaction status
        await db.updateTransaction(data.id, { 
          status: 'completed',
          payment_id: `pay_${Date.now()}`
        });

        // Update user balance
        if (userId) {
          await db.updateUser(userId, {
            balance: (mockUser?.balance || 0) + amount
          });
        }

        queryClient.invalidateQueries(['transactions', userId]);
        queryClient.invalidateQueries(['user', userId]);
        toast.success(`تم إضافة ${amount} عملة لحسابك بنجاح!`);
      }, 2000);

      return data;
    },
    {
      onError: (error: any) => {
        toast.error(error.message || 'Purchase failed');
      }
    }
  );

  return {
    transactions: transactions || [],
    isLoading,
    error,
    createTransaction: createTransaction.mutate,
    purchaseCoins: purchaseCoins.mutate,
    isPurchasing: purchaseCoins.isLoading
  };
};