console.log('test');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/service-worker.js');
  console.log('pwa');
} else {
  console.log('Service worker is not supported in your browser');
}
