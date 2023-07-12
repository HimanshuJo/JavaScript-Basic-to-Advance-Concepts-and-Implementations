// 2266. Count Number of Texts
/*
Alice is texting Bob using her phone. The mapping of digits to letters is shown in the figure below.

In order to add a letter, Alice has to press the key of the corresponding digit i times, 
where i is the position of the letter in the key.

For example, to add the letter 's', Alice has to press '7' four times. 
Similarly, to add the letter 'k', Alice has to press '5' twice.
Note that the digits '0' and '1' do not map to any letters, so Alice does not use them.

However, due to an error in transmission, Bob did not receive Alice's text message 
but received a string of pressed keys instead.

For example, when Alice sent the message "bob", Bob received the string "2266622".

Given a string pressedKeys representing the string received by Bob, return 
the total number of possible text messages Alice could have sent.

Since the answer may be very large, return it modulo 10^9 + 7.

Example 1:

Input: pressedKeys = "22233"
Output: 8
Explanation:
The possible text messages Alice could have sent are:
"aaadd", "abdd", "badd", "cdd", "aaae", "abe", "bae", and "ce".
Since there are 8 possible messages, we return 8.

Example 2:

Input: pressedKeys = "222222222222222222222222222222222222"
Output: 82876089
Explanation:
There are 2082876103 possible text messages Alice could have sent.
Since we need to return the answer modulo 109 + 7, we return 2082876103 % (10^9 + 7) = 82876089.

Constraints:

1 <= pressedKeys.length <= 10^5
pressedKeys only consists of digits from '2' - '9'.
*/

/**
 * @param {string} pressedKeys
 * @return {number}
 */

var mod=1e9+7;

var dfs=function(idx, pressedKeys, key, memo){
    if(idx===pressedKeys.length) return 1;
    if(memo[idx]!=-1) return memo[idx];
    let count=0;
    let num=parseInt(pressedKeys[idx]);
    let numCharsCnt=key[num];
    for(let i=0; i<numCharsCnt&&idx+i<pressedKeys.length&&pressedKeys[idx]===pressedKeys[idx+i]; ++i){
        count+=dfs(idx+i+1, pressedKeys, key, memo);
        count%=mod;
    }
    return memo[idx]=count;
}

var countTexts = function(pressedKeys) {
    var key=[0, 0, 3, 3, 3, 3, 3, 4, 3, 4];
    var len=pressedKeys.length;
    var memo=new Array(len).fill(-1);
    return dfs(0, pressedKeys, key, memo);
};

// -------*******-------

/**
 * @param {string} pressedKeys
 * @return {number}
 */

var mod=1e9+7;

var countTexts2 = function(pressedKeys) {
    var key=[0, 0, 3, 3, 3, 3, 3, 4, 3, 4];
    var len=pressedKeys.length;
    var dp=new Array(len+1).fill(-1);
    dp[len]=1;
    for(let idx=len-1; idx>=0; --idx){
        let count=0;
        let num=parseInt(pressedKeys[idx]);
        let numCharsCnt=key[num];
        for(let i=0; i<numCharsCnt&&i+idx<pressedKeys.length&&pressedKeys[idx]===pressedKeys[idx+i]; ++i){
            count+=dp[idx+i+1];
            count%=mod;
        }
        dp[idx]=count;
    }
    return dp[0];
};

// -------*******-------

/**
 * @param {string} pressedKeys
 * @return {number}
 */

var mod=1e9+7;

var countTexts = function(pressedKeys) {
    var len=pressedKeys.length;
    var dp=new Array(len+1).fill(-1);
    dp[0]=1;
    for(let i=1; i<=len; ++i){
        dp[i]=dp[i-1]%mod;
        if(i-2>=0&&pressedKeys[i-1]===pressedKeys[i-2]){
            dp[i]+=dp[i-2];
            dp[i]%=mod;
            if(i-3>=0&&pressedKeys[i-1]==pressedKeys[i-3]){
                dp[i]+=dp[i-3];
                dp[i]%=mod;
                if((pressedKeys[i-1]==='7'||pressedKeys[i-1]==='9')&&i-4>=0&&pressedKeys[i-1]===pressedKeys[i-4]){
                    dp[i]+=dp[i-4];
                    dp[i]%=mod;
                }
            }
        }
    }
    return dp[len];
};