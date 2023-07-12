/*
The keys() method returns a new iterator object that contains the keys for each 
element in the Map object in insertion order. 

In this particular case, this iterator object is also an iterable, so a for...of loop can be used.
*/

const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1.keys();

console.log(iterator1.next().value);
// expected output: "0"

console.log(iterator1.next().value);
// expected output: 1


/*
Syntax
	
	keys();

-------

Return value
	
	A new Map iterator object.
*/

var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object