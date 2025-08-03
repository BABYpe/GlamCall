import * as yup from 'yup';

// User registration validation
export const registrationSchema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_\u0600-\u06FF]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
    .required('Password is required'),
  
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  
  phone: yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  
  country: yup.string().required('Country is required'),
  
  userType: yup.string()
    .oneOf(['user', 'model'], 'Invalid user type')
    .required('User type is required'),
  
  agreeToTerms: yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions')
});

// Model application validation
export const modelApplicationSchema = yup.object({
  fullName: yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  
  age: yup.number()
    .min(18, 'Must be at least 18 years old')
    .max(65, 'Must be under 65 years old')
    .required('Age is required'),
  
  country: yup.string().required('Country is required'),
  
  languages: yup.array()
    .of(yup.string())
    .min(1, 'At least one language is required')
    .required('Languages are required'),
  
  experience: yup.string()
    .oneOf(['beginner', 'intermediate', 'experienced', 'expert'])
    .required('Experience level is required'),
  
  pricePerMinute: yup.number()
    .min(1, 'Price must be at least $1 per minute')
    .max(50, 'Price cannot exceed $50 per minute')
    .required('Price per minute is required'),
  
  description: yup.string()
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .required('Description is required')
});

// Profile update validation
export const profileUpdateSchema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_\u0600-\u06FF]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  fullName: yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name cannot exceed 50 characters'),
  
  phone: yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  
  country: yup.string(),
  
  bio: yup.string()
    .max(500, 'Bio cannot exceed 500 characters')
    .optional()
});

// Payment validation
export const paymentSchema = yup.object({
  cardNumber: yup.string()
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number format')
    .required('Card number is required'),
  
  expiryDate: yup.string()
    .matches(/^\d{2}\/\d{2}$/, 'Invalid expiry date format')
    .required('Expiry date is required'),
  
  cvv: yup.string()
    .matches(/^\d{3,4}$/, 'Invalid CVV')
    .required('CVV is required'),
  
  cardName: yup.string()
    .min(2, 'Cardholder name must be at least 2 characters')
    .required('Cardholder name is required'),
  
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required')
});

// Utility functions
export const validateAge = (dateOfBirth: string): boolean => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Luhn algorithm for card validation
  const digits = cardNumber.replace(/\s/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const getCardType = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^3[47]/.test(number)) return 'amex';
  if (/^6/.test(number)) return 'discover';
  
  return 'unknown';
};