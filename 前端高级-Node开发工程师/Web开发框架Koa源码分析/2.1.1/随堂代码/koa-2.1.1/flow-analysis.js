const Koa = require('koa');
const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();                           // ①
    await next();                                                   //  ②
    const ms = Date.now() - start;                  // ⑧
    ctx.set('X-Response-Time', `${ms}ms`);  // ⑨
});

//logger
app.use(async (ctx, next) => {
    const start = Date.now();                           // ③
    await next();                                                      // ④
    const ms = Date.now() - start;                     // ⑥
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);   // ⑦
});

// response
app.use(async ctx => { 
    ctx.body = 'Hello Wolrd';                                   // ⑤
});

app.listen(3000);


/**
 *  执行过程：
 *  1. 创建一个跟踪响应时间的 时间戳
 *  2.  等待下一个中间件执行完毕
 *  3. 创建另一个logger的持续时间
 *  4. 等待下一个中间件执行完毕
 *  5. 将响应体设置为 'hello world'
 *  6. 计算出logger的持续时间
 *  7. 输出logger
 *  8. 计算响应的持续是按
 *  9. 将 x-response-time 响应头设置好
 *  10. 交给koa处理
 */