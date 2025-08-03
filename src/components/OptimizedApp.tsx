import React, { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { AuthProvider } from './AuthProvider';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';
import { MetaTags } from './MetaTags';
import { OfflineIndicator } from './OfflineIndicator';
import { PWAInstaller } from './PWAInstaller';
import { ServiceWorkerManager } from './ServiceWorkerManager';
import { ProductionOptimizer } from './ProductionOptimizer';
import { LanguageSelector } from './LanguageSelector';
import { ConnectionStatus } from './ConnectionStatus';
import { TelegramMiniApp } from '../telegram/miniapp';
import { CriticalComponents, LazyComponents, preloadCriticalRoutes } from '../utils/lazyLoading';
import { initializeOptimizations } from '../utils/compression';
import { initializeCodeOptimizations } from '../utils/codeOptimization';

type AppState = 'landing' | 'login' | 'home' | 'model' | 'call' | 'coins' | 'dashboard' | 'model-application' | 'model-dashboard' | 'profile-settings' | 'admin';

// Optimized component loader with caching
const ComponentLoader: React.FC<{
  component: React.ComponentType<any>;
  props: any;
  fallback?: React.ReactNode;
}> = ({ component: Component, props, fallback }) => {
  // Add error boundary for lazy components
  const [hasError, setHasError] = React.useState(false);
  
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">خطأ في تحميل المكون</h2>
          <button
            onClick={() => {
              setHasError(false);
              window.location.reload();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">خطأ في المكون</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      </div>
    }>
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

function OptimizedAppContent() {
  const { user, userProfile, loading } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedModel, setSelectedModel] = useState<any | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);
  const [showPaymentSystem, setShowPaymentSystem] = useState(false);
  const [showSupportCenter, setShowSupportCenter] = useState(false);
  const [showVerificationSystem, setShowVerificationSystem] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Initialize optimizations
  useEffect(() => {
    initializeOptimizations();
    initializeCodeOptimizations();
    preloadCriticalRoutes();
  }, []);

  // Auto-redirect based on auth state
  useEffect(() => {
    if (!loading) {
      if (user && userProfile) {
        if (currentState === 'login' || currentState === 'landing') {
          const createdAt = new Date(userProfile.created_at);
          const now = new Date();
          const isFirstTime = (now.getTime() - createdAt.getTime()) < 24 * 60 * 60 * 1000;
          
          if (isFirstTime) {
            setShowOnboarding(true);
          }
          
          setCurrentState('home');
        }
      } else {
        if (currentState !== 'login' && currentState !== 'model-application' && currentState !== 'landing') {
          setCurrentState('landing');
        }
      }
    }
  }, [user, userProfile, loading, currentState]);

  // Check if running in Telegram
  const isTelegram = window.location.search.includes('tgWebAppPlatform');

  const handleLogin = () => {
    if (userProfile) {
      const createdAt = new Date(userProfile.created_at);
      const now = new Date();
      const isFirstTime = (now.getTime() - createdAt.getTime()) < 24 * 60 * 60 * 1000;
      setIsNewUser(isFirstTime);
      setShowWelcome(isFirstTime);
      setShowOnboarding(isFirstTime);
    }
    setCurrentState('home');
  };

  const handleSelectModel = (model: any) => {
    setSelectedModel(model);
    setCurrentState('model');
    // Preload video call component
    LazyComponents.EnhancedVideoCall.preload();
  };

  const handleStartCall = (model: any) => {
    setSelectedModel(model);
    setCurrentState('call');
  };

  const handleEndCall = (duration: number) => {
    setCurrentState('home');
  };

  if (loading) {
    return <LoadingSpinner text="جاري تحميل التطبيق..." />;
  }

  const handleModelApplication = (applicationData: any) => {
    console.log('Model application submitted:', applicationData);
    alert('Application submitted successfully! We will review it within 24-48 hours.');
    setCurrentState('login');
  };

  const handleProfileSave = (userData: any) => {
    console.log('Profile updated:', userData);
    alert('Profile updated successfully!');
    setCurrentState('home');
  };

  const handlePaymentSuccess = (transactionId: string) => {
    console.log('Payment successful:', transactionId);
    alert(`Payment successful! Transaction ID: ${transactionId}`);
  };

  // Optimized component rendering with lazy loading
  const renderCurrentScreen = () => {
    const commonProps = {
      fallback: <LoadingSpinner />
    };

    switch (currentState) {
      case 'landing':
        return (
          <ComponentLoader
            component={CriticalComponents.LandingPage}
            props={{
              onGetStarted: () => setCurrentState('login'),
              onLogin: () => setCurrentState('login')
            }}
            {...commonProps}
          />
        );
      
      case 'login':
        return (
          <ComponentLoader
            component={CriticalComponents.EnhancedLoginPage}
            props={{
              onModelApplication: () => setCurrentState('model-application'),
              onModelDashboard: () => setCurrentState('model-dashboard')
            }}
            {...commonProps}
          />
        );
      
      case 'home':
        return (
          <ComponentLoader
            component={CriticalComponents.EnhancedHomePage}
            props={{ onSelectModel: handleSelectModel }}
            {...commonProps}
          />
        );
      
      case 'model':
        return selectedModel ? (
          <ComponentLoader
            component={LazyComponents.ModelProfile}
            props={{
              model: selectedModel,
              onBack: () => setCurrentState('home'),
              onStartCall: handleStartCall,
              userBalance: userProfile?.balance || 0
            }}
            {...commonProps}
          />
        ) : null;
      
      case 'call':
        return selectedModel ? (
          <ComponentLoader
            component={LazyComponents.EnhancedVideoCall}
            props={{
              model: selectedModel,
              onEndCall: handleEndCall,
              userBalance: userProfile?.balance || 0
            }}
            {...commonProps}
          />
        ) : null;
      
      case 'coins':
        return (
          <ComponentLoader
            component={LazyComponents.EnhancedCoinStore}
            props={{ onBack: () => setCurrentState('home') }}
            {...commonProps}
          />
        );
      
      case 'dashboard':
        return (
          <ComponentLoader
            component={LazyComponents.Dashboard}
            props={{
              user: userProfile,
              onBack: () => setCurrentState('home'),
              onAddCoins: () => setCurrentState('coins')
            }}
            {...commonProps}
          />
        );
      
      case 'model-application':
        return (
          <ComponentLoader
            component={LazyComponents.ModelApplication}
            props={{
              onBack: () => setCurrentState('login'),
              onSubmit: handleModelApplication
            }}
            {...commonProps}
          />
        );
      
      case 'model-dashboard':
        return (
          <ComponentLoader
            component={LazyComponents.ModelDashboard}
            props={{ onBack: () => setCurrentState('login') }}
            {...commonProps}
          />
        );
      
      case 'profile-settings':
        return (
          <ComponentLoader
            component={LazyComponents.ProfileSettings}
            props={{
              user: userProfile,
              onBack: () => setCurrentState('home'),
              onSave: handleProfileSave
            }}
            {...commonProps}
          />
        );
      
      case 'admin':
        return (
          <ComponentLoader
            component={LazyComponents.AdminDashboard}
            props={{ onBack: () => setCurrentState('login') }}
            {...commonProps}
          />
        );
      
      default:
        return (
          <ComponentLoader
            component={CriticalComponents.EnhancedLoginPage}
            props={{}}
            {...commonProps}
          />
        );
    }
  };

  const AppUI = () => (
    <>
      <MetaTags />
      <OfflineIndicator />
      <ConnectionStatus />
      
      {renderCurrentScreen()}
      
      {/* Lazy-loaded modal components */}
      {showWelcome && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.WelcomeSystem}
            props={{
              isNewUser: showWelcome,
              onClose: () => setShowWelcome(false)
            }}
          />
        </Suspense>
      )}
      
      {showOnboarding && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.UserOnboarding}
            props={{
              isOpen: showOnboarding,
              onClose: () => setShowOnboarding(false),
              userType: userProfile?.user_type || 'user'
            }}
          />
        </Suspense>
      )}

      {/* Navigation for Demo */}
      {currentState !== 'login' && currentState !== 'call' && currentState !== 'landing' && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
          <div className="mb-2">
            <LanguageSelector />
          </div>
          
          {currentState !== 'model-application' && currentState !== 'model-dashboard' && (
            <>
              <button
                onClick={() => setCurrentState('home')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Home"
              >
                🏠
              </button>
              <button
                onClick={() => setCurrentState('coins')}
                className="bg-gold hover:bg-yellow-500 text-black p-3 rounded-full shadow-lg transition-colors"
                title="Add Coins"
              >
                💰
              </button>
              <button
                onClick={() => setCurrentState('dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Dashboard"
              >
                📊
              </button>
              <button
                onClick={() => setCurrentState('profile-settings')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Profile Settings"
              >
                ⚙️
              </button>
              <button
                onClick={() => setShowSecurityCenter(true)}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Security Center"
              >
                🛡️
              </button>
              <button
                onClick={() => setShowSupportCenter(true)}
                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Support"
              >
                ❓
              </button>
              <button
                onClick={() => setShowVerificationSystem(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Verification"
              >
                ✅
              </button>
              <button
                onClick={() => setCurrentState('admin')}
                className="bg-red-800 hover:bg-red-900 text-white p-3 rounded-full shadow-lg transition-colors"
                title="Admin (Demo)"
              >
                👑
              </button>
            </>
          )}
        </div>
      )}

      {/* Lazy-loaded modal components */}
      {showSecurityCenter && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.SecurityCenter}
            props={{
              isOpen: showSecurityCenter,
              onClose: () => setShowSecurityCenter(false)
            }}
          />
        </Suspense>
      )}

      {showPaymentSystem && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.PaymentSystem}
            props={{
              isOpen: showPaymentSystem,
              onClose: () => setShowPaymentSystem(false),
              amount: paymentAmount,
              onSuccess: handlePaymentSuccess
            }}
          />
        </Suspense>
      )}

      {showSupportCenter && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.SupportCenter}
            props={{
              isOpen: showSupportCenter,
              onClose: () => setShowSupportCenter(false)
            }}
          />
        </Suspense>
      )}

      {showVerificationSystem && (
        <Suspense fallback={null}>
          <ComponentLoader
            component={LazyComponents.VerificationSystem}
            props={{
              isOpen: showVerificationSystem,
              onClose: () => setShowVerificationSystem(false),
              userType: "user"
            }}
          />
        </Suspense>
      )}

      {/* PWA Features */}
      <PWAInstaller />
      <ServiceWorkerManager />
    </>
  );

  if (isTelegram) {
    return (
      <TelegramMiniApp>
        <AppUI />
      </TelegramMiniApp>
    );
  }

  return <AppUI />;
}

function OptimizedApp() {
  return (
    <ProductionOptimizer>
      <ErrorBoundary>
        <AuthProvider>
          <OptimizedAppContent />
        </AuthProvider>
      </ErrorBoundary>
    </ProductionOptimizer>
  );
}

export default OptimizedApp;