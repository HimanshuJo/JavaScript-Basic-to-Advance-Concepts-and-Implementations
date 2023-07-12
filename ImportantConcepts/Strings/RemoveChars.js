/*
Remove character from String in JavaScript

To remove a character from a string in Javascript, 
there are the following different methods and techniques that you can use,

substr() – removes a character from a particular index in the String.
replace() – replaces a specific character/string with another character/string.
slice() – extracts parts of a string between the given parameters.
Using the string replace() function with a regular expression.
*/
/*
JavaScript String replace()

	Javascript String replace() is a built-in method that returns the new String with some 
	matches of the pattern replaced by the replacement. 

	The replace() function replaces the specific character/string with another character/string. 

	The repace() method takes two parameters, the first is the String to be replaced, and 
	the second is the String, which is to be replaced with.

	In this case, the first argument is the character to be removed, and the second parameter can 
	be given as the empty string. 

	Then, the replace() method will remove the character from the String. 

	Finally, the replace() method removes the first occurrence of the String.

-------

Syntax

	string.replace('characterToReplace', '');
*/

str = 'Hello cy Adele';

newStr = str.replace('c', '');

console.log('Original String: ', str);
console.log('After character removed: ', newStr);

/*
Output

Original String:  Hello cy Adele
After character removed:  Hello y Adele
*/

/*
Using a replace() method with a regular expression

To remove a character from a string, use string replace() and regular expression. 
This combination is used to remove all occurrences of the particular character, unlike the previous function.

A regular expression is used instead of a string along with global property. 
It will select every occurrence in a string, and it can be removed.
*/

str = 'AppDividend';
console.log('Original String: ', str);

newStr = str.replace(/D/g, '');
console.log('After character removed: ', newStr);

/*
Output

Original String:  AppDividend
After character removed:  Appividend
*/

// -------*******-------
/*
Removing character from string using slice()

	JavaScript String slice() function is used to extract parts of a string between the given parameters. 

	The slice() method takes the starting index and the ending index of the string and returns 
	the string in between these indices.

	If an ending index is not specified, it is assumed to be the length of the string.

	To remove the first character from the string, specify the beginning index to 1. 
	It extracts a string from the second character up to the end of the string.

	To remove the last character from the string, specify the ending index to be one less than 
	the length of the string. 

	This extracts a string from the beginning of the string to the second to the last character.
*/

str = 'AppDividend';
console.log('Original String: ', str);

removeFirstChar = str.slice(1);
console.log('Removing the first character', removeFirstChar);

removeLastChar = str.slice(0, str.length - 1);
console.log('Removing the last character: ', removeLastChar);

/*
Output:

Original String:  AppDividend
Removing the first character ppDividend
Removing the last character:  AppDividen
*/

// -------*******-------
/*
Removing a specific character using substr()

	Javascript string substring() is an inbuilt function that returns a part of the string between 
	the start and end indexes or to the end of a string.

	The substr() method can remove a character from the specific index in the string. 
	In addition, the substr() function is used to extract the parts of the string between the given parameters.

	The substr() method takes two parameters, the first is the starting index, and the 
	second is the ending index of the string. 

	The function returns the string between these indices is returned.

	The portion of the string before and after the character to be removed is separated and joined together. 
	For example, this removes a character from a particular index.
*/

str = 'AppDividend';
console.log('Original String:', str);

newStr = str.substr(1, str.length);
console.log('After removing the first character:', newStr);

/*
Output

Original String: AppDividend
After removing the first character: ppDividend
*/