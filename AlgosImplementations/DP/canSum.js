// O(len(Numbers)^targetSum)
const canSumSp=(targetSum, numbers)=>{
	if(targetSum===0) return true;
	if(targetSum<0) return false;
	for(var num of numbers){
		const remain=targetSum-num;
		if(canSumSp(remain, numbers)){
			return true;
		}
	}
	return false;
};

// O(targetSum*len(Numbers))
const canSumDp=(targetSum, numbers, memo={})=>{
	if(targetSum===0) return true;
	if(targetSum<0) return false;
	if(targetSum in memo) return memo[targetSum];
	for(var num of numbers){
		const remain=targetSum-num;
		if(canSumDp(remain, numbers, memo)){
			return memo[targetSum]=true;
		}
	}
	return memo[targetSum]=false;
};


// O(targetSum*len(Numbers))
const canSumTab=(targetSum, numbers)=>{
	const dp=Array(targetSum+1).fill(false);
	dp[0]=true;
	for(let i=0; i<=targetSum; ++i){
		if(dp[i]===true){
			for(let num of numbers){
				dp[i+num]=true;
			}
		}
	}
	return dp[targetSum];
}

const targetSum=777;
const numbers=[5, 3, 9, 17];
//console.log(canSumSp(targetSum, numbers));
console.log('-------');
console.log(canSumDp(targetSum, numbers));
console.log('-------');
console.log(canSumTab(targetSum, numbers));
