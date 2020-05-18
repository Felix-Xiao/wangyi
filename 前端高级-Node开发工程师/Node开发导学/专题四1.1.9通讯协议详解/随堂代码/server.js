const http = require('http');


http.createServer(function(req,res){
  console.log('有请求',req.url);

  res.end('123');
}).listen(8080,function(){
  console.log('访问:http://localhost:8080');
});