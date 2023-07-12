// 2033. Minimum Operations to Make a Uni-Value Grid
/*
You are given a 2D integer grid of size m x n and an integer x. 
In one operation, you can add x to or subtract x from any element in the grid.

A uni-value grid is a grid where all the elements of it are equal.

Return the minimum number of operations to make the grid uni-value. 
If it is not possible, return -1.

Input: grid = [[2,4],[6,8]], x = 2
Output: 4
Explanation: We can make every element equal to 4 by doing the following: 
- Add x to 2 once.
- Subtract x from 6 once.
- Subtract x from 8 twice.
A total of 4 operations were used.

Input: grid = [[1,5],[2,3]], x = 1
Output: 5
Explanation: We can make every element equal to 3.

Input: grid = [[1,2],[3,4]], x = 2
Output: -1
Explanation: It is impossible to make every element equal.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10^5
1 <= m * n <= 10^5
1 <= x, grid[i][j] <= 10^4
*/

/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */

/*
var minOperations = function(grid, x) {
    var res=0;
    var comb=[];
    var rws=grid.length, cols=grid[0].length;
    for(let i=0; i<rws; ++i){
        for(let j=0; j<cols; ++j){
            comb.push(grid[i][j]);
        }
    }
    comb.sort((A, B)=>(A-B));
    var sz=comb.length;
    var ans=0;
    var median=comb[Math.floor(sz/2)];
    for(let val of comb){
        if((Math.abs(val-median)%x!=0)) return -1;
        ans+=((Math.abs(val-median))/x);
    }
    if(sz%2!=0){
        return ans;
    } else{
        var median2=comb[Math.floor(sz/2)-1];
        var temp2=0;
        for(let val of comb){
            temp2+=((Math.abs(val-median2))/x); 
        }
        return Math.min(ans, temp2);
    }
    return -1;
};
*/

var minOperations = function(grid, x) {
    var res=Number.MAX_SAFE_INTEGER, ops=0;
    var vec=[];
    var dp=new Array(grid.length*grid[0].length).fill(0);
    var rws=grid.length, cols=grid[0].length;
    for(let i=0; i<rws; ++i){
        for(let j=0; j<cols; ++j){
            vec.push(grid[i][j]);
        }
    }
    vec.sort((A, B)=>(A-B));
    var sz=vec.length;
    for(let i=0; i<sz-1; ++i){
        if((vec[i+1]-vec[i])%x) return -1;
        dp[i+1]=dp[i]+((i+1)*((vec[i+1]-vec[i])/x));
    }
    for(let i=sz-1; i>0; --i){
        ops+=(vec[i]-vec[i-1])/x*(vec.length-i);
        res=Math.min(res, ops+dp[i-1]);
    }
    return res==Number.MAX_SAFE_INTEGER?0:res;
};