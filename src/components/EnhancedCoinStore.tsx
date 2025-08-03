import React, { useState } from 'react';
import { ArrowLeft, Coins, CreditCard, Smartphone, Star, Shield, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { PaymentModal } from './PaymentModal';
import { ProtectedRoute } from './ProtectedRoute';

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus: number;
  popular?: boolean;
  savings?: string;
}

interface EnhancedCoinStoreProps {
  onBack: () => void;
}

export const EnhancedCoinStore: React.FC<EnhancedCoinStoreProps> = ({ onBack }) => {
  const { userProfile } = useAuth();
  const { purchaseCoins, isPurchasing } = useTransactions(userProfile?.id || '');
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const coinPackages: CoinPackage[] = [
    {
      id: 'starter',
      name: 'المبتدئ',
      coins: 100,
      price: 9.99,
      bonus: 0
    },
    {
      id: 'popular',
      name: 'الشائع',
      coins: 250,
      price: 19.99,
      bonus: 25,
      popular: true,
      savings: 'وفر 20%'
    },
    {
      id: 'premium',
      name: 'المميز',
      coins: 500,
      price: 34.99,
      bonus: 75,
      savings: 'وفر 30%'
    },
    {
      id: 'vip',
      name: 'VIP',
      coins: 1000,
      price: 59.99,
      bonus: 200,
      savings: 'وفر 40%'
    }
  ];

  const handlePurchase = (pkg: CoinPackage) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    if (selectedPackage) {
      purchaseCoins({
        packageId: selectedPackage.id,
        amount: selectedPackage.coins + selectedPackage.bonus,
        paymentMethod: paymentData.method
      });
    }
    setShowPaymentModal(false);
    setSelectedPackage(null);
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                العودة
              </button>
              <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-gold mr-2" />
                <span className="text-white font-semibold">
                  الرصيد الحالي: ${(userProfile?.balance || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent mb-4">
              إضافة عملات لحسابك
            </h1>
            <p className="text-gray-400 text-lg">
              اشتري العملات للاستمتاع بمكالمات فيديو مميزة مع عارضاتنا
            </p>
          </div>

          {/* Security Banner */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-6 border border-green-500/20 mb-10">
            <div className="flex items-center justify-center space-x-4 text-center">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">مدفوعات آمنة ومشفرة</h3>
                <p className="text-gray-300 text-sm">جميع المعاملات محمية بتشفير SSL وتتوافق مع معايير PCI DSS</p>
              </div>
            </div>
          </div>

          {/* Coin Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coinPackages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                  pkg.popular 
                    ? 'border-purple-500 shadow-purple-500/20 ring-2 ring-purple-500/20' 
                    : 'border-gray-700 hover:border-purple-500/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      الأكثر شعبية
                    </div>
                  </div>
                )}

                {pkg.savings && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {pkg.savings}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {pkg.coins.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">عملة</div>
                  {pkg.bonus > 0 && (
                    <div className="text-green-400 text-sm font-semibold mt-2 flex items-center justify-center">
                      <span>+{pkg.bonus} مكافأة!</span>
                    </div>
                  )}
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-white">${pkg.price}</div>
                  <div className="text-gray-400 text-sm">دولار أمريكي</div>
                  {pkg.bonus > 0 && (
                    <div className="text-gray-500 text-xs mt-1">
                      المجموع: {(pkg.coins + pkg.bonus).toLocaleString()} عملة
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handlePurchase(pkg)}
                  disabled={isPurchasing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                  }`}
                >
                  {isPurchasing ? 'جاري الشراء...' : 'شراء الآن'}
                </button>

                {/* Value Proposition */}
                <div className="mt-4 text-center">
                  <div className="text-xs text-gray-400">
                    ≈ {Math.floor(pkg.coins / 3.5)} دقيقة مكالمة
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">طرق الدفع الآمنة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center p-6 bg-gray-700/50 rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <div className="text-white font-semibold">البطاقات الائتمانية</div>
                  <div className="text-gray-400 text-sm">Visa, Mastercard, Amex</div>
                </div>
              </div>

              <div className="flex items-center justify-center p-6 bg-gray-700/50 rounded-lg">
                <Smartphone className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <div className="text-white font-semibold">المحافظ الرقمية</div>
                  <div className="text-gray-400 text-sm">Apple Pay, Google Pay</div>
                </div>
              </div>

              <div className="flex items-center justify-center p-6 bg-gray-700/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center text-white font-bold text-sm">
                  PP
                </div>
                <div>
                  <div className="text-white font-semibold">PayPal</div>
                  <div className="text-gray-400 text-sm">آمن وسريع</div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-400 text-sm">
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-green-400 mb-2" />
                <span>تشفير SSL</span>
              </div>
              <div className="flex flex-col items-center">
                <Check className="w-6 h-6 text-green-400 mb-2" />
                <span>دفع فوري</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-6 h-6 text-blue-400 mb-2" />
                <span>PCI متوافق</span>
              </div>
              <div className="flex flex-col items-center">
                <Coins className="w-6 h-6 text-gold mb-2" />
                <span>إضافة فورية</span>
              </div>
            </div>
          </div>

          {/* Special Offers */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">عروض خاصة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-lg font-semibold text-white mb-2">مكافأة الشراء الأول</h3>
                <p className="text-gray-300 text-sm">احصل على 50% عملات إضافية في أول عملية شراء!</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-lg font-semibold text-white mb-2">عضوية VIP</h3>
                <p className="text-gray-300 text-sm">اشتري بقيمة 100$ أو أكثر واحصل على ميزات حصرية!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPackage && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedPackage(null);
            }}
            package={selectedPackage}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};