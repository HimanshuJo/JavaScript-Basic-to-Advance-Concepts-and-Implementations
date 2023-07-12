/*
String to Int
*/

var myInt = parseInt("10.256"); //10
var myFloat = parseFloat("10.256"); //10.256

/*
String char to char code 
*/

// the first parameter is the index of the string to convert to an ascii code
"A".charCodeAt(0);
//output: 65

// -------*******-------

/*
JavaScript Number.MAX_SAFE_INTEGER

	The JavaScript Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript.

	The MAX_SAFE_INTEGER constant has a value of 253 - 1 (9007199254740991).

	It is a non-writable, non-enumerable, and non-configurable property.

	"Safe" refers to the ability of JavaScript to represent integers exactly and to correctly compare them.

	The syntax to access the MAX_SAFE_INTEGER constant is:

		Number.MAX_SAFE_INTEGER
		
		MAX_SAFE_INTEGER is accessed using the Number class name.
*/

value = Number.MAX_SAFE_INTEGER;
console.log(value); // 9007199254740991

value_plus_1 = value + 1;
value_plus_2 = value + 2;

// JS Number cannot exactly represent integers greater than 'value'
// and correctly compare them
console.log(value_plus_1 == value_plus_2); // true

/*
Output

9007199254740991
true
*/