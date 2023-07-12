// 2257. Count Unguarded Cells in the Grid
/*
You are given two integers m and n representing a 0-indexed m x n grid. 
You are also given two 2D integer arrays guards and walls where 
guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

A guard can see every cell in the four cardinal directions (north, east, south, or west) 
starting from their position unless obstructed by a wall or another guard. 

A cell is guarded if there is at least one guard that can see it.

Return the number of unoccupied cells that are not guarded.

Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.

Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.

Constraints:

1 <= m, n <= 10^5
2 <= m * n <= 10^5
1 <= guards.length, walls.length <= 5 * 10^4
2 <= guards.length + walls.length <= m * n
guards[i].length == walls[j].length == 2
0 <= rowi, rowj < m
0 <= coli, colj < n
All the positions in guards and walls are unique.
*/

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function(m, n, guards, walls) {
    var seen=Array.from(Array(m), ()=>new Array(n));
    for(let i=0; i<m; ++i){
        for(let j=0; j<n; ++j){
            seen[i][j]=0;
        }
    }
    var gsz=guards.length, wsz=walls.length;
    for(let i=0; i<gsz; ++i){
        const curarr=guards[i];
        seen[curarr[0]][curarr[1]]=1;
    }
    for(let i=0; i<wsz; ++i){
        const curarr=walls[i];
        seen[curarr[0]][curarr[1]]=2;
    }
    for(let i=0; i<gsz; ++i){
        let currw=guards[i][0], curcol=guards[i][1];
        for(let i=curcol+1; i<n; ++i){
            if(seen[currw][i]===2||seen[currw][i]===1) break;
            seen[currw][i]=3;
        }
        for(let i=currw+1; i<m; ++i){
            if(seen[i][curcol]===2||seen[i][curcol]===1) break;
            seen[i][curcol]=3;
        }
        for(let i=curcol-1; i>=0; --i){
            if(seen[currw][i]===2||seen[currw][i]===1) break;
            seen[currw][i]=3;
        }
        for(let i=currw-1; i>=0; --i){
            if(seen[i][curcol]===2||seen[i][curcol]===1) break;
            seen[i][curcol]=3;
        }
    }
    var ans=0;
    for(let i=0; i<m; ++i){
        for(let j=0; j<n; ++j){
            if(seen[i][j]===0) ans++;
        }
    }
    return ans;
};