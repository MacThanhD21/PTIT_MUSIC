// var CACHE_NAME = "my-site-cache-v1";
// var urlsToCache = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/css/responsive.css',
//   '/js/app.js',
//   '/js/handleBtnToggle.js',
//   // '/js/logout.js',
//   // '/js/app.js',
//   // '/js/app.js',
//   // '/js/app.js',
//   // '/js/app.js',
//   // '/js/app.js',
//   // '/js/app.js',

//   '/js/services/api_main_page.js',
//   '/js/services/api_album_page.js',
//   '/js/services/api_artist_page.js',
//   '/js/services/api_genmusic.js',
//   '/js/services/fetchApi.js',

//   '/js/data/albums.js',
//   '/js/data/songs.js',
//   '/js/data/artists.js',
//   '/js/data/category.js',
//   '/js/data/users.js',
//   '/js/data/getUserById.js',
//   '/js/helpers/cookies.js',
// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("activate", function (event) {
//   var cacheWhitelist = ["pages-cache-v1", "blog-posts-cache-v1"];
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });
