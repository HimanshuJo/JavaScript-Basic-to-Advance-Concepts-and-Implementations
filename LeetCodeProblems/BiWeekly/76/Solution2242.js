// 2242. Maximum Score of a Node Sequence
/*
There is an undirected graph with n nodes, numbered from 0 to n - 1.

You are given a 0-indexed integer array scores of length n where scores[i] 
denotes the score of node i. 

You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes 
that there exists an undirected edge connecting nodes ai and bi.

A node sequence is valid if it meets the following conditions:

There is an edge connecting every pair of adjacent nodes in the sequence.
No node appears more than once in the sequence.
The score of a node sequence is defined as the sum of the scores of the nodes in the sequence.

Return the maximum score of a valid node sequence with a length of 4. If no such sequence exists, return -1.

Input: scores = [5,2,9,8,4], edges = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 24
Explanation: The figure above shows the graph and the chosen node sequence [0,1,2,3].
The score of the node sequence is 5 + 2 + 9 + 8 = 24.
It can be shown that no other node sequence has a score of more than 24.
Note that the sequences [3,1,2,0] and [1,0,2,3] are also valid and have a score of 24.
The sequence [0,3,2,4] is not valid since no edge connects nodes 0 and 3.

Input: scores = [9,20,6,4,11,12], edges = [[0,3],[5,3],[2,4],[1,3]]
Output: -1
Explanation: The figure above shows the graph.
There are no valid node sequences of length 4, so we return -1.

Constraints:

n == scores.length
4 <= n <= 5 * 10^4
1 <= scores[i] <= 10^8
0 <= edges.length <= 5 * 10^4
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no duplicate edges.
*/

/*
The idea: 

    Try every edge, and select one more adjacent node per each of the edge ends.
    
    The selected additional nodes must not be intersected with each other and with the other edge nodes.
    
    Also there must be effective way to select additional nodes, so they provide max result. 

    To achieve this - we can sort the adjacency list for each vertice (according to scores).

        We must try 3 best nodes for each of the edge side (because they are optimal, 
        and if we try just 1 or 2 best nodes - there could be intersections - which is not allowed) - 
        so try at most 9 combinations per each edge.

Optimization: 

    as we need just 3 top scored neighbours per each edge side - 
    instead of full adjacency list sorting we can utilize a PriorityQueue to find top 3 nodes - 
    this will decrease our time complexity from O(E log(E)) to O(E)

-------

Create adjacency list
Sort adjacency list, so best adjacent nodes are in the beginning

2.1 Optimized: no need to sort the full list - we need just 3 top scored adjacent nodes - 
so use PriorityQueue, find top 3 adjacent nodes

Try each edge:

try <= 3 best adjacent nodes for each edge side. If no intersections - we have a sequence of 4 nodes (the current edge is in the middle), update result.
Time complexity:

O(E log(E)) for adjacency list sorting

O(E*9) = O(E) for iterating over edges

Total: O(E log(E))

E is edges count
*/

/**
 * @param {number[]} scores
 * @param {number[][]} edges
 * @return {number}
 */

class Heap{
    constructor(data=[]){
        this.data=data;
        this.comparator=(a, b)=>a[1]-b[1];
        this.heapify();
    }
    
    // O(n log n)
    heapify(){
        if(this.size()<2) return;
        for(let i=1; i<this.size(); ++i){
            this.bubbleUp(i);
        }
    }
    
    // O(1)
    peek(){
        if(this.size()===0) return null;
        return this.data[0];
    }
    
    // O(log n)
    offer(value){
        this.data.push(value);
        this.bubbleUp(this.size()-1);
    }
    
    // O(log n)
    poll(){
        if(this.size()===0) return null;
        const result=this.data[0];
        const last=this.data.pop();
        if(this.size!==0){
            this.data[0]=last;
            this.bubbleDown(0);
        }
        return result;
    }
    
    // O(log(n))
    bubbleUp(index){
        while(index>0){
            const parentIndex=(index-1)>>1;
            if(this.comparator(this.data[index], this.data[parentIndex])<0){
                this.swap(index, parentIndex);
                index=parentIndex;
            } else break;
        }
    }
    
    // O(long n)
    bubbleDown(index){
        const lastIndex=this.size()-1;
        while(true){
            const leftIndex=index*2+1;
            const rightIndex=index*2+2;
            let findIndex=index;
            if(leftIndex<=lastIndex&&this.comparator(this.data[leftIndex], this.data[findIndex])<0){
                findIndex=leftIndex;
            }
            if(rightIndex<=lastIndex&&this.comparator(this.data[rightIndex], this.data[findIndex])<0){
                findIndex=rightIndex;
            }
            if(index!==findIndex){
                this.swap(index, findIndex);
                index=findIndex;
            } else break;
        }
    }
    
    //O(1)
    swap(index1, index2){
        [this.data[index1], this.data[index2]]=[this.data[index2], this.data[index1]];
    }
    
    // O(1)
    size(){
        return this.data.length;
    }
    
    toArray(){
        return this.data.reverse().map(dt=>dt.index);
    }
}

var maximumScore = function(scores, edges) {
    const n=scores.length
    let top3=new Array(n).fill().map(()=>new Heap())
    for(let [u, v] of edges){
        top3[u].offer(([v, scores[v]]))
        if(top3[u].size()>3) top3[u].poll()
        top3[v].offer(([u, scores[u]]))
        if(top3[v].size()>3) top3[v].poll()
    }
    let top3Array=new Array(n)
    for(let i=0; i<n; ++i){
        top3Array[i]=[...top3[i].data]
    }
    let ans=-1;
    for(let [b, c] of edges){
        if(top3[b].size()<2||top3[c].size()<2) continue;
        let score=scores[b]+scores[c]
        for(let [a, scoreA] of top3Array[b]){
            for(let [d, scoreD] of top3Array[c]){
                if(a!==b&&a!==c&&d!==b&&d!==c&&d!==c&&a!==d){
                    ans=Math.max(ans, scoreA+score+scoreD)
                }
            }
        }
    }
    return ans;
};