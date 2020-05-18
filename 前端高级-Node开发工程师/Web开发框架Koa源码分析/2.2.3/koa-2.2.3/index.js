const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');

// app.use(static(__dirname + '/public'));

app.use(async (ctx, next) => {
    console.log('a');
    await next();
    await next();
    console.log('b');
});

app.use(async ctx => {
    console.log('c');
    ctx.body = 'hello world';
});

app.listen(3000);