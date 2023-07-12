// T: O((n^m)*m), S: O(m^2)
const countConstruct=(target, wordBank)=>{
	if(target==='') return 1;
	let totalCnt=0;
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const numWaysForRest=countConstruct(target.slice(word.length), wordBank);
			totalCnt+=numWaysForRest;
		}
	}
	return totalCnt;
};

// T: O(n*m^2), S: O(m^2)
const countConstructDp=(target, wordBank, memo={})=>{
	if(target==='') return 1;
	if(target in memo) return memo[target];
	let totalCnt=0;
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const numWaysForRest=countConstructDp(target.slice(word.length), wordBank, memo);
			totalCnt+=numWaysForRest;
		}
	}
	return memo[target]=totalCnt;
};

// T: O(n*m^2). S: O(m^2)
const countConstructTab=(target, wordBank)=>{
	const dp=Array(target.length+1).fill(0);
	dp[0]=1;
	for(let i=0; i<=target.length; ++i){
		for(let word of wordBank){
			if(target.slice(i, i+word.length)===word){
				dp[i+word.length]+=dp[i];
			}
		}
	}
	return dp[target.length];
};

const wordBank=["abc", "abc", "abcd", "def"];
let target="abcdef";
console.log(countConstruct(target, wordBank));
console.log('-------');
const wordBank2=["ee", "eee", "eeee", "eeeee", "eeeeeee", "eeeeeeee"];
let target2="eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
console.log(countConstructDp(target2, wordBank2));
console.log('-------');
console.log(countConstructTab(target2, wordBank2));
