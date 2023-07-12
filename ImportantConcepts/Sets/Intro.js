/*
A JavaScript Set is a collection of unique values.

Each value can only occur once in a Set.

A Set can hold any value of any data type.

-------

Set Methods:

	Method			Description

	new Set()		Creates a new Set
	add()			  Adds a new element to the Set
	delete()		Removes an element from a Set
	has()			  Returns true if a value exists
	clear()			Removes all elements from a Set
	forEach()		Invokes a callback for each element
	values()		Returns an Iterator with all the values in a Set
	keys()			Same as values()
	entries()		Returns an Iterator with the [value,value] pairs from a Set

-------

Property		Description

size			Returns the number elements in a Set

-------

How to Create a Set:
	
	You can create a JavaScript Set by:

		Passing an Array to new Set()
	
		Create a new Set and use add() to add values
	
		Create a new Set and use add() to add variables
	
-------

The new Set() Method
	
	Pass an Array to the new Set() constructor:
*/

const letters = new Set(["a","b","c"]);
const letters_ = new Set();

letters_.add("a");
letters_.add("b");
letters_.add("c");

const a = "a";
const b = "b";
const c = "c";

const letters__ = new Set();

letters__.add(a);
letters__.add(b);
letters__.add(c);

/*
The add() Method
*/

letters.add("d");
letters.add("e");

/*
The forEach() Method
	
	The forEach() method invokes a function for each Set element:
*/

const letters___ = new Set(["a","b","c"]);

// List all entries
let text = "";
letters___.forEach (function(value) {
  text += value;
})

/*
The values() method

	The values() method returns an Iterator object containing all the values in a Set:
*/

letters___.values()   // Returns [object Set Iterator]

// Create an Iterator
const myIterator = letters___.values();

// List all Values
let text = "";
for (const entry of myIterator) {
  text += entry;
}

/*
The keys() method

	A Set has no keys.

	keys() returns the same as values().

	This makes Sets compatible with Maps.
*/

letters___.keys()   // Returns [object Set Iterator]

/*
The entries() Method

	A Set has no keys.

	entries() returns [value,value] pairs instead of [key,value] pairs.

	This makes Sets compatible with Maps:
*/

const myIterator_ = letters___.entries();

let text = "";
for (const entry of myIterator_) {
  text += entry;
}

/*
Sets are Objects

	For a Set, typeof returns object:

		typeof letters;      // Returns object

-------

For a Set, instanceof Set returns true:

	letters instanceof Set;  // Returns true
*/