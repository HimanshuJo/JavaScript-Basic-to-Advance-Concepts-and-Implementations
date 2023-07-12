// 2049. Count Nodes With the Highest Score
/*
There is a binary tree rooted at 0 consisting of n nodes. 
The nodes are labeled from 0 to n - 1. You are given a 0-indexed integer array parents representing the tree, 
where parents[i] is the parent of node i. Since node 0 is the root, parents[0] == -1.

Each node has a score. To find the score of a node, consider if the node and the edges connected to it 
were removed. 
The tree would become one or more non-empty subtrees. The size of a subtree is the number of the nodes in it. 
The score of the node is the product of the sizes of all those subtrees.

Return the number of nodes that have the highest score.

Input: parents = [-1,2,0,2,0]
Output: 3 
Explanation:
- The score of node 0 is: 3 * 1 = 3
- The score of node 1 is: 4 = 4
- The score of node 2 is: 1 * 1 * 2 = 2
- The score of node 3 is: 4 = 4
- The score of node 4 is: 4 = 4
The highest score is 4, and three nodes (node 1, node 3, and node 4) have the highest score.
*/

/**
 * @param {number[]} parents
 * @return {number}
 */

const initializeGraph=(n)=>{ // const initializeGraph=function(n){};
    let G=[];
    for(let i=0; i<n; ++i){
        G.push([]);
    }
    return G;
};

let g, n, res, count;

const dfs=(x)=>{ // const dfs=function(x){};
    let subtree=0, p=1;
    for(const child of g[x]){
        let tmp=dfs(child);
        subtree+=tmp;
        p*=tmp;
    }
    if(subtree<n-1){
        p*=n-1-subtree;
    }
    if(p>res){
        res=p;
        count=1;
    } else if(p==res){
        count++;
    }
    return subtree+1;
};

var countHighestScoreNodes = function(parents) {
    res=-1, count=0, n=parents.length;
    g=initializeGraph(n);
    for(let i=0; i<n; ++i){
        if(parents[i]==-1) continue;
        g[parents[i]].push(i);
    }
    dfs(0);
    return count;
};