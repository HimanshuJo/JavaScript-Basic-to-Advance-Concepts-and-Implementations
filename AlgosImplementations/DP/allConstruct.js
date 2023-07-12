// T: O(n^m), S: O(n^m)
const allConstruct=(target, wordBank)=>{
	if(target==='') return [[]];
	const result=[]
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const suffix=target.slice(word.length);
			const suffixWays=allConstruct(suffix, wordBank);
			const targetWays=suffixWays.map(way=>[word, ...way]);
			result.push(...targetWays);
		}
	}
	return result;
};

// T: O(n^m), S: O(n^m)
const allConstructDp=(target, wordBank)=>{
	if(target==='') return[[]];
	if(target in memo) return memo[target];
	const result=[];
	for(let word of wordBank){
		if(target.indexOf(word)===0){
			const suffix=target.slice(word.length);
			const suffixWays=allConstructDp(suffix, wordBank);
			const targetWays=suffixWays.map(way=>[word, ...way]);
			result.push(...targetWays);
		}
	}
	return result;
};

// T: O(n^m), S: O(n^m)
const allConstructTab=(target, wordBank)=>{
	const dp=Array(target.length+1).fill().map(()=>[]);
	dp[0]=[[]];
	for(let i=0; i<=target.length; ++i){
		for(let word of wordBank){
			if(target.slice(i, i+word.length)===word){
				const newCombo=dp[i].map(subArr=>[...subArr, word]);
				dp[i+word.length].push(...newCombo);
			}
		}
	}
	return dp[target.length];
};

const wordBank=["purp", "p", "ur", "le", "purpl"];
let target="purple";
const wordBank2=["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa"];
let target2="aaaaaaaaaaaaaaaaaaa";
console.log(allConstruct(target, wordBank));
console.log('-------');
console.log(allConstruct(target, wordBank));
console.log('-------');
console.log(allConstructTab(target, wordBank));
