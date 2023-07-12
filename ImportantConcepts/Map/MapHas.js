/*
Map.prototype.has():

	The has() method returns a boolean indicating whether an element with the specified key exists or not.
*/

const map1 = new Map();
map1.set('bar', 'foo');

console.log(map1.has('bar'));
// expected output: true

console.log(map1.has('baz'));
// expected output: false
