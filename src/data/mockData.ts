import { Model, User, CallHistory, CoinPackage } from '../types';
import { ModelProfile, Payout } from '../types';
import { arabicModels } from './arabicModels';
import { globalModels } from './globalModels';
import { mockUsers } from './mockUsers';

export const originalModels: Model[] = [
  {
    id: '1',
    name: 'Sofia Rodriguez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'Spain',
    language: 'Spanish, English',
    rating: 4.9,
    reviewCount: 234,
    isOnline: true,
    pricePerMinute: 3.50,
    description: 'Passionate dancer and model from Barcelona. Love to chat about art, culture, and life experiences.',
    tags: ['Dancing', 'Art', 'Culture', 'Lifestyle'],
    totalMinutes: 1250
  },
  {
    id: '2',
    name: 'Emma Thompson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'UK',
    language: 'English',
    rating: 4.8,
    reviewCount: 189,
    isOnline: false,
    pricePerMinute: 4.00,
    description: 'British model and actress. Love discussing movies, books, and British culture.',
    tags: ['Movies', 'Literature', 'British Culture'],
    totalMinutes: 980
  },
  {
    id: '3',
    name: 'Yuki Tanaka',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'Japan',
    language: 'Japanese, English',
    rating: 4.7,
    reviewCount: 156,
    isOnline: true,
    pricePerMinute: 3.20,
    description: 'Tokyo-based model interested in anime, gaming, and Japanese traditions.',
    tags: ['Anime', 'Gaming', 'Japanese Culture'],
    totalMinutes: 750
  },
  {
    id: '4',
    name: 'Isabella Silva',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'Brazil',
    language: 'Portuguese, English',
    rating: 4.9,
    reviewCount: 298,
    isOnline: true,
    pricePerMinute: 2.80,
    description: 'Brazilian model who loves beach volleyball, music, and vibrant conversations.',
    tags: ['Sports', 'Music', 'Beach Life'],
    totalMinutes: 1580
  }
];

// دمج جميع العارضات (الأصليات + العربيات + العالميات)
export const mockModels: Model[] = [
  ...originalModels.map(model => ({
    ...model,
    languages: model.language ? [model.language] : ['English']
  })),
  ...arabicModels.map(model => ({
    ...model,
    languages: model.language ? model.language.split('، ') : ['العربية']
  })),
  ...globalModels.map(model => ({
    ...model,
    languages: model.language ? model.language.split(', ') : ['English']
  }))
];

// استخدام أول مستخدم من قائمة المستخدمين العرب
export const mockUser: User = mockUsers[0];

// تصدير جميع المستخدمين
export { mockUsers };

export const mockCallHistory: CallHistory[] = [
  {
    id: 'call-1',
    modelId: '1',
    modelName: 'Sofia Rodriguez',
    modelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 12,
    cost: 42.00,
    date: '2024-12-20T19:30:00Z',
    rating: 5
  },
  {
    id: 'call-2',
    modelId: '4',
    modelName: 'Isabella Silva',
    modelAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 8,
    cost: 22.40,
    date: '2024-12-19T21:15:00Z',
    rating: 4
  }
];

export const coinPackages: CoinPackage[] = [
  {
    id: 'package-1',
    name: 'Starter',
    coins: 100,
    price: 9.99,
    bonus: 0
  },
  {
    id: 'package-2',
    name: 'Popular',
    coins: 250,
    price: 19.99,
    bonus: 25,
    popular: true
  },
  {
    id: 'package-3',
    name: 'Premium',
    coins: 500,
    price: 34.99,
    bonus: 75
  },
  {
    id: 'package-4',
    name: 'VIP',
    coins: 1000,
    price: 59.99,
    bonus: 200
  }
];

export const mockModelProfile: ModelProfile = {
  id: '1',
  name: 'Sofia Rodriguez',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
  country: 'Spain',
  language: 'Spanish, English',
  rating: 4.9,
  reviewCount: 234,
  isOnline: true,
  pricePerMinute: 3.50,
  description: 'Passionate dancer and model from Barcelona. Love to chat about art, culture, and life experiences.',
  tags: ['Dancing', 'Art', 'Culture', 'Lifestyle'],
  totalMinutes: 1250,
  earnings: {
    today: 125.50,
    thisWeek: 890.25,
    thisMonth: 3250.75,
    total: 15420.00
  },
  stats: {
    totalCalls: 234,
    totalMinutes: 1250,
    averageCallDuration: 5.3,
    repeatCustomers: 89
  },
  schedule: {
    monday: { start: '18:00', end: '02:00', available: true },
    tuesday: { start: '18:00', end: '02:00', available: true },
    wednesday: { start: '18:00', end: '02:00', available: true },
    thursday: { start: '18:00', end: '02:00', available: true },
    friday: { start: '20:00', end: '04:00', available: true },
    saturday: { start: '20:00', end: '04:00', available: true },
    sunday: { start: '16:00', end: '00:00', available: false }
  },
  paymentInfo: {
    method: 'paypal',
    details: 'sofia.rodriguez@email.com',
    minimumPayout: 50
  }
};

export const mockPayouts: Payout[] = [
  {
    id: 'payout-1',
    modelId: '1',
    amount: 450.00,
    method: 'PayPal',
    status: 'completed',
    requestDate: '2024-12-15T10:00:00Z',
    processedDate: '2024-12-16T14:30:00Z',
    transactionId: 'PP-12345678'
  },
  {
    id: 'payout-2',
    modelId: '1',
    amount: 320.75,
    method: 'PayPal',
    status: 'processing',
    requestDate: '2024-12-20T09:15:00Z'
  }
];