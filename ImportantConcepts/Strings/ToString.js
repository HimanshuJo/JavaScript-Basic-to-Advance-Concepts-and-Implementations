/*
The toString() method returns a string representing the specified object.

-------

Syntax

	toString();

Return value
	
	A string representing the calling object.

-------

Description:

	The String object overrides the toString() method of the Object object; 

	it does not inherit Object.prototype.toString(). 

	For String objects, the toString() method returns a string representation of 
	the object and is the same as the String.prototype.valueOf() method. 

	Using toString() on a Number object returns the binary equivalent. 

	Using parseInt().toString() on a String object returns the binary equivalent.
*/

var x = new String("Hello world");

console.log(x.toString()); // logs 'Hello world'

var x_ = new String("13");

console.log(parseInt(x_).toString(2)); // logs '1101'

var x__ = new Number(13);

console.log(x__.toString(2)); // logs '1101'