/*
The five methods we are going to be covering in this article are:

find
findIndex
indexOf
includes
some

-------

Array.prototype.find()

	The find method returns the first item within the array that satisfies the 
	search criteria determined in the callback function, or undefined if not found.

	The callback function is sequentially called throughout all the indexes until 
	a truthy value is returned. 

	If that happens, the element stored at that particular index is returned, 
	and the search will stop. 

	Otherwise, the full array will be traversed without satisfying the search criteria 
	and a undefined value will be returned.
*/

const array=[0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
const item=array.find(element=>element>10);
console.log(item); // 13

// -------

// find may also be used to find an element in an array of objects.

const array=[{
	type: 'Fiat', model: '500', color: 'white'
}];
const item=array.find((element)=>element.color==='white');
console.log(item); // {type: 'Fiat', model: '500', color: 'white'}

// -------

/*
Array.prototype.findIndex()

	This method is very similar to find. 

	It also accepts a callback function to apply your search criteria. 

	However, it returns the index at which the element is located within 
	the array instead of its element.

	When the element is not found,findIndex returns -1.
*/

const array=[0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
const item=array.findIndex(element=>element>10);
console.log(item); // 7

const array=[{
	type: 'Fiat', model: '500', color: 'white'
}];
const item=array.findIndex((element)=>element.color==='white');
console.log(item); // 0

// -------

/*
Array.prototype.indexOf()

	indexOf returns the first index at which the provided element can be 
	found within the array. 

	LikefindIndex, it will return -1 if the element is not found.

	This method compares the provided search element to elements of the array 
	using strict equality. 

	So, if you were trying to find the index at which the value 3is at, 
	for instance, but you provided '3' to this method, the element will not be found, 
	and the method will return -1.

	You may also provide an optional second argument to this method to signal 
	which index you want to start your search from.
*/

const beasts=['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison')); // 1
console.log(beasts.indexOf('bison', 2)); // 4
console.log(beasts.indexOf('giraffe')); // -1

// -------

/*
Array.prototype.includes()
	
	The includes method returns a boolean, which will be true if a given item is within the array, 
	or false otherwise. 

	Similar toindexOf, it also allows for a second optional argument to 
	specify the index to start from.

	This method uses the same-value-zero equality algorithm to determine whether 
	an element exists within the array. 

	This algorithm is similar to the strict equality used in indexOf, 
	but it will also support NaN comparisons.
*/

const beasts=['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.includes('bison')); // true
console.log(beasts.includes('bison', 2)); // true
console.log(beasts.includes('giraffe')); // false

// -------

/*
Array.prototype.some()

	This method checks whether at least one of the array items matches the 
	search criteria determined in the callback function. 

	If it does, the method will return true, otherwise it will return false.
*/

const array=[0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
console.log(array.some(element=>element>10)); // true

// -------

/*
Bonus: Array.prototype.filter()

	In certain scenarios, you may use the method filter to search for elements 
	throughout an array. filter, like find, will use a callback function to test 
	elements within the array.

	The difference here is that this method will return a new array containing all the 
	items that passed the test implemented by the callback function.

	An example of when you could use this method as a search utility would be to find all 
	elements that will match the given search criteria and have them readily 
	available to you in a separate collection.
*/

const words=['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result=words.filter(word=>word.length>6);
console.log(result); // ["exuberant", "destruction", "present"]