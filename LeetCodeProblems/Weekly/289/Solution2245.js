//2245. Maximum Trailing Zeros in a Cornered Path
/*
You are given a 2D integer array grid of size m x n, where each cell contains a positive integer.

A cornered path is defined as a set of adjacent cells with at most one turn. 
More specifically, the path should exclusively move either horizontally or 
vertically up to the turn (if there is one), without returning to a previously visited cell. 
After the turn, the path will then move exclusively in the alternate direction: 
move vertically if it moved horizontally, and vice versa, also without returning to a previously visited cell.

The product of a path is defined as the product of all the values in the path.

Return the maximum number of trailing zeros in the product of a cornered path found in grid.

Note:

Horizontal movement means moving in either the left or right direction.
Vertical movement means moving in either the up or down direction.

Input: grid = [[23,17,15,3,20],[8,1,20,27,11],[9,4,6,2,21],[40,9,1,10,6],[22,7,4,5,3]]
Output: 3
Explanation: The grid on the left shows a valid cornered path.
It has a product of 15 * 20 * 6 * 1 * 10 = 18000 which has 3 trailing zeros.
It can be shown that this is the maximum trailing zeros in the product of a cornered path.

The grid in the middle is not a cornered path as it has more than one turn.
The grid on the right is not a cornered path as it requires a return to a previously visited cell.

Input: grid = [[4,3,2],[7,6,1],[8,8,8]]
Output: 0
Explanation: The grid is shown in the figure above.
There are no cornered paths in the grid that result in a product with a trailing zero.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10^5
1 <= m * n <= 10^5
1 <= grid[i][j] <= 1000
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxTrailingZeros = function(grid) {
    const m=grid.length, n=grid[0].length, 
          ta=[...Array(m)].map(i=>Array(n).fill(1)),
          tb=[...Array(m)].map(i=>Array(n).fill(1)),
          tc=[...Array(m)].map(i=>Array(n).fill(1)),
          td=[...Array(m)].map(i=>Array(n).fill(1));
    const c52=(s)=>{
        let c5=0, c2=0;
        while(s%2===0){
            s/=2;
            c2++;
        }
        while(s%5===0){
            s/=5;
            c5++;
        }
        return [c5, c2];
    }
    const c10=([c5, c2])=>{
        return Math.min(c5, c2);
    }
    for(let i=0; i<m; ++i){
        for(let j=0; j<n; ++j){
            ta[i][j]=(j===0)?c52(grid[i][j]):[c52(grid[i][j])[0]+ta[i][j-1][0],
                             c52(grid[i][j])[1]+ta[i][j-1][1]];
            tb[i][j]=(i===0)?c52(grid[i][j]):[c52(grid[i][j])[0]+tb[i-1][j][0],
                             c52(grid[i][j])[1]+tb[i-1][j][1]];
        }
    }
    for(let i=m-1; i>=0; --i){
        for(let j=n-1; j>=0; --j){
            tc[i][j]=(j===n-1)?c52(grid[i][j]):[c52(grid[i][j])[0]+tc[i][j+1][0],
                               c52(grid[i][j])[1]+tc[i][j+1][1]];
            td[i][j]=(i===m-1)?c52(grid[i][j]):[c52(grid[i][j])[0]+td[i+1][j][0],
                               c52(grid[i][j])[1]+td[i+1][j][1]];
        }
    }
    let res=0;
    for(let i=0; i<m; ++i){
        for(let j=0; j<n; ++j){
            let s1=(i===0)?c10(ta[i][j]):c10([ta[i][j][0]+tb[i-1][j][0],
                               ta[i][j][1]+tb[i-1][j][1]]);
            let s2=(i===m-1)?c10(ta[i][j]):c10([ta[i][j][0]+td[i+1][j][0],
                                 ta[i][j][1]+td[i+1][j][1]]);
            let s3=(i===0)?c10(tc[i][j]):c10([tc[i][j][0]+tb[i-1][j][0],
                               tc[i][j][1]+tb[i-1][j][1]]);
            let s4=(i===m-1)?c10(tc[i][j]):c10([tc[i][j][0]+td[i+1][j][0],
                                 tc[i][j][1]+td[i+1][j][1]]);
            res=Math.max(res, s1, s2, s3, s4);
        }
    }
    return res;
};