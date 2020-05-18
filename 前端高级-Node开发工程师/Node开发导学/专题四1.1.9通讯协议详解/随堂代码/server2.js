const http = require('http');


http.createServer(function(req,res){
  console.log('有请求',req.url);

  // res.end('123');
  /*res.writeHeader({
    'Access-Control-Allow-Origin':'*'
  })*/

  if(req.url === '/'){
    res.writeHead(200,{
      'Content-Type':'text/html;charset=utf-8',
    });
    res.end('<h1>欢迎来到网易云课堂</h1>');
  }else if( req.url !== '/'){
    res.writeHead(301,{
      'Location': '/',
    })
    res.end();
  }


}).listen(8080,function(){
  console.log('访问:http://localhost:8080');
});