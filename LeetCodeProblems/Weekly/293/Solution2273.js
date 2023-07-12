// 2273. Find Resultant Array After Removing Anagrams
/*
You are given a 0-indexed string array words, where words[i] consists of lowercase English letters.

In one operation, select any index i such that 0 < i < words.length and 
words[i - 1] and words[i] are anagrams, and delete words[i] from words. 
Keep performing this operation as long as you can select an index that satisfies the conditions.

Return words after performing all operations. It can be shown that 
selecting the indices for each operation in any arbitrary order will lead to the same result.

An Anagram is a word or phrase formed by rearranging the letters of 
a different word or phrase using all the original letters exactly once. 

For example, "dacb" is an anagram of "abdc"

Example 1:

Input: words = ["abba","baba","bbaa","cd","cd"]
Output: ["abba","cd"]
Explanation:
One of the ways we can obtain the resultant array is by using the following operations:
- Since words[2] = "bbaa" and words[1] = "baba" are anagrams, we choose index 2 and delete words[2].
  Now words = ["abba","baba","cd","cd"].
- Since words[1] = "baba" and words[0] = "abba" are anagrams, we choose index 1 and delete words[1].
  Now words = ["abba","cd","cd"].
- Since words[2] = "cd" and words[1] = "cd" are anagrams, we choose index 2 and delete words[2].
  Now words = ["abba","cd"].
We can no longer perform any operations, so ["abba","cd"] is the final answer.
Example 2:

Input: words = ["a","b","c","d","e"]
Output: ["a","b","c","d","e"]
Explanation:
No two adjacent strings in words are anagrams of each other, so no operations are performed.
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
*/

/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function(words) {
    var sz=words.length
    if(sz>=1){
        while(true){
            var flag2=false
            for(var i=1; i<sz; ++i){
                let prev=words[i-1], curr=words[i]
                mp1=new Map(), mp2=new Map()
                let flag=false
                for(let x=0; x<prev.length; ++x){
                    mp1.set(prev[x], mp1.get(prev[x])+1||1)
                }
                for(let x=0; x<curr.length; ++x){
                    mp2.set(curr[x], mp2.get(curr[x])+1||1)
                }
                for(let x=0; x<prev.length; ++x){
                    let cnt=mp1.get(prev[x])
                    if(!mp2.has(prev[x])){
                        flag=true
                        break
                    } else{
                        let cnt2=mp2.get(prev[x])
                        if(cnt!==cnt2){
                            flag=true
                            break
                        }
                    }
                }
                if(!flag){
                    if(mp1.size===mp2.size){
                        flag2=true
                        words.splice(i, 1)
                        sz=words.length
                        break;
                    }
                }
            }
            if(!flag2) break;
        }
    }
    return words
};