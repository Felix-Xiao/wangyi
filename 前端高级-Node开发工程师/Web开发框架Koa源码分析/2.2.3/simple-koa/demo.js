const Koa = require('./lib/application');
const app = new Koa();

// app.use((req, res) => {
//     res.writeHeader(500);
//     res.end('Server Error');
// });

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(6);
});

app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(5);
});

app.use(async ctx => {
    console.log(3);
    ctx.status = 404;
    ctx.body = 'hello Onion!';
    console.log(4);
});

app.listen(3000, () => {
    console.log('hello Simple Koa');
});