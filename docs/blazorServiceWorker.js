var GENERAL_CACHE_NAME = 'blazor-pwa-pricesheet';
var CACHE_NAME = GENERAL_CACHE_NAME + 'v15';

self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll([
                    //'/_framework/_bin/Microsoft.AspNetCore.Blazor.Browser.dll',
                    '/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
                    //'/_framework/_bin/Microsoft.AspNetCore.Blazor.TagHelperWorkaround.dll',
                    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
                    '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
                    '/_framework/_bin/Microsoft.JSInterop.dll',
                    '/_framework/_bin/Mono.WebAssembly.Interop.dll',
                    '/_framework/_bin/mscorlib.dll',
                    '/_framework/_bin/System.Core.dll',
                    '/_framework/_bin/System.dll',
                    '/_framework/_bin/System.Net.Http.dll',
                    '/_framework/wasm/mono.js',
                    '/_framework/wasm/mono.wasm',
                    '/_framework/blazor.boot.json',
                    '/_framework/blazor.webassembly.js',
                 
                    '/_framework/_bin/WebApplication1.dll',
                    '/css/bootstrap/bootstrap.min.css',
                    '/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
                    '/css/site.css',
                    '/favicon.ico',
                    '/index.html',
                    '/sample-data/pricesheet.json',
                 
                    '/blazorSWRegister.js',
                 
                    '/manifest.json',
                ]);
            })
          );
         });

         self.addEventListener('fetch', function(event) {
            event.respondWith(
              caches.match(event.request).then(function(response) {
                return response || new Response("Nothing in the cache for this request");
              })
            );
          });
          
          // Remove old cache
          self.addEventListener("activate", function(event) {
            event.waitUntil(
              caches.keys().then(function(cacheNames) {
                return Promise.all(
                  cacheNames.map(function(cacheName) {
                    if (CACHE_NAME !== cacheName &&  cacheName.startsWith(GENERAL_CACHE_NAME)) {
                      return caches.delete(cacheName);
                    }
                  })
                );
              })
            );
          });