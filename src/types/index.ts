export interface Model {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  country: string;
  ethnicity?: string;
  language?: string;
  languages?: string[];
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  pricePerMinute: number;
  description: string;
  tags: string[];
  totalMinutes: number;
  age?: number;
  height?: string;
  bodyType?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  balance: number;
  joinDate: string;
  country?: string;
  isVerified?: boolean;
  preferences?: {
    language: string;
    notifications: boolean;
    autoTranslate: boolean;
  };
}

export interface CallHistory {
  id: string;
  modelId: string;
  modelName: string;
  modelAvatar: string;
  duration: number;
  cost: number;
  date: string;
  rating?: number;
}

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

export interface ModelApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  languages: string[];
  age: number;
  experience: string;
  description: string;
  photos: string[];
  idDocument: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedDate?: string;
  rejectionReason?: string;
}

export interface ModelProfile extends Model {
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  stats: {
    totalCalls: number;
    totalMinutes: number;
    averageCallDuration: number;
    repeatCustomers: number;
  };
  schedule: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  paymentInfo: {
    method: 'paypal' | 'bank' | 'wise' | 'payoneer';
    details: string;
    minimumPayout: number;
  };
}

export interface Payout {
  id: string;
  modelId: string;
  amount: number;
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestDate: string;
  processedDate?: string;
  transactionId?: string;
}

export interface WelcomeMessage {
  id: string;
  type: 'welcome' | 'tips' | 'promotion' | 'safety';
  title: string;
  message: string;
  sender: string;
  avatar: string;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'gift';
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  country: string;
  userType: 'user' | 'model';
  agreeToTerms: boolean;
}