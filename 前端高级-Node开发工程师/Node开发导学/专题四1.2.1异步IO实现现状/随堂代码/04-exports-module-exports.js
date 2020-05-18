// exports = module.exports = {};
// 
/*var module = {
  exports: {},
};

var exports =  module.exports;


function change(exports){
  // 通过形参的方式传入的 exports
  exports.name = 'evan';

  // exports.xxx ='xxx';

  exports = {
    age: 18,
  }

  console.log(exports); // 
}



// exports    用于暴露对象
// module.exports 也是用于暴露对象

change(exports);

console.log(module.exports);



export.name = 'aaa';
export.bb= 'aaa';


// 写法是错误的
// export={}; //  改变了引用    让他重新指向另一个对象

// module.exports = {};
// 
module.exports={
  name: 'aaa',
  bb: 'aaaa',
}


let name = 'aaa';
let bb = 'aaaa';

module.exports = {
  name,bb
};*/



/// 同一个模块中 ,相同的模块可以 同时引入两次



// 值的引用 指的  exports   module.exports


var a = require('./01-demo-export');
var b = require('./01-demo-export');

console.log(a === b);