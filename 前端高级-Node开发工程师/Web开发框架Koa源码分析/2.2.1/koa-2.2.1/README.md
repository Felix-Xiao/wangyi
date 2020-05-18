# Koa类构造函数设计
---

## 继承Emitter

### 模块依赖

```js
// 判断是否为 genterator 方法
const isGeneratorFunction = require('is-generator-function');
// 设置debug的明明空间
const debug = require('debug')('koa:application');
// 当请求完成时执行的一个回调
const onFinished = require('on-finished');
// 引入 response
const response = require('./response');
// 中间件机制、剥洋葱模型
const compose = require('koa-compose');
// 引入 context
const context = require('./context');
// 引入 request
const request = require('./request');
// 用于判断http状态的工具包
const statuses = require('statuses');
// Node 原生事件驱动模块
const Emitter = require('events');
// Node 原生工具包模块
const util = require('util');
// Node 原生Stream模块
const Stream = require('stream');
// Node 原生http模块
const http = require('http');
// 用于返回对象指定的属性
const only = require('only');
// 将基于koa生成器中间件转换成基于Promise的中间件
const convert = require('koa-convert');
// 给出一些信息
const deprecate = require('depd')('koa');
// 用处创建Http Error的模块
const { HttpError } = require('http-errors');
```

## 构造函数

```js
  constructor(options) {
    // 调用父类进行构造
    super();
    // 设置一些初始值
    options = options || {};
    this.proxy = options.proxy || false;
    this.subdomainOffset = options.subdomainOffset || 2;
    this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For';
    this.maxIpsCount = options.maxIpsCount || 0;
    // 区分开发环境还是生产环境
    this.env = options.env || process.env.NODE_ENV || 'development';
    if (options.keys) this.keys = options.keys;
    // 将中间件保存到数组中
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }
  ```


## 初始化功能