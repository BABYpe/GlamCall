import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'أحمد_محمد',
    email: 'ahmed.mohamed@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    balance: 250.75,
    joinDate: '2024-01-15',
    country: 'السعودية',
    isVerified: true,
    preferences: {
      language: 'العربية',
      notifications: true,
      autoTranslate: false
    }
  },
  {
    id: 'user-2',
    username: 'محمد_العلي',
    email: 'mohammed.ali@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    balance: 180.50,
    joinDate: '2024-02-20',
    country: 'الإمارات',
    isVerified: true,
    preferences: {
      language: 'العربية',
      notifications: true,
      autoTranslate: true
    }
  },
  {
    id: 'user-3',
    username: 'عبدالله_الخالد',
    email: 'abdullah.khalid@example.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    balance: 320.25,
    joinDate: '2024-01-08',
    country: 'الكويت',
    isVerified: false,
    preferences: {
      language: 'العربية',
      notifications: false,
      autoTranslate: false
    }
  },
  {
    id: 'user-4',
    username: 'يوسف_المصري',
    email: 'youssef.masri@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    balance: 95.80,
    joinDate: '2024-03-12',
    country: 'مصر',
    isVerified: true,
    preferences: {
      language: 'العربية',
      notifications: true,
      autoTranslate: true
    }
  },
  {
    id: 'user-5',
    username: 'خالد_التونسي',
    email: 'khalid.tunisi@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    balance: 450.00,
    joinDate: '2024-01-25',
    country: 'تونس',
    isVerified: true,
    preferences: {
      language: 'العربية',
      notifications: true,
      autoTranslate: false
    }
  }
];