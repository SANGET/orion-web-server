const staticServer = require('koa-static');
const mount = require('koa-mount');
const Router = require('koa-router');

const app = require('./app-server')();

const router = new Router();

const createStaticServer = (options) => {
  const { route, assetPath, port } = options;

  router.use(mount(route, staticServer(assetPath)));

  router.use(async (ctx) => {
    ctx.responese.status = 404;
    ctx.body = 'none';
  });

  if(port) {
    app.use(router.routes());
  
    app.listen(port, async () => {
      console.log('Static server started at port: ' + port);
    });

    return app;
  } else {
    return router.routes();
  }
};

module.exports = createStaticServer;