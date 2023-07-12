// T: O((n^m)*m), S: O(m*m)
const bestSum=(targetSum, numbers)=>{
	if(targetSum===0) return [];
	if(targetSum<0) return null;
	let shortestCombo=null;
	for(let num of numbers){
		const remain=targetSum-num;
		const remainCombo=bestSum(remain, numbers);
		if(remainCombo!==null){
			const fnCombo=[...remainCombo, num];
			if(shortestCombo===null||fnCombo.length<shortestCombo.length){
				shortestCombo=fnCombo;
			}
		}
	}
	return shortestCombo;
};

// T: O((m*n)*m), S: O(m*m)
const bestSumDp=(targetSum, numbers, memo={})=>{
	if(targetSum in memo) return memo[targetSum];
	if(targetSum===0) return [];
	if(targetSum<0) return null;
	let shortestCombo=null;
	for(let num of numbers){
		const remain=targetSum-num;
		const remainCombo=bestSumDp(remain, numbers, memo);
		if(remainCombo!==null){
			const fnCombo=[...remainCombo, num];
			if(shortestCombo===null||fnCombo.length<shortestCombo.length){
				shortestCombo=fnCombo;
			}
		}
	}
	return memo[targetSum]=shortestCombo;
};

// T: O((m*n)*m), S: O(m*m)
const bestSumTab=(targetSum, numbers)=>{
	const dp=Array(targetSum+targetSum).fill(null);
	dp[0]=[];
	for(let i=0; i<=targetSum; ++i){
		if(dp[i]!=null){
			for(let num of numbers){
				const combo=[...dp[i], num];
				console.log(combo);
				if(!dp[i+num]||dp[i+num].length>combo.length){
					dp[i+num]=combo;
				}
			}
		}
	}
	return dp[targetSum];
};

const numbers=[1, 3, 4, 5];
let targetSum=7;
//console.log(bestSum(targetSum, numbers));
console.log('-------')
console.log(bestSumDp(targetSum, numbers));
console.log('-------')
console.log(bestSumTab(targetSum, numbers));
