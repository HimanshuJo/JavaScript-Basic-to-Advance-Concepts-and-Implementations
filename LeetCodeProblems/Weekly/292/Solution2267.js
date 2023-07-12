// 2267. Check if There Is a Valid Parentheses String Path
/*
A parentheses string is a non-empty string consisting only of '(' and ')'. 

It is valid if any of the following conditions is true:

It is ().
It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
It can be written as (A), where A is a valid parentheses string.

You are given an m x n matrix of parentheses grid. 

A valid parentheses string path in the grid is a path satisfying all of the following conditions:

The path starts from the upper left cell (0, 0).
The path ends at the bottom-right cell (m - 1, n - 1).
The path only ever moves down or right.
The resulting parentheses string formed by the path is valid.

Return true if there exists a valid parentheses string path in the grid. Otherwise, return false.

Input: grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]
Output: true
Explanation: The above diagram shows two possible paths that form valid parentheses strings.
The first path shown results in the valid parentheses string "()(())".
The second path shown results in the valid parentheses string "((()))".
Note that there may be other valid parentheses string paths.

Input: grid = [[")",")"],["(","("]]
Output: false
Explanation: The two possible paths form the parentheses strings "))(" and ")((". 
Since neither of them are valid parentheses strings, we return false.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 100
grid[i][j] is either '(' or ')'.
*/

/**
 * @param {character[][]} grid
 * @return {boolean}
 */

var dfs=function(grid, currw, curcol, rws, cols, open, memo){
    if(currw<0||curcol<0||currw>=rws||curcol>=cols||open<0) return false
    if(memo[currw][curcol][open]!=-1) return memo[currw][curcol][open]
    if(currw===rws-1&&curcol===cols-1){
        if(grid[currw][curcol]==='(') open++
        else open--
        if(open===0) return true
        return false
    }
    if(grid[currw][curcol]==='('){
        if(dfs(grid, currw+1, curcol, rws, cols, open+1, memo)||
           dfs(grid, currw, curcol+1, rws, cols, open+1, memo)) return true
    } else{
        if(dfs(grid, currw+1, curcol, rws, cols, open-1, memo)||
           dfs(grid, currw, curcol+1, rws, cols, open-1, memo)) return true;
    }
    memo[currw][curcol][open]=false
    return memo[currw][curcol][open]
}

var hasValidPath = function(grid) {
    var rws=grid.length, cols=grid[0].length
    var open=0
    var memo=[]
    for(let i=0; i<102; ++i){
        memo[i]=new Array(101)
        for(let j=0; j<202; ++j){
            memo[i][j]=new Array(201).fill(-1)
        }
    }
    if(grid[0][0]===')') return false
    if(dfs(grid, 0, 0, rws, cols, open, memo)) return true
    return false
};

// -------*******-------

var bfs=function(grid, rws, cols, memo){
    q=[]
    let temp=[0, 0, 1]
    q.push(temp)
    memo[0][0][1]=1
    var dir=[]
    for(let i=0; i<2; ++i){
        dir[i]=new Array(2)
    }
    dir[0][0]=1, dir[0][1]=0, dir[1][0]=0, dir[1][1]=1
    while(q.length){
        let temparr=q.shift()
        let currw=temparr[0], curcol=temparr[1], brac=temparr[2]
        if(brac<0) continue
        if(currw===rws-1&&curcol===cols-1){
            if(brac===0) return true
        }
        for(let i=0; i<2; ++i){
            let nwr=currw+dir[i][0], nwc=curcol+dir[i][1]
            if(brac<0) continue
            if(nwr>=0&&nwc>=0&&nwr<rws&&nwc<cols&&memo[nwr][nwc][brac]===-1){
                if(brac>=0&&brac<=rws*cols) memo[nwr][nwc][brac]=1
                if(grid[nwr][nwc]==='('){
                    let temp=[nwr, nwc, brac+1]
                    q.push(temp)
                } else{
                    let temp=[nwr, nwc, brac-1]
                    q.push(temp)
                }
            }
        }
    }
    return false
}

var hasValidPath2 = function(grid) {
    var rws=grid.length, cols=grid[0].length
    if(grid[0][0]===')') return false
    var memo=[]
    for(let i=0; i<102; ++i){
        memo[i]=new Array(102)
        for(let j=0; j<102; ++j){
            memo[i][j]=new Array(201).fill(-1)
        }
    }
    return (bfs(grid, rws, cols, memo));
};