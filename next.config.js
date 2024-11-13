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
  };
  