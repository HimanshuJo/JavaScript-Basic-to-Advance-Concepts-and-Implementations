// 2034. Stock Price Fluctuation
/*
You are given a stream of records about a particular stock. 
Each record contains a timestamp and the corresponding price of the stock at that timestamp.

Unfortunately due to the volatile nature of the stock market, the records do not come in order. 
Even worse, some records may be incorrect.

Another record with the same timestamp may appear later in the stream correcting 
the price of the previous wrong record.

Design an algorithm that:

    Updates the price of the stock at a particular timestamp, correcting the price 
    from any previous records at the timestamp.

    Finds the latest price of the stock based on the current records. 
    The latest price is the price at the latest timestamp recorded.

    Finds the maximum price the stock has been based on the current records.

    Finds the minimum price the stock has been based on the current records.

Implement the StockPrice class:

    StockPrice() Initializes the object with no price records.

    void update(int timestamp, int price) Updates the price of the stock at the given timestamp.

    int current() Returns the latest price of the stock.

    int maximum() Returns the maximum price of the stock.

    int minimum() Returns the minimum price of the stock.

-------

Example 1:

Input
["StockPrice", "update", "update", "current", "maximum", "update", "maximum", "update", "minimum"]
[[], [1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
Output
[null, null, null, 5, 10, null, 5, null, 2]

Explanation
StockPrice stockPrice = new StockPrice();
stockPrice.update(1, 10); // Timestamps are [1] with corresponding prices [10].
stockPrice.update(2, 5);  // Timestamps are [1,2] with corresponding prices [10,5].
stockPrice.current();     // return 5, the latest timestamp is 2 with the price being 5.
stockPrice.maximum();     // return 10, the maximum price is 10 at timestamp 1.
stockPrice.update(1, 3);  // The previous timestamp 1 had the wrong price, so it is updated to 3.
                          // Timestamps are [1,2] with corresponding prices [3,5].
stockPrice.maximum();     // return 5, the maximum price is 5 after the correction.
stockPrice.update(4, 2);  // Timestamps are [1,2,4] with corresponding prices [3,5,2].
stockPrice.minimum();     // return 2, the minimum price is 2 at timestamp 4.

-------

Constraints:

1 <= timestamp, price <= 10^9

At most 10^5 calls will be made in total to update, current, maximum, and minimum.
current, maximum, and minimum will be called only after update has been called at least once.
*/

/*
TLE: 9/18

var mp;
var custComp;
var custComp2;
var getLastValueInMap;
var getLastValueInMap;

var StockPrice = function() {
    mp=new Map();
    custComp = (a, b) => a[0]-b[0];
    custComp2 = (a, b) => a[1]-b[1];
    getLastValueInMap = (map) => Array.from(map)[map.size - 1][1];
    getFirstValueInMap = (map) => Array.from(map)[0][1];    
};

StockPrice.prototype.update = function(timestamp, price) {
    if(mp.has(timestamp)){
        mp.delete(timestamp);
        mp.set(timestamp, price);
    } else{
        mp.set(timestamp, price);
    }
};

StockPrice.prototype.current = function() {
    var temp=new Map([...mp].sort(custComp))
    mp=temp;
    return getLastValueInMap(mp);
};

StockPrice.prototype.maximum = function() {
    var temp=new Map([...mp].sort(custComp2))
    mp=temp;
    return getLastValueInMap(mp);
};

StockPrice.prototype.minimum = function() {
    var temp=new Map([...mp].sort(custComp2))
    mp=temp;
    return getFirstValueInMap(mp);
};
*/


var StockPrice = function() {
    this.minHeap=new MinPriorityQueue({
        compare:(a, b)=>a.price>b.price
    });
    this.maxHeap=new MaxPriorityQueue({
        compare:(a, b)=>a.price<b.price
    });
    this.prices=new Map();
    this.currentPrice={};
};

/** 
 * @param {number} timestamp 
 * @param {number} price
 * @return {void}
 */
StockPrice.prototype.update = function(timestamp, price) {
    this.prices.set(timestamp, price);
    this.minHeap.enqueue({timestamp, price});
    this.maxHeap.enqueue({timestamp, price});
    if(!this.currentPrice.timestamp||this.currentPrice.timestamp<=timestamp){
        this.currentPrice={timestamp, price};
    }
};

/**
 * @return {number}
 */
StockPrice.prototype.current = function() {
    return this.currentPrice.price;
};

/**
 * @return {number}
 */
StockPrice.prototype.maximum = function() {
    let front=this.maxHeap.front();
    while(this.prices.get(front.timestamp)!=front.price){
        this.maxHeap.dequeue();
        front=this.maxHeap.front();
    }
    return front.price;
};

/**
 * @return {number}
 */
StockPrice.prototype.minimum = function() {
    let front=this.minHeap.front();
    while(this.prices.get(front.timestamp)!=front.price){
        this.minHeap.dequeue();
        front=this.minHeap.front();
    }
    return front.price;
};

/** 
 * Your StockPrice object will be instantiated and called as such:
 * var obj = new StockPrice()
 * obj.update(timestamp,price)
 * var param_2 = obj.current()
 * var param_3 = obj.maximum()
 * var param_4 = obj.minimum()
 */