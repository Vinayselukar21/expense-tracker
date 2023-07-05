/** @type {import('next').NextConfig} */
const withOffline = require('next-offline')

module.exports = withOffline({
  reactStrictMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          cacheableResponse: {
            statuses: [0, 200],
          }
        }
      },
      {
        urlPattern: /^http.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'http-cache',
        }
      }
    ]
  }
})