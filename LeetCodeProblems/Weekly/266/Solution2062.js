// 2062. Count Vowel Substrings of a String
/*
A substring is a contiguous (non-empty) sequence of characters within a string.

A vowel substring is a substring that only consists of vowels 
('a', 'e', 'i', 'o', and 'u') and has all five vowels present in it.

Given a string word, return the number of vowel substrings in word.

Example 1:

Input: word = "aeiouu"
Output: 2
Explanation: The vowel substrings of word are as follows (underlined):
- "aeiouu"
- "aeiouu"
Example 2:

Input: word = "unicornarihan"
Output: 0
Explanation: Not all 5 vowels are present, so there are no vowel substrings.
Example 3:

Input: word = "cuaieuouac"
Output: 7
Explanation: The vowel substrings of word are as follows (underlined):
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"

Constraints:

1 <= word.length <= 100
word consists of lowercase English letters only.
*/

/**
 * @param {string} word
 * @return {number}
 */

var genAllSubstrs=function(word){
    var res=new Array();
    let n=word.length;
    for(let i=0; i<n; ++i){
        for(let j=i; j<n; ++j){
            var curr="";
            for(let k=i; k<=j; ++k){
               curr=curr.concat(word[k]); 
            }
            res.push(curr);
        }
    }
    return res;
}

var countVowelSubstrings = function(word) {
    var mp=new Map();
    for(let ch='a'.charCodeAt(); ch<='z'.charCodeAt(); ++ch){
        mp.set(String.fromCharCode(ch), String.fromCharCode(ch));
    }
    mp.delete('a'), mp.delete('e'), mp.delete('i'), mp.delete('o'), mp.delete('u');
    var allSubsStrs=genAllSubstrs(word);
    var ans=0;
    var sz=allSubsStrs.length;
    for(let i=0; i<sz; ++i){
        let currstr=allSubsStrs[i];
        let it1=currstr.indexOf("a"), it2=currstr.indexOf("e"), it3=currstr.indexOf("i"), it4=currstr.indexOf("o"), it5=currstr.indexOf("u");
        if(it1!=-1&&it2!=-1&&it3!=-1&&it4!=-1&&it5!=-1){
            let flag=false;
            let currsz=currstr.length;
            for(let i=0; i<currsz; ++i){
                let ch=currstr[i];
                if(mp.has(ch)){
                    flag=true;
                    break;
                }
            }
            if(!flag) ans++;
        }
    }
    return ans;
};