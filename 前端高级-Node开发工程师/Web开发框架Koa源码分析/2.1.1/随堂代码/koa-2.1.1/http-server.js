const http = require('http');
http.createServer(function (req, res) {
    res.end('hello world!');
}).listen(3000, function () {
    console.log('服务启动成功！')
});