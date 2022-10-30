module.exports = () => {
  function controllerFactory(name, type, data) {
    console.log(data, type)
    switch (type) {
      case "find":
        return (ctx) => {
          ctx.body = data;
        };
      case "findOne":
        return (ctx) => {
          const id = parseInt(ctx.params.id);
          const entitys = data.find((entity) => entity.id === id);
          ctx.body = entitys;
        };
      case "create":
        return (ctx) => {
          ctx.request.body;
          const entity = { ...ctx.request.body };
          data.push(entity);
          ctx.body = entity;
        };
      case "update":
        return (ctx) => {
          const { id } = ctx.params;
          let entity = data.find((entity) => entity.id === parseInt(id));
          if (!entity) {
            ctx.status = 404;
            ctx.body = "Not found";
            return;
          }
          console.log(entity);
          entity = { id: entity.id, ...ctx.request.body };
          console.log(entity);
  
          ctx.body = entity;
        };
      case "delete":
        return (ctx) => {
          const { id } = ctx.params;
          const entity = data.find(entity => entity.id === parseInt(id));
          if (!entity) {
            ctx.status = 404;
            ctx.body = 'Post not found';
            return;
          }
          data = data.filter(entity => entity.id !== parseInt(id));
          ctx.body = entity;
        };
      default:
        return;
    }
  }
};