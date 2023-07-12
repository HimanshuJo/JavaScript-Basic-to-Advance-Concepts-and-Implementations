// T: O(2^(n+m)), S: O(n+m)
const gridTravelerSp=(m, n)=>{
	if(m===1&&n===1) return 1;
	if(m===0||n===0) return 0;
	return gridTravelerSp(m-1, n)+gridTravelerSp(m, n-1);
};

// T: O(m*n), S: O(n+m)
const gridTravelerDp=(m, n, memo={})=>{
	const key=m+','+n;
	if(key in memo) return memo[key];
	if(m===1&&n===1) return 1;
	if(m===0||n===0) return 0;
	return memo[key]=gridTravelerDp(m-1, n, memo)+gridTravelerDp(m, n-1, memo);
};

// T: O(m*n), S: O(n+m)
const gridTravelerTab=(m, n)=>{
	const dp=Array(m+1).fill().map(()=>Array(n+1).fill(0));
	dp[1][1]=1;
	for(let i=0; i<=m; ++i){
		for(let j=0; j<=n; ++j){
			const curr=dp[i][j];
			if(j+1<=n) dp[i][j+1]+=curr;
			if(i+1<=m) dp[i+1][j]+=curr;
		}
	}
	return dp[m][n];
};

console.log(gridTravelerSp(2, 3));
console.log(gridTravelerSp(3, 3));
console.log('-------');
console.log(gridTravelerDp(2, 3));
console.log(gridTravelerDp(3, 3));
console.log('-------');
console.log(gridTravelerTab(2, 3));
console.log(gridTravelerTab(3, 3));
