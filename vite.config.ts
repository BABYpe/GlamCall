import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    })
  ],
  
  // Build optimizations
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    
    // Advanced Terser options for maximum compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3, // Multiple compression passes
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    },
    
    // Advanced rollup options
    rollupOptions: {
      output: {
        // Aggressive code splitting
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // UI and icons
          'ui-vendor': ['lucide-react'],
          
          // Internationalization
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          
          // Forms and validation
          'forms-vendor': ['react-hook-form', '@hookform/resolvers', 'yup'],
          
          // Database and auth
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // Utilities
          'utils-vendor': ['date-fns', 'uuid', 'bcryptjs', 'jsonwebtoken'],
          
          // React Query
          'query-vendor': ['react-query'],
          
          // Toast notifications
          'toast-vendor': ['react-hot-toast'],
          
          // Helmet for SEO
          'seo-vendor': ['react-helmet-async']
        },
        
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '') : 'chunk';
          return `assets/js/[name]-[hash].js`;
        },
        
        // Optimize asset names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        
        // Entry file name
        entryFileNames: `assets/js/[name]-[hash].js`
      },
      
      // External dependencies (CDN)
      external: []
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Asset inlining threshold
    assetsInlineLimit: 4096,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Target modern browsers for smaller bundles
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
  },
  
  // Development optimizations
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },
  
  preview: {
    port: 4173,
    host: true
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      '@hookform/resolvers',
      'yup',
      'react-hot-toast',
      'date-fns',
      'uuid'
    ],
    exclude: ['lucide-react']
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  
  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@data': resolve(__dirname, 'src/data')
    }
  }
});