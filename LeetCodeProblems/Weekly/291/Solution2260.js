// 2260. Minimum Consecutive Cards to Pick Up
/*
You are given an integer array cards where cards[i] represents the value of the ith card. 
A pair of cards are matching if the cards have the same value.

Return the minimum number of consecutive cards you have to pick up to have a pair of 
matching cards among the picked cards. If it is impossible to have matching cards, return -1.

 

Example 1:

Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of 
cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.
Example 2:

Input: cards = [1,0,5,3]
Output: -1
Explanation: There is no way to pick up a set of consecutive cards that contain a pair of matching cards.
 

Constraints:

1 <= cards.length <= 10^5
0 <= cards[i] <= 10^6
*/

/**
 * @param {number[]} cards
 * @return {number}
 */
var minimumCardPickup = function(cards) {
    var res=Number.MAX_SAFE_INTEGER;
    var sz=cards.length;
    var flag=false;
    const mp=new Map();
    const indexes=[];
    for(let i=0; i<sz; ++i){
        if(mp.has(cards[i])){
            var tmpval=mp.get(cards[i]);
            tmpval.push(i);
            mp.set(cards[i], tmpval);
        } else{
            var tmparr=[];
            tmparr.push(i);
            mp.set(cards[i], tmparr);
        }
    }
    mp.forEach((value, key, mp)=>{
        if(mp.get(key).length>=2){
            flag=true;
            mp.get(key).sort();
            var curmin=Number.MAX_SAFE_INTEGER
            let sz=mp.get(key).length;
            const arr=mp.get(key);
            for(let i=0; i<sz-1; ++i){
                curmin=Math.min(curmin, Math.abs(arr[i]-arr[i+1]));
                res=Math.min(res, curmin);
            }
        }
    });
    return flag?res+1:-1;
};