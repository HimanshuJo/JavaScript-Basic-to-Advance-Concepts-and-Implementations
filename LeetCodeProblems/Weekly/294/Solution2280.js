// 2280. Minimum Lines to Represent a Line Chart
/*
You are given a 2D integer array stockPrices where stockPrices[i] = [dayi, pricei] 
indicates the price of the stock on day dayi is pricei. 

A line chart is created from the array by plotting the points on an XY plane 
with the X-axis representing the day and the Y-axis representing the price and connecting adjacent points.

Input: stockPrices = [[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]
Output: 3
Explanation:
The diagram above represents the input, with the X-axis representing the day and Y-axis representing the price.
The following 3 lines can be drawn to represent the line chart:
- Line 1 (in red) from (1,7) to (4,4) passing through (1,7), (2,6), (3,5), and (4,4).
- Line 2 (in blue) from (4,4) to (5,4).
- Line 3 (in green) from (5,4) to (8,1) passing through (5,4), (6,3), (7,2), and (8,1).
It can be shown that it is not possible to represent the line chart using less than 3 lines.

Input: stockPrices = [[3,4],[1,2],[7,8],[2,3]]
Output: 1
Explanation:
As shown in the diagram above, the line chart can be represented with a single line.

Constraints:

1 <= stockPrices.length <= 10^5
stockPrices[i].length == 2
1 <= dayi, pricei <= 10^9
All dayi are distinct.
*/

/**
 * @param {number[][]} stockPrices
 * @return {number}
 */
var minimumLines = function(stockPrices) {
    var mod=1e9;
    stockPrices.sort((A, B)=>(A[0]===B[0]?A[1]-B[1]:A[0]-B[0]));
    var sz=stockPrices.length;
    if(sz==1) return 0;
    var ans=1;
    for(let i=2; i<sz; ++i){
        let x3=stockPrices[i][0]%=mod, y3=stockPrices[i][1]%=mod;
        let x2=stockPrices[i-1][0]%=mod, y2=stockPrices[i-1][1]%=mod;
        let x1=stockPrices[i-2][0]%=mod, y1=stockPrices[i-2][1]%=mod;
        let diff1=(y3-y2)*(x2-x1), diff2=(y2-y1)*(x3-x2); // let diff1=(y3-y2)/(x3-x2), diff2=(y2-y1)/(x2-x1);
        if(diff1!==diff2){
            ans++;
        }
    }
    return ans;
};