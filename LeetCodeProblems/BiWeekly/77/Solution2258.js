// 2258. Escape the Spreading Fire
/*
You are given a 0-indexed 2D integer array grid of size m x n which represents a field. 
Each cell has one of three values:

0 represents grass,
1 represents fire,
2 represents a wall that you and fire cannot pass through.
You are situated in the top-left cell, (0, 0), and you want to travel to the 
safehouse at the bottom-right cell, (m - 1, n - 1). 

Every minute, you may move to an adjacent grass cell. After your move, every fire cell 
will spread to all adjacent cells that are not walls.

Return the maximum number of minutes that you can stay in your initial position 
before moving while still safely reaching the safehouse. 

If this is impossible, return -1. If you can always reach the safehouse regardless 
of the minutes stayed, return 109.

Note that even if the fire spreads to the safehouse immediately after you 
have reached it, it will be counted as safely reaching the safehouse.

A cell is adjacent to another cell if the former is directly 
north, east, south, or west of the latter (i.e., their sides are touching).

Input: grid = [[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]]
Output: 3
Explanation: The figure above shows the scenario where you stay in the initial position for 3 minutes.
You will still be able to safely reach the safehouse.
Staying for more than 3 minutes will not allow you to safely reach the safehouse.

Input: grid = [[0,0,0,0],[0,1,2,0],[0,2,0,0]]
Output: -1
Explanation: The figure above shows the scenario where you immediately move towards the safehouse.
Fire will spread to any cell you move towards and it is impossible to safely reach the safehouse.
Thus, -1 is returned.

Input: grid = [[0,0,0],[2,2,0],[1,2,0]]
Output: 1000000000
Explanation: The figure above shows the initial grid.
Notice that the fire is contained by walls and you will always be able to safely reach the safehouse.
Thus, 109 is returned.

Constraints:

m == grid.length
n == grid[i].length
2 <= m, n <= 300
4 <= m * n <= 2 * 10^4
grid[i][j] is either 0, 1, or 2.
grid[0][0] == grid[m - 1][n - 1] == 0
*/

function Point(row, colum){
    this.row=row, this.column=colum;
}

function recordInitialFirePoints(grid){
    this.initialFirePoints=[];
    for(let r=0; r<this.rows; ++r){
        for(let c=0; c<this.columns; ++c){
            if(grid[r][c]===this.FIRE){
                this.initialFirePoints.push(new Point(r, c));
            }
        }
    }
}

function cloneInitialGrid(grid){
    this.currentGrid=Array.from(new Array(this.rows), ()=>new Array(this.columns));
    for(let r=0; r<rows; ++r){
        this.currentGrid[r]=Array.from(grid[r]);
    }
}

function isInGrid(rw, col){
    return (rw>=0&&rw<this.rows&&col>=0&&col<this.columns);
}

function updateGrid(queue, fireUpdate, initialUpdate){
    let size=queue.size();
    while(size-- >0){
        const point=queue.dequeue();
        for(let move of this.MOVES){
            const nextRow=point.row+move[0];
            const nextCol=point.column+move[1];
            if(isInGrid(nextRow, nextCol)&&this.currentGrid[nextRow][nextCol]===this.GRASS){
                if(fireUpdate){
                    queue.enqueue(new Point(nextRow, nextCol));
                    this.currentGrid[nextRow][nextCol]=this.FIRE;
                    this.blockedPointsOnPersonLatestSteps+=
                        (!initialUpdate&&this.personLatestSteps[nextRow][nextCol]===this.ID_personLatestSteps)?1:0;
                } else if(this.personLatestSteps[nextRow][nextCol]===this.GRASS){
                    queue.enqueue(new Point(nextRow, nextCol));
                    this.personLatestSteps[nextRow][nextCol]=this.ID_personLatestSteps;
                }
            }
        }
    }
}

function initiallySpreadFire(fireQueue, time){
    for(let point of this.initialFirePoints){
        fireQueue.enqueue(point);
    }
    let fireUpdate=true, initialUpdate=true, countMinutes=0;
    while(!fireQueue.isEmpty()&&countMinutes<time){
        countMinutes++;
        updateGrid(fireQueue, fireUpdate, initialUpdate);
    }
}

function goalCanBeReached(grid, time){
    cloneInitialGrid(grid);
    const fireQueue=new Queue();
    initiallySpreadFire(fireQueue, time);
    if(this.currentGrid[0][0]===this.FIRE){
        return false;
    }
    const personQueue=new Queue();
    personQueue.enqueue(new Point(0, 0));
    this.ID_personLatestSteps=1;
    this.personLatestSteps=Array.from(new Array(this.rows), ()=>new Array(this.columns).fill(0));
    this.personLatestSteps[0][0]=this.ID_personLatestSteps;
    while(!personQueue.isEmpty()||!fireQueue.isEmpty()){
        let fireUpdate=false;
        let initialUpdate=false;
        ++this.ID_personLatestSteps;
        updateGrid(personQueue, fireUpdate, initialUpdate);
        if(this.personLatestSteps[this.rows-1][this.columns-1]===this.ID_personLatestSteps){
            return true;
        }
        fireUpdate=true;
        initialUpdate=false;
        this.blockedPointsOnPersonLatestSteps=0;
        updateGrid(fireQueue, fireUpdate, initialUpdate);
        if(this.blockedPointsOnPersonLatestSteps===personQueue.size()) return false;
    }
    return false;
}

function findMaxPossibleWaitingTime(grid){
    let lowerLimit=0, upperLimit=this.MAX_TIME;
    let maxPossibleWaitingTime=this.NOT_POSSIBLE_TO_REACH_GOAL;
    while(lowerLimit<=upperLimit){
        let time=lowerLimit+Math.floor((upperLimit-lowerLimit)/2);
        if(goalCanBeReached(grid, time)){
            maxPossibleWaitingTime=Math.max(maxPossibleWaitingTime, time);
            lowerLimit=time+1;
        } else{
            upperLimit=time-1;
        }
    }
    return (maxPossibleWaitingTime!==this.MAX_TIME)?maxPossibleWaitingTime:this.CAN_WAIT_UNLIMITED_TIME;
}

var maximumMinutes = function(grid) {
    this.GRASS=0,
    this.FIRE=1,
    this.WALL=2,
    this.MAX_TIME=2*Math.pow(10, 4),
    this.CAN_WAIT_UNLIMITED_TIME=Math.pow(10, 9),
    this.NOT_POSSIBLE_TO_REACH_GOAL=-1,
    this.MOVES=[[-1, 0], [1, 0], [0, -1], [0, 1]],
    this.initialFirePoints=[],
    this.currentGrid=[],
    this.personLatestSteps=[],
    this.ID_personLatestSteps=0,
    this.blockedPointsOnPersonLatestSteps=0,
    this.rows=grid.length,
    this.columns=grid[0].length;
    recordInitialFirePoints(grid);
    return findMaxPossibleWaitingTime(grid);
};