// 2060. Check if an Original String Exists Given Two Encoded Strings
/*
An original string, consisting of lowercase English letters, can be encoded by the following steps:

Arbitrarily split it into a sequence of some number of non-empty substrings.
Arbitrarily choose some elements (possibly none) of the sequence, and 
replace each with its length (as a numeric string).
Concatenate the sequence as the encoded string.
For example, one way to encode an original string "abcdefghijklmnop" might be:

Split it as a sequence: ["ab", "cdefghijklmn", "o", "p"].
Choose the second and third elements to be replaced by their lengths, respectively. 
The sequence becomes ["ab", "12", "1", "p"].
Concatenate the elements of the sequence to get the encoded string: "ab121p".

Given two encoded strings s1 and s2, consisting of lowercase English letters 
and digits 1-9 (inclusive), return true if there exists an original string 
that could be encoded as both s1 and s2. Otherwise, return false.

Note: The test cases are generated such that the number of consecutive digits in s1 and s2 does not exceed 3.

Example 1:

Input: s1 = "internationalization", s2 = "i18n"
Output: true
Explanation: It is possible that "internationalization" was the original string.
- "internationalization" 
  -> Split:       ["internationalization"]
  -> Do not replace any element
  -> Concatenate:  "internationalization", which is s1.
- "internationalization"
  -> Split:       ["i", "nternationalizatio", "n"]
  -> Replace:     ["i", "18",                 "n"]
  -> Concatenate:  "i18n", which is s2

Example 2:

Input: s1 = "l123e", s2 = "44"
Output: true
Explanation: It is possible that "leetcode" was the original string.
- "leetcode" 
  -> Split:      ["l", "e", "et", "cod", "e"]
  -> Replace:    ["l", "1", "2",  "3",   "e"]
  -> Concatenate: "l123e", which is s1.
- "leetcode" 
  -> Split:      ["leet", "code"]
  -> Replace:    ["4",    "4"]
  -> Concatenate: "44", which is s2.

Example 3:

Input: s1 = "a5b", s2 = "c5b"
Output: false
Explanation: It is impossible.
- The original string encoded as s1 must start with the letter 'a'.
- The original string encoded as s2 must start with the letter 'c'.
 

Constraints:

1 <= s1.length, s2.length <= 40
s1 and s2 consist of digits 1-9 (inclusive), and lowercase English letters only.
The number of consecutive digits in s1 and s2 does not exceed 3.
*/

/*
The thinking solution is straight forward we have 2 pointer in each string

consider the easy case, they all character, we compare s1.charAt(i) == s2.charAt(j)

digit case, we get a number from s1, we can calculate the number s1 has, 
(description said less than 1000), we can pass this value compare with number from s2 name it diff
character case if we still has remaining diff to spend passed from our parents, 
so we can use one dollar a day, one diff one position dfs(i + 1, j, diff - 1
terminating condition, if both reach the end and diff == 0
*/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

var str1, str2;
var memo=new Array();
const DIGIT_EXPRESSION = /^\d$/;

const isDigit = (character) => {
    return character && DIGIT_EXPRESSION.test(character);
};

var dfs=function(i, j, diff){
    if(i>=str1.length&&j>=str2.length&&diff===0) return 1;
    if(memo[i][j][diff+1000]!=2) return memo[i][j][diff+1000];
    var res=0;
    if(i<str1.length){
        if(isDigit(str1[i])){
            let count=0, val=0;
            while(i+count<str1.length&&count<3&&isDigit(str1[i+count])){
                val=val*10+parseInt(str1[i+count]);
                count++;
                if(dfs(i+count, j, diff-val)) res=1;
            }
        } else{
            if(diff>0){
                if(dfs(i+1, j, diff-1)) res=1;
            } else if(diff===0&&j<str2.length&&str1[i]===str2[j]){
                if(dfs(i+1, j+1, diff)) res=1;
            }
        }
    }
    if(j<str2.length){
        if(isDigit(str2[j])){
            let count=0, val=0;
            while(j+count<str2.length&&count<3&&isDigit(str2[j+count])){
                val=val*10+parseInt(str2[j+count]);
                count++;
                if(dfs(i, j+count, diff+val)) res=1;
            }
        } else{
            if(diff<0&&dfs(i, j+1, diff+1)) res=1;
        }
    }
    return memo[i][j][diff+1000]=res;
}

var possiblyEquals = function(s1, s2) {
    str1=s1, str2=s2;
    for(let i=0; i<41; ++i){
        memo[i]=new Array()
        for(let j=0; j<41; ++j){
            memo[i][j]=new Array(2010).fill(2);
        }
    }
    return dfs(0, 0, 0);
};