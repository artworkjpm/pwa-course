console.log('test');
//Its important to remember that the root folder is /dist not where the index.html is in /server
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
  /* navigator.serviceWorker.register('/js/service-worker.js', { scope: '../' }); */
  console.log('pwa');
} else {
  console.log('Service worker is not supported in your browser');
}
