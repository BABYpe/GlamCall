const CACHE_NAME = 'glamcall-v2.0.0';
const STATIC_CACHE = 'glamcall-static-v1';
const DYNAMIC_CACHE = 'glamcall-dynamic-v1';
const IMAGE_CACHE = 'glamcall-images-v1';
const API_CACHE = 'glamcall-api-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/assets/css/index.css',
  '/assets/js/index.js'
];

// Image optimization patterns
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i;
const FONT_EXTENSIONS = /\.(woff|woff2|ttf|eot)$/i;

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(IMAGE_CACHE),
      caches.open(API_CACHE)
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheName.startsWith('glamcall-')) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  // Handle images with optimization
  if (IMAGE_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            // Only cache successful responses
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            // Return placeholder image on error
            return new Response(
              '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#374151"/><text x="50%" y="50%" text-anchor="middle" fill="#9CA3AF">Image not available</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          });
        });
      })
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache => {
        return cache.match(request).then(response => {
          // Return cached response if less than 5 minutes old
          if (response) {
            const cachedDate = new Date(response.headers.get('date') || '');
            const now = new Date();
            if (now.getTime() - cachedDate.getTime() < 5 * 60 * 1000) {
              return response;
            }
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            // Return stale cache if available
            return response || new Response(
              JSON.stringify({ error: 'Network unavailable' }),
              { 
                status: 503,
                headers: { 'Content-Type': 'application/json' }
              }
            );
          });
        });
      })
    );
    return;
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response.ok) {
              return response;
            }

            const responseClone = response.clone();
            
            // Cache static assets with appropriate cache
            if (FONT_EXTENSIONS.test(url.pathname) || url.pathname.match(/\.(js|css)$/)) {
              caches.open(STATIC_CACHE)
                .then(cache => cache.put(request, responseClone));
            } else if (IMAGE_EXTENSIONS.test(url.pathname)) {
              caches.open(IMAGE_CACHE)
                .then(cache => cache.put(request, responseClone));
            } else {
              // Cache pages
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, responseClone));
            }

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Advanced caching strategies
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle cache management messages
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      handleBackgroundSync()
    );
  }
});

// Enhanced push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      image: data.image,
      vibrate: [100, 50, 100],
      data: data.data,
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
      actions: [
        {
          action: 'open',
          title: 'فتح التطبيق',
          icon: '/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'إغلاق'
        }
      ],
      tag: data.tag || 'default'
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks with analytics
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
  
  // Track notification interaction
  if (event.data && event.data.analytics) {
    // Send analytics data
    fetch('/api/analytics/notification-click', {
      method: 'POST',
      body: JSON.stringify({
        action: event.action,
        tag: event.notification.tag,
        timestamp: Date.now()
      })
    }).catch(() => {
      // Ignore analytics errors
    });
  }
});

// Background sync handler
async function handleBackgroundSync() {
  try {
    // Handle offline actions
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      try {
        await processOfflineAction(action);
        await removeOfflineAction(action.id);
      } catch (error) {
        console.error('Failed to process offline action:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Offline action management
async function getOfflineActions() {
  // Get offline actions from IndexedDB
  return [];
}

async function processOfflineAction(action) {
  // Process offline action
  return fetch(action.url, action.options);
}

async function removeOfflineAction(actionId) {
  // Remove processed action from IndexedDB
  return true;
}
// Handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'فتح التطبيق'
        },
        {
          action: 'close',
          title: 'إغلاق'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});