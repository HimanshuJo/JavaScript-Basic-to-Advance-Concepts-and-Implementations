// 828. Count Unique Characters of All Substrings of a Given String
/*
Let's define a function countUniqueChars(s) that returns the number of unique characters on s.

For example, calling countUniqueChars(s) 
if s = "LEETCODE" then "L", "T", "C", "O", "D" are the unique characters since 
they appear only once in s, therefore countUniqueChars(s) = 5.

Given a string s, return the sum of countUniqueChars(t) where t is a substring of s.

Notice that some substrings can be repeated so in this case you have to count the repeated ones too.

Example 1:

Input: s = "ABC"
Output: 10
Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
Every substring is composed with only unique letters.
Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
Example 2:

Input: s = "ABA"
Output: 8
Explanation: The same as example 1, except countUniqueChars("ABA") = 1.
Example 3:

Input: s = "LEETCODE"
Output: 92
 

Constraints:

1 <= s.length <= 10^5
s consists of uppercase English letters only.
*/

/*
Thinking:

    Convert this question into finding each letter's contribution to the total result.

    For Example, "LEETCODE", we can notice that "E" present multiple times and 
    only the substrings contains one "E" can help "E" to be counted in. 

    "LE", "ET", "ETCOD" are good, but "LEE", "ETCODE" are not.

    Now let's focus on the letter "E". We can divide the string into several parts, such like:

        ["L" | "1E" | "2E" | "TCOD" | "3E"]. Each part is divided by letter "E".

        Look at the first "1E", it has one letter in the left side, 
        and zero letters in the right side, so there are 2 different ways to contains this 
        "E", ("LE", "E"), which is calculated by (1 + left length(1)) * (1 + right length(0)) = 2.

        Look at the second "2E", it has zero letter on the left side and four letters on the right side. 
        We can calculate that ( 1 + left length(0) ) * ( 1 + right length(4) ) = 5.

-------

Now let's explain why we calculate like this.

    Let's turn to the letter "T", and look at the parts ["LEE" | "T" | "CODE"].

    Left side length is 3, and right side length is 4.

    If we fix the left part, then we can have 5 different ways of right part: "", "C", "CO", "COD", "CODE".
    
    If we fix the right part, then we can have 4 different ways of left part: "", "E", "EE", "LEE".

    Be aware that empty string is one of the ways, because if either side is empty ,then we only 
    consider the other side; if both side are empty string, and we get the letter "T" itself as a substring. 

    So this is why the "1 + " to be introduced in the expression. 

        And we just simply multiply the both side of ways to get the total ways the 
        substrings contain this letter "T".
    
    Finally we add up every letter's contribution to get the final result.

-------

Implement:

    Create a hash table to store every letter's indexes.
    
    Iterate every letter, and calulate every presence' contribution, and add all the counts.
    
    For specific explained, we can get the letter "E"s index arr [1, 2, 7].
    
    For index 1, the left side length is 1 - 0 = 1, the right side length is (2 - 1 - 1) = 0,
        
        for index 2, the left side length is the right side length of the index 1, and 
        the right side length is (7 - 2 - 1) = 4.
        
        for index 7, the left side length is the right side length of the index 2, and 
        the right side length is (7 - 7) = 0.
    
    For actual calculations, we can do some modifications to make it smooth.
*/

function uniqueLetterString(s: string): number {
    var res=0;
    const n=s.length;
    const hash={};
    for(let i=0; i<n; ++i){
        const letter=s[i];
        if(hash[letter]===undefined){
            hash[letter]=[i];
        } else{
            hash[letter].push(i);
        }
    }
    for(let letter in hash){
        const arr=hash[letter];
        let prevIdx=arr[0];
        let prevRange=arr[0]+1;
        for(let i=1; i<arr.length; ++i){
            const currIdx=arr[i];
            const currRange=currIdx-prevIdx;
            res+=prevRange*currRange;
            prevIdx=currIdx;
            prevRange=currRange;
        }
        res+=prevRange*(n-prevIdx);
    }
    return res;
};