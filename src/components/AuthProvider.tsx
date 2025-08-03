import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthContext, useAuthProvider } from '../hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1F2937',
              color: '#F3F4F6',
              border: '1px solid #374151'
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#F3F4F6'
              }
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#F3F4F6'
              }
            }
          }}
        />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};