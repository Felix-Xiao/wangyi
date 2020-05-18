const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');

// app.use(async ctx => {
//     ctx.body = 'hello world';
// });

app.use(static(__dirname + '/public'));

app.listen(3000);