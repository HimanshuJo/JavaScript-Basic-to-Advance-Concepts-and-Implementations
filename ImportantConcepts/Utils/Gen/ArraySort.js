/*
Array.prototype.sort()

	The sort() method sorts the elements of an array in place and returns the sorted array. 

	The default sort order is ascending, built upon converting the elements into strings, 
	then comparing their sequences of UTF-16 code units values.

	The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.
*/

const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]

/*
Syntax
	
	// Functionless
	sort()

// Arrow function
sort((a, b) => { // ...  } )

// Compare function
sort(compareFn)

// Inline compare function
sort(function compareFn(a, b) { // ...  })
*/

/*
Parameters:

	compareFn Optional
	
	Specifies a function that defines the sort order. 

	If omitted, the array elements are converted to strings, then sorted according 
	to each character's Unicode code point value.

	a

		The first element for comparison.

	b
	
		The second element for comparison.

-------

Return value
	
	The sorted array. Note that the array is sorted in place, and no copy is made.

-------

Description:

	If compareFunction is not supplied, all non-undefined array elements are sorted by 
	converting them to strings and comparing strings in UTF-16 code units order. 

	For example, "banana" comes before "cherry". 

	In a numeric sort, 9 comes before 80, but because numbers are converted to strings, 
	"80" comes before "9" in the Unicode order. 

	All undefined elements are sorted to the end of the array.

-------

	If compareFunction is supplied, all non-undefined array elements are sorted according to 
	the return value of the compare function (all undefined elements are sorted to the end of 
	the array, with no call to compareFunction).

-------

compareFunction(a, b) return value	sort order

	> 0	sort b before a
	
	< 0	sort a before b
	
	=== 0	keep original order of a and b
*/

function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

/*
To compare numbers instead of strings, the compare function can subtract b from a. 

The following function will sort the array in ascending order (if it doesn't contain Infinity and NaN):
*/

function compareNumbers(a, b) {
  return a - b;
};

/*
The sort method can be conveniently used with function expressions:
*/

const numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]

/*
ES2015 provides arrow function expressions with even shorter syntax.
*/

const numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]

/*
Arrays of objects can be sorted by comparing the value of one of their properties.
*/

const items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return a.value - b.value;
});

// sort by name
items.sort(function(a, b) {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

// -------*******-------

/*
Creating, displaying, and sorting an array

	The following example creates four arrays and displays the original array, 
	then the sorted arrays. 

	The numeric arrays are sorted without a compare function, then sorted using one.
*/

let stringArray = ['Blue', 'Humpback', 'Beluga'];
let numberArray = [40, 1, 5, 200];
let numericStringArray = ['80', '9', '700'];
let mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareNumbers(a, b) {
  return a - b;
}

stringArray.join(); // 'Blue,Humpback,Beluga'
stringArray.sort(); // ['Beluga', 'Blue', 'Humpback']

numberArray.join(); // '40,1,5,200'
numberArray.sort(); // [1, 200, 40, 5]
numberArray.sort(compareNumbers); // [1, 5, 40, 200]

numericStringArray.join(); // '80,9,700'
numericStringArray.sort(); // ['700', '80', '9']
numericStringArray.sort(compareNumbers); // ['9', '80', '700']

mixedNumericArray.join(); // '80,9,700,40,1,5,200'
mixedNumericArray.sort(); // [1, 200, 40, 5, '700', '80', '9']
mixedNumericArray.sort(compareNumbers); // [1, 5, '9', 40, '80', 200, '700']

/*
Sorting non-ASCII characters:

	For sorting strings with non-ASCII characters, 
	i.e. strings with accented characters (e, é, è, a, ä, etc.), strings from languages other 
	than English, use String.localeCompare. 

	This function can compare those characters so they appear in the right order.
*/

const items = ['réservé', 'premier', 'communiqué', 'café', 'adieu', 'éclair'];
items.sort(function (a, b) {
  return a.localeCompare(b);
});

// items is ['adieu', 'café', 'communiqué', 'éclair', 'premier', 'réservé']

/*
Sorting with map
	
	The compareFunction can be invoked multiple times per element within the array. 

	Depending on the compareFunction's nature, this may yield a high overhead. 

	The more work a compareFunction does and the more elements there are to sort, 
	it may be more efficient to use map() for sorting. 

	The idea is to traverse the array once to extract the actual values used for sorting into 
	a temporary array, sort the temporary array, and then traverse the temporary array 
	to achieve the right order.
*/

// the array to be sorted
const data = ['delta', 'alpha', 'charlie', 'bravo'];

// temporary array holds objects with position and sort-value
const mapped = data.map((v, i) => {
  return { i, value: someSlowOperation(v) };
})

// sorting the mapped array containing the reduced values
mapped.sort((a, b) => {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  return 0;
});

const result = mapped.map(v => data[v.i]);

/*

Sort stability
	
	Since version 10 (or EcmaScript 2019), the specification dictates that Array.prototype.sort is stable.

	For example, say you had a list of students alongside their grades. 

	Note that the list of students is already pre-sorted by name in alphabetical order:
*/

const students = [
  { name: "Alex",   grade: 15 },
  { name: "Devlin", grade: 15 },
  { name: "Eagle",  grade: 13 },
  { name: "Sam",    grade: 14 }
];

// After sorting this array by grade in ascending order:

students.sort((firstItem, secondItem) => firstItem.grade - secondItem.grade);

// The students variable will then have the following value:

[
  { name: "Eagle",  grade: 13 },
  { name: "Sam",    grade: 14 },
  { name: "Alex",   grade: 15 }, // original maintained for similar grade (stable sorting)
  { name: "Devlin", grade: 15 }  // original maintained for similar grade (stable sorting)
];

/*
It's important to note that students that have the same grade (for example, Alex and Devlin), 
will remain in the same order as before calling the sort. 

This is what a stable sorting algorithm guarantees.

Before version 10 (or EcmaScript 2019), sort stability was not guaranteed, 
meaning that you could end up with the following:
*/

[
  { name: "Eagle",  grade: 13 },
  { name: "Sam",    grade: 14 },
  { name: "Devlin", grade: 15 }, // original order not maintained
  { name: "Alex",   grade: 15 }  // original order not maintained
];