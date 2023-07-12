// T: O(2^N), S: O(N)
const fibSp=(n)=>{
	if(n<=2) return 1;
	return fibSp(n-1)+fibSp(n-2);
};

// T: O(N), S: O(N)
const fibDp=(n, memo={})=>{
	if(n<=2) return 1;
	if(n in memo) return memo[n];
	return memo[n]=fibDp(n-1)+fibDp(n-2);
};

// Tabulation
// T: O(N), S: O(N)
const fibTab=(n)=>{
	const dp=Array(n+1).fill(0);
	dp[1]=1;
	for(let i=0; i<=n; ++i){
		dp[i+1]+=dp[i];
		dp[i+2]+=dp[i];
	}
	return dp[n];
}

// T: O(log N), S: O(1)
const fibLogN=(n)=>{
	let phi = (1 + Math.sqrt(5)) / 2;
    return Math.round(Math.pow(phi, n) / Math.sqrt(5));
};

let var1=5;
let var2=7;
let var3=15;
let var4=50;
console.log(fibSp(var1));
console.log(fibSp(var2));
console.log('-------');
console.log(fibDp(var1));
console.log(fibDp(var2));
console.log(fibDp(var3));
console.log('-------');
console.log(fibLogN(var4));
console.log('-------');
console.log(fibTab(var4));
