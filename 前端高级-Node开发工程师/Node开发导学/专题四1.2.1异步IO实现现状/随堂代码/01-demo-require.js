let person = require('./01-demo-export');

console.log(person);

console.log(person.name);
person.getName('study163');


person.name = 'updateName';
console.log(person);