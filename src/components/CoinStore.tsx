import React from 'react';
import { ArrowLeft, Coins, CreditCard, Smartphone, Star } from 'lucide-react';
import { CoinPackage } from '../types';
import { coinPackages } from '../data/mockData';

interface CoinStoreProps {
  onBack: () => void;
  onPurchase: (packageId: string) => void;
  userBalance: number;
}

export const CoinStore: React.FC<CoinStoreProps> = ({ onBack, onPurchase, userBalance }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-gold mr-2" />
              <span className="text-white font-semibold">Current Balance: ${userBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent mb-4">
            Add Coins to Your Account
          </h1>
          <p className="text-gray-400 text-lg">
            Purchase coins to enjoy premium video calls with our models
          </p>
        </div>

        {/* Coin Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {coinPackages.map(pkg => (
            <div
              key={pkg.id}
              className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                pkg.popular 
                  ? 'border-purple-500 shadow-purple-500/20' 
                  : 'border-gray-700 hover:border-purple-500/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  ${pkg.coins}
                </div>
                <div className="text-gray-400 text-sm">coins</div>
                {pkg.bonus > 0 && (
                  <div className="text-green-400 text-sm font-semibold mt-2">
                    +${pkg.bonus} bonus!
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-white">${pkg.price}</div>
                <div className="text-gray-400 text-sm">USD</div>
              </div>

              <button
                onClick={() => onPurchase(pkg.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                }`}
              >
                Purchase
              </button>

              {pkg.bonus > 0 && (
                <div className="text-center text-xs text-gray-400 mt-2">
                  Total: ${pkg.coins + pkg.bonus} coins
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Secure Payment Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center p-4 bg-gray-700/50 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <div className="text-white font-semibold">Credit Cards</div>
                <div className="text-gray-400 text-sm">Visa, Mastercard, Amex</div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-700/50 rounded-lg">
              <Smartphone className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <div className="text-white font-semibold">Mobile Payments</div>
                <div className="text-gray-400 text-sm">Apple Pay, Google Pay</div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-400 rounded mr-3 flex items-center justify-center text-black font-bold text-sm">
                PP
              </div>
              <div>
                <div className="text-white font-semibold">PayPal</div>
                <div className="text-gray-400 text-sm">Secure & Fast</div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm space-y-2">
            <p>🔒 All transactions are encrypted and secure</p>
            <p>💳 Your payment information is never stored</p>
            <p>🔄 Instant coin delivery after payment</p>
            <p>📧 Receipt sent to your email address</p>
          </div>
        </div>

        {/* Special Offers */}
        <div className="mt-10 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="text-lg font-semibold text-white mb-2">First Purchase Bonus</h3>
              <p className="text-gray-300 text-sm">Get 50% extra coins on your first purchase!</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-lg font-semibold text-white mb-2">VIP Membership</h3>
              <p className="text-gray-300 text-sm">Purchase $100+ and unlock exclusive features!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};