self.addEventListener('install', (event) => {
  console.log('installing....');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/css/styles.css',
        '/fonts/redemption.woff',
        '/images/main-teaser.jpg',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('V1 now ready to handle fetches!');
});

/* self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      console.log('caching api calls...');
      return (
        resp ||
        fetch(event.request).then((response) => {
          console.log('fetch...');
          return caches.open('v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
 */
