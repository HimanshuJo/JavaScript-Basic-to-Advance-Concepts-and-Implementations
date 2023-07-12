const howSumSp=(targetSum, numbers)=>{
	if(targetSum===0) return [];
	if(targetSum<0) return null;
	for(let num of numbers){
		const remain=targetSum-num;
		const remainRes=howSumSp(remain, numbers);
		if(remainRes!==null){
			return [... remainRes, num];
		}
	}
	return null;
};

const howSumDp=(targetSum, numbers, memo={})=>{
	if(targetSum===0) return [];
	if(targetSum<0) return null;
	if(targetSum in memo) return memo[targetSum];
	for(let num of numbers){
		const remain=targetSum-num;
		const remainRes=howSumDp(remain, numbers, memo);
		if(remainRes!==null){
			return memo[targetSum]=[... remainRes, num];
		}
	}
	return memo[targetSum]=null;
};

var targetSum=1500;
const numbers=[100, 15];
//console.log(howSumSp(targetSum, numbers));
console.log('-------');
console.log(howSumDp(targetSum, numbers));
