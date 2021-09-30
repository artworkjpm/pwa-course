console.log('test');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
  /* navigator.serviceWorker.register('/js/service-worker.js', { scope: '../' }); */
  console.log('pwa');
} else {
  console.log('Service worker is not supported in your browser');
}
