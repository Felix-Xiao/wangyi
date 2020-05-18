// 自己的模块
let name = 'evan';
let getName = function(name){
  console.log(name);
}



module.exports = {
  name: name,
  getName: getName,
};