let fs = require('fs');
let path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'), (err, data)=>{
    if(err) {
        throw error;
    }
    console.log(data.toString());
})