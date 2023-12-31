/*
JavaScript's Map object has a handy function, forEach(), 
which operates similarly to arrays' forEach() function. 

JavaScript calls the forEach() callback with 3 parameters: the value, the key, and the map itself.

const map = new Map();
map.set('greeting', 'Hello');
map.set('name', 'John');

map.forEach((value, key, map) => {
  // Prints "greeting Hello" followed by "name John"
  console.log(value, key);
});

-------

Map#entries()

	JavaScript maps don't have chainable helpers like filter() or map() for arrays. 

	If you want to use filter() with a map, you should use Map#entries() to first convert the 
	map to an iterator, and then use the the spread operator or the Array.from() function to convert 
	the iterator to an array.

-------

const map = new Map();
map.set('greeting', 'Hello');
map.set('name', 'John');

[...map.entries()]; // [['greeting', 'Hello'], ['name', 'John']]
Array.from(map.entries()); // [['greeting', 'Hello'], ['name', 'John']]

// Equivalent since `entries()` is the default iterator
[...map]; // [['greeting', 'Hello'], ['name', 'John']]

// First convert map into an array of entries, then you can use `filter()`
[...map.entries()].filter(([key, value]) => value.length > 4); // [['greeting', 'Hello']]

-------

Map#keys() and Map#values()
	
	If you only need the keys or the values of the Map, you can use Map#keys() or Map#values(). 

	Map#keys() returns an iterator over the map's keys, 

	and Map#values() returns an iterator over the map's values. 

	Make sure you convert the iterator to an array using the spread operator or Array.from() 
	if you want to use filter() or map()!
*/

const map = new Map();
map.set('greeting', 'Hello');
map.set('name', 'John');

Array.from(map.keys()); // ['greeting', 'name']
Array.from(map.values()); // ['Hello', 'John']