//加载模块
let http = require('http');
let fs = require('fs');
let path = require('path')
//创建服务
var server = http.createServer();
//监听事件
server.on('request', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.url === '/' || req.url === '/index') {
        fs.readFile(path.join(__dirname, 'index.html'), function (error, data) {
            if (error) {
                throw error
            }
            res.end(data);
        })
    }
    else if (req.url === '/favicon.ico') {
        fs.readFile(path.join(__dirname, 'favicon.ico'), function (error, data) {
            if (error) {
                throw error
            }
            res.end(data);
        })
    }
    else if (req.url === '/getName') {
        res.end();
    }
    else {
        res.end('<h1>404错误</h1>')
    }
});
//开启监听端口
server.listen(8080, function () {
    console.log('http//localhost:8080')
})