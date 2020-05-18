# 请求处理流程解读

---

## 上下文对象的解读

```js
// application.js
// 用于处理请求
  handleRequest(ctx, fnMiddleware) {
    // 通过传递过来的ctx，获取到原生的可写流
    const res = ctx.res;
    // 设置默认的statusCode 404
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }


  // 响应请求
// res 响应辅助函数
function respond(ctx) {
  // 通过设置ctx.respond 去绕过koa
  if (false === ctx.respond) return;
  // 判断ctx原型链上的 writable属性
  if (!ctx.writable) return;

  // res,body,status
  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;
  console.log(ctx.status);
  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
```

```js
// context.js
const util = require('util');
const createError = require('http-errors');
const httpAssert = require('http-assert');
// 设置代理库 委托代理
const delegate = require('delegates');
// http 状态工具包
const statuses = require('statuses');
// 操作cookie
const Cookies = require('cookies');
// 强调其唯一型，避免与当前库中其它属性名冲突
const COOKIES = Symbol('context#cookies');


// 获取cookies
  get cookies() {
    if (!this[COOKIES]) {
      this[COOKIES] = new Cookies(this.req, this.res, {
        keys: this.app.keys,
        secure: this.request.secure
      });
    }
    return this[COOKIES];
  },

  // 设置cookie值
  set cookies(_cookies) {
    this[COOKIES] = _cookies;
  }

  // delegate库
```

```js
// delegates
// TJ
// 构造函数
function Delegator(proto, target) {
    if (!(this instanceof Delegator)) return new Delegator(proto, target)
    this.proto = proto
    this.target = target
    this.methods = []
    this.getters = []
    this.setters = []
    this.fluents = []
}

// 原型方法，用于挂载 普通成员方法
Delegator.prototype.method = function (name) {
    var proto = this.proto
    var target = this.target
    this.methods.push(name)

    proto[name] = function () {
        return this[target][name].apply(this[target], arguments)
    }

    return this
}

// 用于同时挂载setter 和 getter
Delegator.prototype.access = function (name) {
    return this.getter(name).setter(name)
}

// 用于挂载 getter
Delegator.prototype.getter = function (name) {
    var proto = this.proto
    var target = this.target
    this.getters.push(name)

    proto.__defineGetter__(name, function () {
        return this[target][name]
    })

    return this
}

// 用于挂载setter
Delegator.prototype.setter = function (name) {
    var proto = this.proto
    var target = this.target
    this.setters.push(name)

    proto.__defineSetter__(name, function (val) {
        return (this[target][name] = val)
    })

    return this
}

// 读取或设置某属性或方法
Delegator.prototype.fluent = function (name) {
    var proto = this.proto
    var target = this.target
    this.fluents.push(name)

    proto[name] = function (val) {
        if ('undefined' != typeof val) {
            this[target][name] = val
            return this
        } else {
            return this[target][name]
        }
    }

    return this
}
```

## Request 对象解读

## Response 对象解读
