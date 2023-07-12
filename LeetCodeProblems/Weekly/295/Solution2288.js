// 2288. Apply Discount to Prices
/*
A sentence is a string of single-space separated words where each word can contain digits, 
lowercase letters, and the dollar sign '$'. 

A word represents a price if it is a sequence of digits preceded by a dollar sign.

For example, "$100", "$23", and "$6" represent prices while "100", "$", and "$1e5" do not.
You are given a string sentence representing a sentence and an integer discount. 

For each word representing a price, apply a discount of discount% on the price and update 
the word in the sentence. All updated prices should be represented with exactly two decimal places.

Return a string representing the modified sentence.

Note that all prices will contain at most 10 digits.


Example 1:

Input: sentence = "there are $1 $2 and 5$ candies in the shop", discount = 50
Output: "there are $0.50 $1.00 and 5$ candies in the shop"
Explanation: 
The words which represent prices are "$1" and "$2". 
- A 50% discount on "$1" yields "$0.50", so "$1" is replaced by "$0.50".
- A 50% discount on "$2" yields "$1". Since we need to have exactly 2 decimal places after a price, 
we replace "$2" with "$1.00".
Example 2:

Input: sentence = "1 2 $3 4 $5 $6 7 8$ $9 $10$", discount = 100
Output: "1 2 $0.00 4 $0.00 $0.00 7 8$ $0.00 $10$"
Explanation: 
Applying a 100% discount on any price will result in 0.
The words representing prices are "$3", "$5", "$6", and "$9".
Each of them is replaced by "$0.00".
 

Constraints:

1 <= sentence.length <= 10^5
sentence consists of lowercase English letters, digits, ' ', and '$'.
sentence does not have leading or trailing spaces.
All words in sentence are separated by a single space.
All prices will be positive numbers without leading zeros.
All prices will have at most 10 digits.
0 <= discount <= 100

*/

// TC: O(n+n*10)  n: sentence length
// SC: O(2n)

/**
 * @param {string} sentence
 * @param {number} discount
 * @return {string}
 */

const DIGIT_EXPRESSION = /^\d$/;

const isDigit = (character) => {
    return character && DIGIT_EXPRESSION.test(character);
};

var discountPrices = function(sentence, discount) {
    var len=sentence.length;
    var splitted=sentence.split(" ");
    var sz_=splitted.length;
    for(let x=0; x<sz_; ++x){
        var vals=splitted[x];
        if(vals[0]==='$'){
            var temp="";
            var sz=vals.length;
            var flag=false;
            for(let i=1; i<sz; ++i){
                if(!isDigit(vals[i])){
                    flag=true;
                    break;
                }
                temp+=vals[i];
            }
            if(!flag){
                if(temp!=""){
                    var tochk=parseFloat(temp);
                    var temp_=(discount*tochk)/100;
                    var temp__=tochk-temp_;
                    var nw="";
                    nw+="$";
                    nw+=temp__.toString(10);
                    var idx=nw.indexOf(".");
                    if(idx===-1){
                        nw+=".";
                        nw+="00";
                    } else{
                        idx+=2;
                        if(idx>=nw.length){
                            var diff=(nw.length+1)-idx;
                            while(diff!=0){
                                nw+="0";
                                diff--;
                            }
                        }
                        if(idx<nw.length&&idx!=nw.length-1){
                            if(parseInt(nw[idx+1])>=5){
                                var temp__=parseInt(nw[idx-1]+nw[idx]);
                                temp__++;
                                if(temp__.toString(10).length>=2){
                                    var idx=nw.indexOf(".");
                                    nw=nw.substr(0, idx+1);
                                    nw+=temp__.toString(10);
                                } else{
                                    nw=nw.substr(0, idx);
                                    nw+=temp__.toString(10);
                                }
                            } else{
                                nw=nw.substr(0, idx+1);
                            }
                        }
                    }
                    splitted[x]=nw;
                }
            }
        }
    }
    var res="";
    for(let i=0; i<sz_; ++i){
        res+=splitted[i];
        if(i!=sz_-1) res+=" ";
    }
    return res;
};