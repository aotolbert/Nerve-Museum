// const toCache = require('static-to-cache')();
// const version = require('static-version')();

// const staticCacheName = `static-${version}`;

console.log("hello")

// addEventListener('install', event => {
//     // skipWaiting();
  
//     // event.waitUntil(async function () {
//       const cache = await caches.open(staticCacheName);
//       await cache.addAll(toCache);
//     // }());
//   });
  

//   addEventListener('activate', event => {
//     event.waitUntil(async function () {
//       const keys = await caches.keys();
//       await Promise.all(
//         keys.map(key => {
//           if (key !== staticCacheName) return caches.delete(key);
//         })
//       );
//     }());
//   });
  

//   addEventListener('fetch', event => {
//   if (event.request.method !== 'GET') return;
//   const url = new URL(event.request.url);

//   event.respondWith(async function () {
//     if (url.origin === location.origin && /^\/\d{4}\/[\w-]+\/$/.test(url.pathname)) {
//       return streamArticle(event, url);
//     }

//     const cachedReponse = await caches.match(event.request);
//     if (cachedReponse) return cachedReponse;

//     return await fetch(event.request);
//   }());
// });