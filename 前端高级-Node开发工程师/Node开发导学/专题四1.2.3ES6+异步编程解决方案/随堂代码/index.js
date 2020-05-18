const fs = require('fs');
let files = ['/dev.json', '/test.json', '/prod.json'];

fs.readFile(__dirname + files[0], 'utf8', (err, data) => {
    let result = [];
    if (err) console.log('Error: ' + err);
    result.push(data);
    fs.readFile(__dirname + files[1], 'utf8', (err, data) => {
        if (err) console.log('Error: ' + err);
        result.push(data);
        fs.readFile(__dirname + files[2], 'utf8', (err, data) => {
            if (err) console.log("Error: " + err);
            result.push(data);
            console.log(result);
        });
    });
});