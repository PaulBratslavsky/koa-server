module.exports = () => {
  return async (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
  }
};


