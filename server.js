const Koa = require("koa");
const Router = require("koa-router");
const middlewares = require("./middlewares");
const port = 4000;

const app = new Koa();
const router = new Router();

let posts = [
  { id: 1, title: "Post 1", body: "Post 1 body" },
  { id: 2, title: "Post 2", body: "Post 2 body" },
  { id: 3, title: "Post 3", body: "Post 3 body" },
];


const routes = [
  {
    method: "get",
    path: "/posts",
    controller: "find",
  },
  {
    method: "get",
    path: "/posts/:id",
    controller: "findOne",
  },
  {
    method: "post",
    path: "/posts",
    controller: "create",
  },
  {
    method: "put",
    path: "/posts/:id",
    controller: "update",
  },
  {
    method: "delete",
    path: "/posts/:id",
    controller: "delete",
  },
];

// SET GLOBAL VARIABLES TO CTX
app.context.store = { name: "Koa" };
app.context.db = { name: "SQL" };

router.get("/", (ctx) => {
  ctx.body = "Hello World";
});

// CONTROLLER FACTORY
function controllerFactory(name, type, data) {
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

// ROUTE FACTORY
function routeFactory(method, path, controller) {
  return router[method](path, controller);
}

middlewares.forEach((middleware) => app.use(middleware()));
routes.forEach((route) =>
  routeFactory(
    route.method,
    route.path,
    controllerFactory("post", route.controller, posts)
  )
);

app.use(router.routes());

// START SERVER
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// app.use(async (ctx, next) => {
//   console.log(ctx.store, "1");
//   console.log(ctx.db, "2");
//   await next();
// });
