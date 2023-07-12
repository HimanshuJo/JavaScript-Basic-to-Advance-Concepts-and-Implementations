// 2094. Finding 3-Digit Even Numbers
/*
You are given an integer array digits, where each element is a digit. The array may contain duplicates.

You need to find all the unique integers that follow the given requirements:

The integer consists of the concatenation of three elements from digits in any arbitrary order.
The integer does not have leading zeros.
The integer is even.
For example, if the given digits were [1, 2, 3], integers 132 and 312 follow the requirements.

Return a sorted array of the unique integers.

Example 1:

Input: digits = [2,1,3,0]
Output: [102,120,130,132,210,230,302,310,312,320]
Explanation: 
All the possible integers that follow the requirements are in the output array. 
Notice that there are no odd integers or integers with leading zeros.
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */

var dfs=function(digits, length, curr, isUsed, set){
    if(length===3){
        const val=parseInt(curr);
        set.add(val);
        return;
    }
    for(let i=0; i<digits.length; ++i){
        if(isUsed[i]||(length===0&&digits[i]===0)||(length===2&&digits[i]%2!==0)){
            continue;
        }
        isUsed[i]=true;
        dfs(digits, length+1, curr+digits[i], isUsed, set);
        isUsed[i]=false;
    }
};

var findEvenNumbers = function(digits) {
    const set=new Set();
    const isUsed=new Array(digits.length).fill(false);
    dfs(digits, 0, '', isUsed, set);
    return Array.from(set).sort((a, b)=>(a-b));
};