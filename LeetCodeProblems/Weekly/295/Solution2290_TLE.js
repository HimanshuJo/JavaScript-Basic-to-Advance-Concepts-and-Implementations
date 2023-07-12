// 2290. Minimum Obstacle Removal to Reach Corner
/*
You are given a 0-indexed 2D integer array grid of size m x n. 
Each cell has one of two values:

0 represents an empty cell,
1 represents an obstacle that may be removed.
You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner 
(0, 0) to the lower right corner (m - 1, n - 1).

Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.

Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10^5
2 <= m * n <= 10^5
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0
*/

class QElement {
    
	constructor(element, priority){
		this.element = element;
		this.priority = priority;
	}
}

class PriorityQueue {
	
    constructor(){
		this.items = [];
	}

    enqueue(element, priority){
        var qElement = new QElement(element, priority);
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
        }
    }
    
    dequeue(){
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    front(){
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    rear(){
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length === 0;
    }
    
    printPQueue(){
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }

}

/**
 * @param {number[][]} grid
 * @return {number}
 */

var isValid=function(nwx, nwy, rws, cols){
    return nwx>=0&&nwy>=0&&nwx<=rws-1&&nwy<=cols-1;
}

var minimumObstacles = function(grid) {
    var obst=0;
    var rws=grid.length, cols=grid[0].length;
    var dist=new Array(rws);
    for(let i=0; i<rws; ++i){
        dist[i]=new Array(cols).fill(Number.MAX_SAFE_INTEGER);
    }
    for(let i=0; i<rws; ++i){
        for(let j=0; j<cols; ++j){
            if(grid[i][j]==1){
                obst++;
            }
        }
    }
    dist[0][0]=1;
    var dirs=[[0, 1], [0, -1], [1, 0], [-1, 0]];
    var pq = new PriorityQueue();
    pq.enqueue([0, 0], 0);
    while(!pq.isEmpty()){
        let curr=pq.front();
        if(curr.element[0]===rws-1&&curr.element[1]===cols-1) break;
        pq.dequeue();
        for(let dir of dirs){
            let nwx=curr.element[0]+dir[0];
            let nwy=curr.element[1]+dir[1];
            if(isValid(nwx, nwy, rws, cols)){
                if(curr.priority+grid[nwx][nwy]>obst) continue;
                if(dist[nwx][nwy]<=curr.priority+grid[nwx][nwy]) continue;
                dist[nwx][nwy]=curr.priority+grid[nwx][nwy];
                pq.enqueue([nwx, nwy], curr.priority+grid[nwx][nwy]);
            }
        }
    }
    return dist[rws-1][cols-1];
};

// -------*******-------

var minimumObstacles = function(grid) {
    var obst=0;
    var rws=grid.length, cols=grid[0].length;
    var dist=new Array(rws);
    for(let i=0; i<rws; ++i){
        dist[i]=new Array(cols).fill(Number.MAX_SAFE_INTEGER);
    }
    dist[0][0]=1;
    var dirs=[[0, 1], [0, -1], [1, 0], [-1, 0]];
    var pq = new PriorityQueue();
    pq.enqueue([0, 0], 0);
    while(!pq.isEmpty()){
        let curr=pq.front();
        if(curr.element[0]===rws-1&&curr.element[1]===cols-1) break;
        pq.dequeue();
        for(let dir of dirs){
            let nwx=curr.element[0]+dir[0];
            let nwy=curr.element[1]+dir[1];
            if(isValid(nwx, nwy, rws, cols)){
                let wt=0;
                if(grid[nwx][nwy]===1) wt=1;
                if(curr.priority+wt<dist[nwx][nwy]){
                    dist[nwx][nwy]=curr.priority+wt;
                    pq.enqueue([nwx, nwy], dist[nwx][nwy]);
                }
            }
        }
    }
    return dist[rws-1][cols-1];
};