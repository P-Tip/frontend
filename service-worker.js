// 서비스 워커가 설치될 때 실행되는 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    // 캐시 저장소에 파일들을 미리 캐싱
    caches.open('my-pwa-cache').then((cache) => {
      return cache.addAll(['/index.html', '/bundle.js']); // 캐싱할 파일들
    })
  );
});

// 네트워크 요청을 가로채 캐시된 파일을 반환하거나, 없으면 네트워크 요청
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시된 파일이 있으면 반환, 없으면 네트워크에서 가져오기
      return response || fetch(event.request);
    })
  );
});