import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle, X, Lock } from 'lucide-react';

interface PaymentSystemProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: (transactionId: string) => void;
}

export const PaymentSystem: React.FC<PaymentSystemProps> = ({ 
  isOpen, 
  onClose, 
  amount, 
  onSuccess 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    saveCard: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess(`TXN_${Date.now()}`);
      onClose();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Payment Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Secure Payment</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Amount Display */}
          <div className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-gray-700/50">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Amount to Pay</p>
              <p className="text-3xl font-bold text-white">${amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex space-x-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  paymentMethod === 'card'
                    ? 'border-purple-500 bg-purple-600/20 text-purple-400'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Card</div>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-purple-500 bg-purple-600/20 text-purple-400'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="w-5 h-5 mx-auto mb-1 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  PP
                </div>
                <div className="text-xs">PayPal</div>
              </button>
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`flex-1 p-3 rounded-lg border transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-purple-500 bg-purple-600/20 text-purple-400'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="w-5 h-5 mx-auto mb-1 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  ₿
                </div>
                <div className="text-xs">Crypto</div>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      cardNumber: formatCardNumber(e.target.value)
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({
                        ...formData,
                        cvv: e.target.value.replace(/\D/g, '')
                      })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.saveCard}
                      onChange={(e) => setFormData({...formData, saveCard: e.target.checked})}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-300 text-sm">Save card for future payments</span>
                  </label>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">PP</span>
                </div>
                <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your payment</p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">₿</span>
                </div>
                <p className="text-gray-300 mb-4">Pay with Bitcoin, Ethereum, or other cryptocurrencies</p>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 text-sm font-medium">Secure Payment</p>
                  <p className="text-gray-400 text-xs">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                processing
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay $${amount.toFixed(2)}`
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 text-center">
            <div className="flex items-center justify-center space-x-4 text-gray-400 text-xs">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};