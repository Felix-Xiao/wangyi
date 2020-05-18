let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');

app.use(express.static("html"));

// app.listen(8080, (request, respons)=>{
//     console.log('服务启动');

// })
fs.readFile(path.join(__dirname, 'hello.txt'), (err, data)=>{
    if(err) {
        throw error;
    }
    console.log(data.toString());
})