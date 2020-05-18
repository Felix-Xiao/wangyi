const fn = require('./m');
const async = require('async');

let files = ['/dev.json', 'est.json', '/prod.json'];

async.waterfall([
    (cb) => {
        fn(files[0], (err, data) => {
            cb(err, data);
        });
    },
    (data1, cb) => {
        fn(files[1], (err, data) => {
            cb(err, data1, data)
        });
    },
    (data1, data2, cb) => {
        fn(files[2], (err, data) => {
            cb(err, data1, data2, data);
        });
    }
], (err, data1, data2, data3) => {
    if (err) console.log(err);
    let result = [data1, data2, data3];
    console.log(result);
});