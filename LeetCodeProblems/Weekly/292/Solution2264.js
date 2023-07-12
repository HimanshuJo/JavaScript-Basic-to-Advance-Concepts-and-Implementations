// 2264. Largest 3-Same-Digit Number in String
/*
You are given a string num representing a large integer. 

An integer is good if it meets the following conditions:

It is a substring of num with length 3.
It consists of only one unique digit.
Return the maximum good integer as a string or an empty string "" if no such integer exists.

Note:

A substring is a contiguous sequence of characters within a string.
There may be leading zeroes in num or a good integer.

Example 1:

Input: num = "6777133339"
Output: "777"
Explanation: There are two distinct good integers: "777" and "333".
"777" is the largest, so we return "777".
Example 2:

Input: num = "2300019"
Output: "000"
Explanation: "000" is the only good integer.
Example 3:

Input: num = "42352338"
Output: ""
Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.

Constraints:

3 <= num.length <= 1000
num only consists of digits.
*/

/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function(num) {
    var temp=0, ans="", len=num.length
    for(let i=0; i<len; ++i){
        let curr="", tochk=num[i], flag=false
        for(let j=i; j<len; ++j){
            if(num[j]!=tochk){
                flag=true
                break
            } else{
                curr+=num[j]
                if(curr.length==3) break
            }
        }
        if(!flag&&curr.length==3){
            let temp2=parseInt(curr)
            if(temp2>=temp){
                temp=temp2
                ans=curr
            }
        }
    }
    return ans
};