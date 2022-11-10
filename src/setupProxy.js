const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.NEXT_PUBLIC_BACKEND_URL,
      changeOrigin: true,
    })
  );
};