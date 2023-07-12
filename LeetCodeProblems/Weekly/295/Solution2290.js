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

class DoubleEndedQueue {

    constructor() {
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    addFront(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.front = node;
            this.back = this.front;
        } else {
            this.front.previous = node;
            node.next = this.front;
            this.front = node;
        }
        ++this.size;
    }

    addBack(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.back = node;
            this.front = this.back;
        } else {
            this.back.next = node;
            node.previous = this.back;
            this.back = node;
        }
        ++this.size;
    }

    removeFront() {
        if (this.size === 0) {
            throw "List is empty.";
        }

        let storeFront = this.front;
        if (--this.size > 0) {
            this.front = this.front.next;
            this.front.previous = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeFront.value;
    }

    removeBack() {
        if (this.size === 0) {
            throw "List is empty.";
        }

        let storeBack = this.back;
        if (--this.size > 0) {
            this.back = this.back.previous;
            this.back.next = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeBack.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minimumObstacles = function(matrix) {
    this.moves = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    this.rows = matrix.length;
    this.columns = matrix[0].length;
    return findPathWithMinObstaclesBy01BreadthFirstSearch(matrix);
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
function findPathWithMinObstaclesBy01BreadthFirstSearch(matrix) {
    const queue = new DoubleEndedQueue();
    queue.addFront(new Point(0, 0, matrix[0][0]));

    const minRemovedObstacles = Array.from(new Array(this.rows), () => new Array(this.columns).fill(Number.MAX_SAFE_INTEGER));
    minRemovedObstacles[0][0] = 0;

    while (!queue.isEmpty()) {

        const current = queue.removeFront();
        if (current.row === this.rows - 1 && current.column === this.columns - 1) {
            break;
        }

        for (let move of this.moves) {
            let nextRow = current.row + move[0];
            let nextColumn = current.column + move[1];

            if (isInMatrix(nextRow, nextColumn) && minRemovedObstacles[nextRow][nextColumn] > current.removedObstacles + matrix[nextRow][nextColumn]) {
                const next = new Point(nextRow, nextColumn, current.removedObstacles + matrix[nextRow][nextColumn]);
                minRemovedObstacles[nextRow][nextColumn] = next.removedObstacles;

                if (matrix[nextRow][nextColumn] === 0) {
                    queue.addFront(next);
                } else {
                    queue.addBack(next);
                }
            }
        }
    }
    return minRemovedObstacles[rows - 1][columns - 1];
}

/**
 * @param {number} row
 * @param {number} column 
 * @return {boolean}
 */
function isInMatrix(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}

/**
 * @param {number} row
 * @param {number} column 
 * @param {number} removedObstacles
 */
function Point(row, column, removedObstacles) {
    this.row = row;
    this.column = column;
    this.removedObstacles = removedObstacles;
}

function QueueNode(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}