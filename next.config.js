// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://ptip.p-e.kr/api/:path*', // 외부 API URL
        },
      ];
    },
    output: 'standalone', // Azure Static Web Apps에 최적화된 출력
  };
  