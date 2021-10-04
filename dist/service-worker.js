const CACHE_NAME = 'v2';

self.addEventListener('install', (event) => {
  console.log('installing....');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/css/styles.css',
        '/fonts/redemption.woff',
        '/images/main-teaser.jpg',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(async () => {
    const cacheNames = await caches;
    await Promise.all(
      cacheNames.map(async (cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return await caches.delete(cacheName);
        }
      })
    );
  });
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(event.request);
      if (!response) {
        const responseFromServer = await fetch(event.request);
        await cache.put(event.request.url, responseFromServer.clone());
        return responseFromServer;
      }
      return response;
    })()
  );
});

/* self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      console.log('caching api calls...');
      return (
        resp ||
        fetch(event.request).then((response) => {
          console.log('fetch...');
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
 */
