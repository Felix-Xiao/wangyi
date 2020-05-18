const Koa = require('koa');
const app = new Koa();


app.use(async ctx => {
    ctx.body = 'hello world';
    app.emit('error', 'hahaha');
});

app.on('error', (err) => {
    // 处理error
    console.log(err);
});

console.log(app.toJSON());

app.listen(3000);