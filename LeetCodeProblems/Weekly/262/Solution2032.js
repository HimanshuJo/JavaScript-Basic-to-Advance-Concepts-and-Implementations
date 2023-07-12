// 2032. Two Out of Three
/*
Given three integer arrays nums1, nums2, and nums3, return a distinct array containing 
all the values that are present in at least two out of the three arrays. 

You may return the values in any order.

Example 1:

Input: nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
Output: [3,2]
Explanation: The values that are present in at least two arrays are:
- 3, in all three arrays.
- 2, in nums1 and nums2.
Example 2:

Input: nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
Output: [2,3,1]
Explanation: The values that are present in at least two arrays are:
- 2, in nums2 and nums3.
- 3, in nums1 and nums2.
- 1, in nums1 and nums3.
Example 3:

Input: nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
Output: []
Explanation: No value is present in at least two arrays.
 

Constraints:

1 <= nums1.length, nums2.length, nums3.length <= 100
1 <= nums1[i], nums2[j], nums3[k] <= 100
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree = function(nums1, nums2, nums3) {
    var res=new Set();
    var sz1=nums1.length, sz2=nums2.length, sz3=nums3.length;
    for(let i=0; i<sz1; ++i){
        let curr=nums1[i];
        if((nums2.indexOf(curr)!==-1)||(nums3.indexOf(curr)!==-1)){
            res.add(curr);
        }
    }
    for(let i=0; i<sz2; ++i){
        let curr=nums2[i];
        if((nums1.indexOf(curr)!==-1)||(nums3.indexOf(curr)!==-1)){
            res.add(curr);
        }
    }
    for(let i=0; i<sz3; ++i){
        let curr=nums3[i];
        if((nums1.indexOf(curr)!==-1)||(nums2.indexOf(curr)!==-1)){
            res.add(curr);
        }
    }
    var ans=[];
    for(let val of res)
        ans.push(val);
    return ans;
};

// -------

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree2 = function(nums1, nums2, nums3) {
    var isPresent=[];
    for(let i=0; i<3; ++i){
        isPresent[i]=new Array(101).fill(false);
    }
    var seen=new Array(101).fill(false);
    var res=[];
    for(let val of nums1){
        isPresent[0][val]=true;
    }
    for(let val of nums2){
        if(isPresent[0][val]&&!seen[val]){
            res.push(val);
            seen[val]=true;
        }
        isPresent[1][val]=true;
    }
    for(let val of nums3){
        if((isPresent[1][val]||isPresent[0][val])&&!seen[val]){
            res.push(val);
            seen[val]=true;
        }
    }
    return res;
};

// -------

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree3 = function(nums1, nums2, nums3) {
    
    var twoOutOfThreeGen=function(nums){
        var sz=nums.length;
        var isPresent=[];
        for(let i=0; i<sz; ++i){
            isPresent[i]=new Array(101).fill(false);
        }
        var seen=new Array(101).fill(false);
        var res=[];
        for(let i=0; i<sz; ++i){
            if(i===0){
                for(let val of nums[i]){
                    isPresent[0][val]=true;
                }
            } else{
                for(let val of nums[i]){
                    for(let x=i-1; x>=0; --x){
                        if(isPresent[x][val]&&!seen[val]){
                            res.push(val);
                            seen[val]=true;
                            break;
                        }
                    }
                    isPresent[i][val]=true;
                }
            }
        }
        return res;
    }
    
    var nums=[];
    nums.push(nums1);
    nums.push(nums2);
    nums.push(nums3);
    return twoOutOfThreeGen(nums);
};