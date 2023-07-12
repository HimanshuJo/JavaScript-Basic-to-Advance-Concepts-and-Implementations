// 2304. Minimum Path Cost in a Grid
/*
You are given a 0-indexed m x n integer matrix grid consisting of distinct integers from 0 to m * n - 1. 
You can move in this matrix from a cell to any other cell in the next row. 

That is, if you are in cell (x, y) such that x < m - 1, 
you can move to any of the cells (x + 1, 0), (x + 1, 1), ..., (x + 1, n - 1). 

Note that it is not possible to move from cells in the last row.

Each possible move has a cost given by a 0-indexed 2D array moveCost of size (m * n) x n, 
where moveCost[i][j] is the cost of moving from a cell with value i to a cell in column j of the next row. 

The cost of moving from cells in the last row of grid can be ignored.

The cost of a path in grid is the sum of all values of cells visited plus the sum of costs 
of all the moves made. Return the minimum cost of a path that starts from any cell in the first 
row and ends at any cell in the last row.

Input: grid = [[5,3],[4,0],[2,1]], moveCost = [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]
Output: 17
Explanation: The path with the minimum possible cost is the path 5 -> 0 -> 1.
- The sum of the values of cells visited is 5 + 0 + 1 = 6.
- The cost of moving from 5 to 0 is 3.
- The cost of moving from 0 to 1 is 8.
So the total cost of the path is 6 + 3 + 8 = 17.
Example 2:

Input: grid = [[5,1,2],[4,0,3]], moveCost = [[12,10,15],[20,23,8],[21,7,1],[8,1,13],[9,10,25],[5,3,2]]
Output: 6
Explanation: The path with the minimum possible cost is the path 2 -> 3.
- The sum of the values of cells visited is 2 + 3 = 5.
- The cost of moving from 2 to 3 is 1.
So the total cost of this path is 5 + 1 = 6.
 

Constraints:

m == grid.length
n == grid[i].length
2 <= m, n <= 50
grid consists of distinct integers from 0 to m * n - 1.
moveCost.length == m * n
moveCost[i].length == n
1 <= moveCost[i][j] <= 100
*/

// TC: O(log(m*n)*m*n^2)  n: number of cols, m: number of rows
// SC: O(n*m)
class Heap {
	constructor(list, compare=(a, b)=>a-b){
		this.left=index=>2*index+1;
		this.right=index=>2*index+2;
		this.parent=index=>Math.floor((index-1)/2);
		this.heapify=(index=0)=>{
			const{
				list
			} = this;
			const leftIndex=this.left(index);
			const rightIndex=this.right(index);
			let maxIndex=index;
			if(list[leftIndex]!==undefined&&this.compare(list[maxIndex], list[leftIndex])>0){
				maxIndex=leftIndex;
			}
			if(list[rightIndex]!==undefined&&this.compare(list[maxIndex], list[rightIndex])>0){
				maxIndex=rightIndex;
			}
			if(index!==maxIndex){
				const temp=list[index];
				list[index]=list[maxIndex];
				list[maxIndex]=temp;
				this.heapify(maxIndex);
			}
		}
        this.buildHeap=()=>{
            for(let i=Math.floor(this.list.length/2); i>=0; --i){
                this.heapify(i);
            }
            return this.list;
        }
        this.extract=()=>{
            const temp=this.list[0];
            this.list[0]=this.list[this.list.length-1];
            this.list[this.list.length-1]=temp;
            const res=this.list.pop();
            this.heapify(0);
            return res;
        }
        this.insert=(item)=>{
            const {list}=this;
            list.push(item);
            let index=list.length-1;
            let parentIndex=this.parent(index);
            while(list[parentIndex]!==undefined&&this.compare(list[parentIndex], list[index])>0){
                const temp=list[index];
                list[index]=list[parentIndex];
                list[parentIndex]=temp;
                index=parentIndex;
                parentIndex=this.parent(index);
            }
        }
        this.list=list;
        this.compare=compare;
        this.buildHeap();
	}
}

/**
 * @param {number[][]} grid
 * @param {number[][]} moveCost
 * @return {number}
 */
var minPathCost = function(grid, moveCost) {
    const distance=[];
    grid.forEach((list, row)=>{
        distance[row]=[];
        list.forEach((value, column)=>{
            if(row===0){
                distance[row][column]=value;
            } else{
                distance[row][column]=Infinity;
            }
        });
    });
    const heap=new Heap(grid[0].map((value, index)=>({
        node: [0, index], value,
    })), (a, b)=>a.value-b.value);
    while(heap.list.length){
        const {node, value}=heap.extract();
        const [row, column]=node;
        if(row<grid.length-1){
            for(let j=0; j<grid[0].length; ++j){
                const currentVal=value+grid[row+1][j]+moveCost[grid[row][column]][j];
                if(distance[row+1][j]>currentVal){
                    distance[row+1][j]=currentVal;
                    heap.insert({
                        node: [row+1, j], value: currentVal,
                    })
                }
            }
        } else{
            return value;
        }
    }
};