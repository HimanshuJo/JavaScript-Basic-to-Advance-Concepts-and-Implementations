// 2074. Reverse Nodes in Even Length Groups
/*
You are given the head of a linked list.

The nodes in the linked list are sequentially assigned to non-empty groups whose 
lengths form the sequence of the natural numbers (1, 2, 3, 4, ...). 

The length of a group is the number of nodes assigned to it. In other words,

The 1st node is assigned to the first group.
The 2nd and the 3rd nodes are assigned to the second group.
The 4th, 5th, and 6th nodes are assigned to the third group, and so on.
Note that the length of the last group may be less than or equal to 1 + the length of the second to last group.

Reverse the nodes in each group with an even length, and return the head of the modified linked list.

Input: head = [5,2,6,3,9,1,7,3,8,4]
Output: [5,6,2,3,9,1,4,8,3,7]
Explanation:
- The length of the first group is 1, which is odd, hence no reversal occurs.
- The length of the second group is 2, which is even, hence the nodes are reversed.
- The length of the third group is 3, which is odd, hence no reversal occurs.
- The length of the last group is 4, which is even, hence the nodes are reversed.

Input: head = [1,1,0,6]
Output: [1,0,1,6]
Explanation:
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 1. No reversal occurs.

Input: head = [1,1,0,6,5]
Output: [1,0,1,5,6]
Explanation:
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 2. The nodes are reversed.

Constraints:

The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 10^5
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*
Solution2:

var reverseEvenLengthGroups = function(head) {
    let values=[], temp;
    temp=head;
    while(temp){
        values.push(temp.val);
        temp=temp.next;
    }
    var n=values.length;
    for(let k=0, count=1; k<n; k+=count, ++count){
        let size=Math.min(k+count, n)-k;
        if(size%2===0){
            for(let i=k, j=k+size-1; i<j; ++i, --j){
                [values[i], values[j]]=[values[j], values[i]];
            }
        }
    }
    temp=head;
    for(let v of values){
        temp.val=v;
        temp=temp.next;
    }
    return head;
};
*/

var reverseEvenLengthGroups = function(head) {
    var values=[], temp;
    temp=head;
    while(temp){
        values.push(temp.val);
        temp=temp.next;
    }
    var n=values.length;
    for(let k=0, count=1; k<n; k+=count, ++count){
        let reversePart=values.slice(k, k+count).reverse();
        if(reversePart.length%2==0){
            for(let i=0; i<reversePart.length; ++i){
                values[k+i]=reversePart[i];
            }
        }
    }
    temp=head;
    for(let v of values){
        temp.val=v;
        temp=temp.next;
    }
    return head;
};