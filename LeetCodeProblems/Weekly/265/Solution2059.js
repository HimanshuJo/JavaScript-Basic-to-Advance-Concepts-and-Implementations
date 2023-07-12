// 2059. Minimum Operations to Convert Number
/*
You are given a 0-indexed integer array nums containing distinct numbers, 
an integer start, and an integer goal. There is an integer x that 
is initially set to start, and you want to perform operations on x such that 
it is converted to goal. You can perform the following operation repeatedly on the number x:

If 0 <= x <= 1000, then for any index i in the array (0 <= i < nums.length), you can set x to any of the following:

x + nums[i]
x - nums[i]
x ^ nums[i] (bitwise-XOR)
Note that you can use each nums[i] any number of times in any order. 
Operations that set x to be out of the range 0 <= x <= 1000 are valid, 
but no more operations can be done afterward.

Return the minimum number of operations needed to convert x = start into goal, and -1 if it is not possible.

Input: nums = [2,4,12], start = 2, goal = 12
Output: 2
Explanation: We can go from 2 → 14 → 12 with the following 2 operations.
- 2 + 12 = 14
- 14 - 2 = 12

Input: nums = [3,5,7], start = 0, goal = -4
Output: 2
Explanation: We can go from 0 → 3 → -4 with the following 2 operations. 
- 0 + 3 = 3
- 3 - 7 = -4
Note that the last operation sets x out of the range 0 <= x <= 1000, which is valid.

Input: nums = [2,8,16], start = 0, goal = 1
Output: -1
Explanation: There is no way to convert 0 into 1.

Constraints:

1 <= nums.length <= 1000
-10^9 <= nums[i], goal <= 10^9
0 <= start <= 1000
start != goal
All the integers in nums are distinct.
*/

/*
Solution BFS:

Just do simple BFS and maintain a visited array to keep track of numbers that we have seen already.

Here keypoint is numbers can be from 0 to 1000 so make visited array and once we have seen 
that number we don't have to include that number again.

Time Complexity:-O(n*m) where n is size of the array and m is the range.

*/

/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */

var bfs=function(nums, start, goal){
    var dist=new Array(1001).fill(Number.MAX_SAFE_INTEGER);
    var q=[];
    q.push(start);
    dist[start]=0;
    while(q.length){
        let curr=q.shift();
        if(curr===goal){
            return dist[curr];
        }
        for(const vals of nums){
            let add=curr+vals, sub=curr-vals, xor_=curr^vals;
            let next=[add, sub, xor_];
            for(const ne of next){
                if(ne>=0&&ne<=1000){
                    if(dist[ne]>dist[curr]+1){
                        dist[ne]=dist[curr]+1;
                        q.push(ne);
                    }
                } else{
                    if(ne===goal) return dist[curr]+1;
                }
            }
        }
    }
    return -1;
}

var minimumOperations = function(nums, start, goal) {
    return bfs(nums, start, goal);
};