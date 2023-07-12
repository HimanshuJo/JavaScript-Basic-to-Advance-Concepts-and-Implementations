// 2265. Count Nodes Equal to Average of Subtree
/*
Given the root of a binary tree, return the number of nodes 
where the value of the node is equal to the average of the values in its subtree.

Note:

The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
A subtree of root is a tree consisting of root and all of its descendants.

Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation: 
For the node with value 4: The average of its subtree is (4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4.
For the node with value 5: The average of its subtree is (5 + 6) / 2 = 11 / 2 = 5.
For the node with value 0: The average of its subtree is 0 / 1 = 0.
For the node with value 1: The average of its subtree is 1 / 1 = 1.
For the node with value 6: The average of its subtree is 6 / 1 = 6.

Input: root = [1]
Output: 1
Explanation: For the node with value 1: The average of its subtree is 1 / 1 = 1.

Constraints:

The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 1000
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
 * @param {TreeNode} root
 * @return {number}
 */

var bfs=function(curroot){
    q=[]
    let sm=curroot.val
    let count=1
    q.push(curroot)
    while(q.length){
        let curnode=q.shift()
        if(curnode.left!=null){
            count++
            sm+=curnode.left.val
            q.push(curnode.left)
        }
        if(curnode.right!=null){
            count++
            sm+=curnode.right.val
            q.push(curnode.right)
        }
    }
    const col=1
    var arr=[]
    for(let i=0; i<col; ++i){
        arr[i]=[]
    }
    arr[0]=sm, arr[1]=count
    return arr
}

var averageOfSubtree = function(root) {
    var ans=0
    var q=[]
    q.push(root)
    while(q.length){
        let curnode=q.shift()
        let val=curnode.val
        let temp_=bfs(curnode)
        let tochk=Math.floor(temp_[0]/temp_[1])
        if(tochk===val) ans++;
        if(curnode.left!==null) q.push(curnode.left)
        if(curnode.right!==null) q.push(curnode.right)
    }
    return ans
};