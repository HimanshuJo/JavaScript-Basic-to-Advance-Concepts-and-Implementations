// 2287. Rearrange Characters to Make Target String
/*
You are given two 0-indexed strings s and target. You can take some letters from s and rearrange 
them to form new strings.

Return the maximum number of copies of target that can be formed by taking letters from s and rearranging them.

Example 1:

Input: s = "ilovecodingonleetcode", target = "code"
Output: 2
Explanation:
For the first copy of "code", take the letters at indices 4, 5, 6, and 7.
For the second copy of "code", take the letters at indices 17, 18, 19, and 20.
The strings that are formed are "ecod" and "code" which can both be rearranged into "code".
We can make at most two copies of "code", so we return 2.
Example 2:

Input: s = "abcba", target = "abc"
Output: 1
Explanation:
We can make one copy of "abc" by taking the letters at indices 0, 1, and 2.
We can make at most one copy of "abc", so we return 1.
Note that while there is an extra 'a' and 'b' at indices 3 and 4, we cannot reuse the letter 'c' at index 2, 
so we cannot make a second copy of "abc".
Example 3:

Input: s = "abbaccaddaeea", target = "aaaaa"
Output: 1
Explanation:
We can make one copy of "aaaaa" by taking the letters at indices 0, 3, 6, 9, and 12.
We can make at most one copy of "aaaaa", so we return 1.
 

Constraints:

1 <= s.length <= 100
1 <= target.length <= 10
s and target consist of lowercase English letters.
*/

// TC: O(m*log(k))  m: target length, n: s length, k: map size
// SC: O(n+m)
/**
 * @param {string} s
 * @param {string} target
 * @return {number}
 */
var rearrangeCharacters = function(s, target) {
    var mp1=new Map();
    var mp2=new Map();
    for(let val of s){
        if(mp1.has(val)){
            mp1.set(val, mp1.get(val)+1);
        } else{
            mp1.set(val, 1);
        }
    }
    for(let val of target){
        if(mp2.has(val)){
            mp2.set(val, mp2.get(val)+1);
        } else{
            mp2.set(val, 1);
        }
    }
    var ans=Number.MAX_SAFE_INTEGER;
    for(let [key, value] of mp2){
        if(!mp1.has(key)) return 0;
        ans=Math.min(ans, Math.floor(mp1.get(key)/value));
    }
    return ans;
};

// TC: <=O(n*n)  m: target length, n: s length
// SC: O(n+m)
var rearrangeCharacters2 = function(s, target) {
    var len=s.length;
    var len2=target.length;
    var temp="";
    var j=0;
    var i;
    var ans=0;
    var seen=new Array(len).fill(0);
    for(let i=0; i<len; ++i){
        if(s[i]===target[j]&&seen[i]!=1){
            temp+=s[i];
            seen[i]=1;
            i=-1;
            j++;
        }
        if(temp===target){
            ans++;
            temp="";
            j=0;
        }
    }
    return ans;
};

// TC: <=max(O(n*n*n), O(n^2*m))  n: s length, m: target length
// SC: O(m)
var rearrangeCharacters3 = function(s, target) {
    var len=s.length;
    var len2=target.length;
    var temp="";
    var j=0;
    var i;
    var ans=0;
    for(let i=0; i<len; ++i){
        if(s[i]===target[j]){
            temp+=s[i];
            var nws=s.substr(0, i)+s.substr(i+1);
            len=nws.length;
            s=nws;
            i=-1;
            j++;
        }
        if(j==len2) j=0;
        if(temp===target){
            ans++;
            temp="";
        }
    }
    return ans;
};