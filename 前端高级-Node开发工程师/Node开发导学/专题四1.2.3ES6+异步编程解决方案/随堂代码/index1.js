// 事件发布/订阅模式
/**
 * emitter.on() // 订阅
 * mitter.emit()  // 发布
 * 
 */
const fn = require('./m');
const events = require('events');
let files = ['/dev.json', '/test.json', '/prod.json'];

const emitter = new events.EventEmitter();

// function done
var done = after(files.length, (res) => {
    console.log(res);
})




emitter.on('done', done);

emitter.setMaxListeners(0)

function after(times, cb) {
    let count = 0, result = [];
    return function (data) {
        result.push(data);
        count++;
        if (count === times) {
            cb(result);
        }
    }
}


files.forEach((filename) => {
    fn(filename, (err, data) => {
        // if(err) emitter.
        emitter.emit('done', data);
    });
})

// fn(filename, (err, data) => {
//     // if(err) emitter.
//     emitter.emit('done', data);
// });
// fn(filename, (err, data) => {
//     // if(err) emitter.
//     emitter.emit('done', data);
// });
// fn(filename, (err, data) => {
//     // if(err) emitter.

//     emitter.emit('done', data);
// });