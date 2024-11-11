const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    '/auth', // Path to be matched
    createProxyMiddleware({
      target: 'http://auth-service.tomcat-app.svc.cluster.local:8080', // Target server
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {'^/auth' : ''} // Optionally remove /api1 from the request path
    })
  );

  app.use(
    '/orders', // Path to be matched
    createProxyMiddleware({
      target: 'http://order-service.tomcat-app.svc.cluster.local:8080', // Target server
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {'^/orders' : ''} // Optionally remove /api1 from the request path
    })
  );

  app.use(
    '/delivery', // Path to be matched
    createProxyMiddleware({
      target: 'http://delivry-service.tomcat-app.svc.cluster.local:8080', // Target server
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {'^/delivery' : ''} // Optionally remove /api1 from the request path
    })
  );

};
