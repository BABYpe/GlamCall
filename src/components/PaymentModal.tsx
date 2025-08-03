import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreditCard, Shield, X, Lock, Loader2 } from 'lucide-react';

const paymentSchema = yup.object({
  cardNumber: yup.string()
    .required('Card number is required')
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number format'),
  expiryDate: yup.string()
    .required('Expiry date is required')
    .matches(/^\d{2}\/\d{2}$/, 'Invalid expiry date format'),
  cvv: yup.string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'Invalid CVV'),
  cardName: yup.string().required('Cardholder name is required'),
  email: yup.string().email('Invalid email').required('Email is required')
});

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  email: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: {
    id: string;
    name: string;
    coins: number;
    price: number;
    bonus: number;
  };
  onSuccess: (paymentData: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  package: pkg, 
  onSuccess 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema)
  });

  const cardNumber = watch('cardNumber');
  const expiryDate = watch('expiryDate');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const onSubmit = async (data: PaymentFormData) => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess({
        method: paymentMethod,
        transactionId: `txn_${Date.now()}`,
        amount: pkg.price
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Payment Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">دفع آمن</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Package Summary */}
          <div className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-gray-700/50">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                <span>{pkg.coins.toLocaleString()} عملة</span>
                {pkg.bonus > 0 && (
                  <>
                    <span>+</span>
                    <span className="text-green-400">{pkg.bonus} مكافأة</span>
                  </>
                )}
              </div>
              <div className="text-3xl font-bold text-white mt-2">${pkg.price}</div>
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
                <div className="text-xs">بطاقة</div>
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
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">رقم البطاقة</label>
                  <input
                    {...register('cardNumber')}
                    type="text"
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setValue('cardNumber', formatted);
                    }}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-400">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">تاريخ الانتهاء</label>
                    <input
                      {...register('expiryDate')}
                      type="text"
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        setValue('expiryDate', formatted);
                      }}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-400">{errors.expiryDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                    <input
                      {...register('cvv')}
                      type="text"
                      className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white ${
                        errors.cvv ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-400">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">اسم حامل البطاقة</label>
                  <input
                    {...register('cardName')}
                    type="text"
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white ${
                      errors.cardName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="الاسم كما يظهر على البطاقة"
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-400">{errors.cardName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="للإيصال"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">PP</span>
                </div>
                <p className="text-gray-300 mb-4">سيتم توجيهك إلى PayPal لإكمال الدفع</p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">₿</span>
                </div>
                <p className="text-gray-300 mb-4">ادفع بالبيتكوين أو العملات الرقمية الأخرى</p>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 text-sm font-medium">دفع آمن</p>
                  <p className="text-gray-400 text-xs">معلومات الدفع مشفرة وآمنة</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                processing || isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
              }`}
            >
              {(processing || isSubmitting) ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري المعالجة...</span>
                </>
              ) : (
                <span>دفع ${pkg.price}</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 text-center">
            <div className="flex items-center justify-center space-x-4 text-gray-400 text-xs">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>تشفير SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>متوافق مع PCI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};