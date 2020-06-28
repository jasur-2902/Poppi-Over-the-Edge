/* eslint-env browser */

if ('serviceWorker' in navigator) {
<<<<<<< HEAD
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('/expo-service-worker.js', { scope: '/' })
      .then(function(info) {
        // console.info('Registered service-worker', info);
      })
      .catch(function(error) {
=======
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/expo-service-worker.js', { scope: '/' })
      .then(function (info) {
        // console.info('Registered service-worker', info);
      })
      .catch(function (error) {
>>>>>>> 6aa2e53504aa90ca5e431e94736908ec6d508d63
        console.info('Failed to register service-worker', error);
      });
  });
}
