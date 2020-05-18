const fn = require('./m');
let files = ['/dev.json', '/test.json', '/prod.json'];


function toPromiseStyle(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}
let op = toPromiseStyle(fn);
// console.log(op.toString());

let result = [];
op(files[0])
    .then((data) => {
        result.push(data);
        return op(files[1]);
    })
    .then((data) => {
        result.push(data);
        return op(files[2]);
    })
    .then((data) => {
        result.push(data);
        console.log(relust);
    }).catch((err) => {
        console.log(err);
        console.log(result);
    });



function* getResult() {
    let res;
    try {
        res = yield op(files[0]);
        res = yield op(files[1]);
        res = yield op(files[2]);
        return res;
    } catch (error) {
        return console.log(err);
    }
}


async function getResult1() {
    let res;
    try {
        res = await op(files[0]);
        res = await op(files[1]);
        res = await op(files[2]);
        return res;
    } catch (error) {
        return console.log(err);
    }
}


