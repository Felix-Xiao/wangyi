const http = require('http');
const Emitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application extends Emitter {
    constructor() {
        super();
        this.callbackFunc;
        this.middlewares = [];
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }

    listen(...args) {
        let server = http.createServer(this.callback());
        server.listen(...args);
    }

    // 收集中间件
    use(fn) {
        this.middlewares.push(fn);
    }

    compose() {
        return async ctx => {
            let len = this.middlewares.length;
            let next = async () => Promise.resolve();

            for (let i = len - 1; i >= 0; i--) {
                let curentMiddleware = this.middlewares[i];
                next = createNext(curentMiddleware, next);
            }
            await next();

            function createNext(middlewares, oldNext) {
                return async () => await middlewares(ctx, oldNext);
            }
        }
    }

    callback() {

        if (!this.listenerCount('error')) this.on('error', this.onerror);

        return (req, res) => {
            let ctx = this.createContext(req, res);
            // this.callbackFunc(ctx);
            let respond = () => this.responseBody(ctx);
            let onerror = (err) => ctx.onerror(err);
            // 先处理中间件，然后去响应
            let fn = this.compose();

            return fn(ctx).then(respond).catch(onerror);
        };
    }

    // 构造 ctx对象
    /**
     * 用于构造ctx
     * @param {Object} req   Node原生req实例
     * @param {Object} res  Node 原生res实例
     */
    createContext(req, res) {
        // 针对每一个请求
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);

        ctx.app = ctx.request.app = ctx.response.app = this;
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }

    responseBody(ctx) {
        let content = ctx.body;
        if (typeof content === 'string') {
            ctx.res.end(content);
        } else if (typeof content === 'object') {
            ctx.res.end(JSON.stringify(content));
        }
    }

    onerror(err) {
        let msg = err.stack || err.toString();
        console.error(msg.replace(/^/g, '    '));
    }
}

module.exports = Application;