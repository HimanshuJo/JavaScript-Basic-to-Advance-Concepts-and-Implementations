// 2196. Create Binary Tree From Descriptions
/*
You are given a 2D integer array descriptions where 
descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi 
in a binary tree of unique values. Furthermore,

If isLefti == 1, then childi is the left child of parenti.
If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root.

The test cases will be generated such that the binary tree is valid

Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
The resulting binary tree is shown in the diagram.

Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
The resulting binary tree is shown in the diagram.

Constraints:

1 <= descriptions.length <= 10^4
descriptions[i].length == 3
1 <= parenti, childi <= 10^5
0 <= isLefti <= 1
The binary tree described by descriptions is valid.
*/

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

 /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    const map={};
    const childrenSet=new Set();
    for(let desc of descriptions){
        const [parent, child, side]=desc;
        childrenSet.add(Number(child));
        if(!(parent in map)){
            map[parent]=[null, null];
        }
        if(side===1){
            map[parent][0]=child;
        } else{
            map[parent][1]=child;
        }
    }
    let root;
    for(let parent in map){
        if(!(childrenSet.has(Number(parent)))){
            root=new TreeNode(parent);
        }
    }
    const queue=[root];
    while(queue.length){
        const curr=queue.shift();
        if(map[curr.val]!==undefined){
            const[left, right]=map[curr.val];
            curr.left=left===null?null:new TreeNode(left);
            curr.right=right===null?null:new TreeNode(right);
        }
        if(curr.left!==null) queue.push(curr.left);
        if(curr.right!==null) queue.push(curr.right);
    }
    return root;
};