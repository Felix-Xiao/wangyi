const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');


app.use(async (ctx, next) => {
    console.log('a');
    await next();
    throw new Error('Hello Error');
    console.log('b');
});

app.use(async ctx => {
    console.log('c');
    ctx.body = 'hello world';
});

app.listen(3000);