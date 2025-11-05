const CACHE_NAME = `prueba_fallback-v1`;
// Escuchar en el evento de instalacion para capturar la pagina CONSIDERAR capturar el Shell baisco y otras paginas necesarias
//AGREGAMOS EVENTO PARA ESCUCHAR.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '/',
      '/index.html',
      '/manifest.json',
      '/js.js',
      '/icon.png'
    ]);
  })());
});
//AGREGAMOS EVENTO PARA HACER FETCHEO DEL CACHE
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Fetchear el contenido capturado en el cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // Si no hay contenido en el cache; capturarlo
          const fetchResponse = await fetch(event.request);
          // Regresar el cache
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (_e) {
          // AQUI SE CAPTURA EL ERROR.
          return caches.match('/index.html');
        }
    }
  })());
});
