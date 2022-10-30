module.exports = () => {
  function routeFactory(method, path, controller) {
    return router[method](path, controller);
  }
};
