// T: O((len(wordbank)^target)*target), S: O(target^2)
const canConstruct=(target, wordBank)=>{
	if(target==='') return true;
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const suffix=target.slice(word.length);
			if(canConstruct(suffix, wordBank)){
				return true;
			}
		}
	}
	return false;
};

// T: O(len(wordBank)*target^2), S: O(target^2)
const canConstructDp=(target, wordBank, memo={})=>{
	if(target==='') return true;
	if(target in memo) return memo[target];
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const suffix=target.slice(word.length);
			if(canConstructDp(suffix, wordBank)){
				return memo[target]=true;
			}
		}
	}
	return memo[target]=false;
};

// T: O(len(wordBank)*target^2), S: O(target^2)
const canConstructTab=(target, wordBank)=>{
	const dp=Array(target.length+1).fill(false);
	dp[0]=true;
	for(let i=0; i<=target.length; ++i){
		if(dp[i]===true){
			for(let word of wordBank){
				if(target.slice(i, i+word.length)===word){
					dp[i+word.length]=true;
				}
			}
		}
	}
	return dp[target.length];
};

const wordBank=["ab", "abc", "cd", "abcd", "def"];
let target="abc";
console.log(canConstruct(target, wordBank));
console.log('-------');
const wordBank2=["e", "ee", "eee", "eeee", "eeeee", "eeeeee"];
let target2="eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
console.log(canConstructDp(target2, wordBank2));
console.log('-------');
console.log(canConstructTab(target2, wordBank2));
