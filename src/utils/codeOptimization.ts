// Code optimization utilities for production builds

// Optimized Lucide React imports (individual icons) for tree shaking
export { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Heart,
  Star,
  User,
  Settings,
  Home,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Plus,
  Minus,
  Edit,
  Delete,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  Bell,
  Shield,
  Globe,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  CreditCard,
  Coins,
  Gift,
  Camera,
  Image,
  Upload,
  Download,
  Share,
  Copy,
  ExternalLink,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  MessageCircle,
  Send,
  Smile,
  Flag,
  UserX,
  Users,
  Crown,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Wifi,
  WifiOff,
  Database,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  Tablet,
  Laptop
} from 'lucide-react';

// Bundle splitting strategies
export const bundleSplittingConfig = {
  // Vendor chunks
  vendor: {
    react: ['react', 'react-dom'],
    ui: ['lucide-react'],
    forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
    i18n: ['i18next', 'react-i18next'],
    utils: ['date-fns', 'uuid'],
    supabase: ['@supabase/supabase-js']
  },
  
  // Feature-based chunks
  features: {
    auth: ['src/components/EnhancedLoginPage', 'src/components/EnhancedRegistration'],
    models: ['src/components/ModelCard', 'src/components/ModelProfile'],
    calls: ['src/components/EnhancedVideoCall', 'src/components/LiveChat'],
    payments: ['src/components/EnhancedCoinStore', 'src/components/PaymentSystem'],
    admin: ['src/components/AdminDashboard', 'src/components/SecurityCenter']
  }
};

// Code minification helpers
export const minifyInlineStyles = (styles: string): string => {
  return styles
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .replace(/:\s*/g, ':')
    .trim();
};

export const minifyClassName = (className: string): string => {
  return className
    .split(' ')
    .filter(Boolean)
    .join(' ');
};

// Dead code elimination
export const removeDeadCode = () => {
  // Remove unused functions and variables in production
  if (import.meta.env.PROD) {
    // Remove development-only code
    const devOnlyElements = document.querySelectorAll('[data-dev-only]');
    devOnlyElements.forEach(element => element.remove());
    
    // Remove debug attributes
    const debugElements = document.querySelectorAll('[data-debug]');
    debugElements.forEach(element => {
      element.removeAttribute('data-debug');
    });
  }
};

// CSS optimization
export const optimizeCSS = () => {
  // Remove unused CSS custom properties
  const removeUnusedCSSVars = () => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary: #8B5CF6;
        --secondary: #EC4899;
        --accent: #F59E0B;
        --background: #0f0f0f;
        --surface: #1f1f1f;
        --text: #ffffff;
        --text-muted: #9ca3af;
        --border: #374151;
        --success: #10b981;
        --warning: #f59e0b;
        --error: #ef4444;
      }
    `;
    document.head.appendChild(style);
  };
  
  // Critical CSS inlining
  const inlineCriticalCSS = () => {
    const criticalCSS = `
      body{font-family:'Inter',sans-serif;background:#0f0f0f;color:#fff;margin:0}
      .loading{display:flex;justify-content:center;align-items:center;min-height:100vh}
      .btn{padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;transition:all 0.2s}
      .btn-primary{background:linear-gradient(45deg,#8B5CF6,#EC4899);color:#fff}
      .card{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:1rem}
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  };
  
  removeUnusedCSSVars();
  inlineCriticalCSS();
};

// JavaScript optimization
export const optimizeJavaScript = () => {
  // Debounce expensive operations
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  // Throttle high-frequency events
  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // Optimize scroll events
  const optimizedScrollHandler = throttle(() => {
    // Handle scroll events efficiently
  }, 16); // 60fps
  
  // Optimize resize events
  const optimizedResizeHandler = debounce(() => {
    // Handle resize events efficiently
  }, 250);
  
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  window.addEventListener('resize', optimizedResizeHandler);
};

// Initialize all optimizations
export const initializeCodeOptimizations = () => {
  removeDeadCode();
  optimizeCSS();
  optimizeJavaScript();
};