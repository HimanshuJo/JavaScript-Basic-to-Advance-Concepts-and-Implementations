// 2027. Minimum Moves to Convert String
/*
You are given a string s consisting of n characters which are either 'X' or 'O'.

A move is defined as selecting three consecutive characters of s and 
converting them to 'O'. 

Note that if a move is applied to the character 'O', it will stay the same.

Return the minimum number of moves required so that all the characters 
of s are converted to 'O'.

Example 1:

Input: s = "XXX"
Output: 1
Explanation: XXX -> OOO
We select all the 3 characters and convert them in one move.

Example 2:

Input: s = "XXOX"
Output: 2
Explanation: XXOX -> OOOX -> OOOO
We select the first 3 characters in the first move, and convert them to 'O'.
Then we select the last 3 characters and convert them so that the final string contains all 'O's.

Example 3:

Input: s = "OOOO"
Output: 0
Explanation: There are no 'X's in s to convert.
 

Constraints:

3 <= s.length <= 1000
s[i] is either 'X' or 'O'
*/

/**
 * @param {string} s
 * @return {number}
 */

/*
Solution 2:

var minimumMoves = function(s) {
    var ans=0, len=s.length;
    for(let i=0; i<len; ++i){
        if(s[i]!='O'){
            if(i+2<=len){
                var flag=false;
                let j;
                for(j=i; j<=i+2; ++j){
                    if(s[j]=='X'){
                        flag=true;
                    }
                }
                if(flag) ans++;
                i=j-1;
            } else{
                var flag=false;
                for(let j=i; j<len; ++j){
                    if(s[j]=='X'){
                        flag=true;
                        ans++;
                        break;
                    }
                }
            }
        }
    }
    return ans;
};
 */

var minimumMoves = function(s) {
    var len=s.length;
    var dp=new Array(len+1).fill(0);
    for(let i=0; i<len; ++i){
        if(s[i]=='X'){
            if(i-3>=0){
                dp[i]=dp[i-3]+1;
            } else{
                dp[i]++;
            }
        } else{
            if(i-1>=0)
                dp[i]=dp[i-1];
        }
    }
    return dp[len-1];
};