// 2289. Steps to Make Array Non-decreasing
/*
You are given a 0-indexed integer array nums. 

In one step, remove all elements nums[i] where nums[i - 1] > nums[i] for all 0 < i < nums.length.

Return the number of steps performed until nums becomes a non-decreasing array.

Example 1:

Input: nums = [5,3,4,4,7,3,6,11,8,5,11]
Output: 3
Explanation: The following are the steps performed:
- Step 1: [5,3,4,4,7,3,6,11,8,5,11] becomes [5,4,4,7,6,11,11]
- Step 2: [5,4,4,7,6,11,11] becomes [5,4,7,11,11]
- Step 3: [5,4,7,11,11] becomes [5,7,11,11]
[5,7,11,11] is a non-decreasing array. Therefore, we return 3.
Example 2:

Input: nums = [4,5,7,7,13]
Output: 0
Explanation: nums is already a non-decreasing array. Therefore, we return 0.
 

Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var totalSteps = function(nums) {
    var sz=nums.length;
    var stk=[];
    var ans=0;
    var dp=new Array(sz).fill(0);
    for(let i=sz-1; i>=0; --i){
        while(stk.length){
            let curr=nums[stk[stk.length-1]];
            if(nums[i]>curr){
                dp[i]=Math.max(++dp[i], dp[stk.pop()]);
                ans=Math.max(ans, dp[i]);
            } else{
                break;
            }
        }
        stk.push(i);
    } 
    return ans;
};