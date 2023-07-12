// 2035. Partition Array Into Two Arrays to Minimize Sum Difference
/*
You are given an integer array nums of 2 * n integers. 

You need to partition nums into two arrays of length n to minimize the absolute 
difference of the sums of the arrays. 

To partition nums, put each element of nums into one of the two arrays.

Return the minimum possible absolute difference.

Input: nums = [3,9,7,3]
Output: 2
Explanation: One optimal partition is: [3,9] and [7,3].
The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.

Input: nums = [-36,36]
Output: 72
Explanation: One optimal partition is: [-36] and [36].
The absolute difference between the sums of the arrays is abs((-36) - (36)) = 72.

Input: nums = [2,-1,0,4,-2,-9]
Output: 0
Explanation: One optimal partition is: [2,4,-9] and [-1,0,-2].
The absolute difference between the sums of the arrays is abs((2 + 4 + -9) - (-1 + 0 + -2)) = 0.

Constraints:

1 <= n <= 15
nums.length == 2 * n
-107 <= nums[i] <= 10^7
*/
/*
Algorithm

High Level Approach:

*  We divide the input array into two arbitary parts. 
*  Then, We take one subset from each part, such that, sum of size of both subset = n. 
*  And with that subset we try to minimise the absolute difference.

-------

Detailed:

    Divide the original array in two arbitary parts, each of size n. 

    LeftPart: [0, n-1], RightPart[n, 2*n-1]

    -------

    Find all possible sums in each part.

        As each part will be of size <= 15
        We can safely enumerate all possible sums in each part.

        For each part, store the sum of a subset along with the size of the subset.

        In Code:
        I have used two 2-D vectors, left and right, to store sums of all possible subset.

        Left[ i ]: stores all possible sums of the subset of size i, in the left part.

        Similarly, for right part.

        Requirement: 

            We need to divide the original array in two parts of size n, each. 
            Such that the absolute difference of sum is minimised.

-------

Let say from left part we take a subset of size sz (Let's say its sum is a), 
then from right part we need to take a subset of size of n-sz (Let's say its sum is b). 

Then, Part1Sum = a+b.

We have to minimise abs(Part1Sum - Part2Sum)

Now, Part1Sum = a+b and Part2Sum = TotalSum - (a+b)

Thus we have to minimise, abs(TotalSum -2a - 2b)

Now we iterate over a, and binary search b in the vector right

TC:

    O(2^n * log(2^n))

This technique commonly known as Meet In Middle. Commonly used when 25 <= array_size <= 40
*/

/**
 * @param {number[]} nums
 * @return {number}
 */

var lower_bound=function(nums, val){
    var sz=nums.length;
    var left=0, right=sz-1;
    var ans=-1;
    while(left<=right){
        let mid=left+Math.floor((right-left)/2);
        if(nums[mid]>=val){
            ans=mid;
            right=mid-1;
        } else{
            left=mid+1;
        }
    }
    return ans;
}

var minimumDifference = function(nums) {
    var n=nums.length, res=0, sum=0;
    for(let val of nums){
        sum+=val;
    }
    var N=n/2;
    var left=new Array(N+1), right=new Array(N+1);
    for(let i=0; i<(1<<N); ++i){
        left[i]=[];
        right[i]=[];
    }
    for(let mask=0; mask<(1<<N); ++mask){
        let sz=0, l=0, r=0;
        for(let i=0; i<N; ++i){
            if(mask&(1<<i)){
                sz++;
                l+=nums[i], r+=nums[i+N];
            }
        }
        left[sz].push(l), right[sz].push(r);
    }
    for(let sz=0; sz<=N; ++sz){
        right[sz].sort((A, B)=>A-B);
    }
    res=Math.min(Math.abs(sum-2*left[N][0]), Math.abs(sum-2*right[N][0]));
    for(let sz=1; sz<N; ++sz){
        for(let val of left[sz]){
            let b=(sum-2*val)/2, rsz=N-sz;
            let v=right[rsz];
            let tochk=lower_bound(v, b);
            if(tochk!=-1){
                res=Math.min(res, Math.abs(sum-2*(val+(v[tochk]))));
            }
            if(tochk!=0&&tochk!=-1){
                --tochk;
                res=Math.min(res, Math.abs(sum-2*(val+(v[tochk]))));
            }
        }
    }
    return res;
};