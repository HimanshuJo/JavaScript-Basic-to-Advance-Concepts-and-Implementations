// 2246. Longest Path With Different Adjacent Characters
/*
You are given a tree (i.e. a connected, undirected graph that has no cycles) 
rooted at node 0 consisting of n nodes numbered from 0 to n - 1. 

The tree is represented by a 0-indexed array parent of size n, where parent[i] is the 
parent of node i. Since node 0 is the root, parent[0] == -1.

You are also given a string s of length n, where s[i] is the character assigned to node i.

Return the length of the longest path in the tree such that no pair of adjacent nodes 
on the path have the same character assigned to them

Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path where each two adjacent nodes have different 
characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3, so 3 is returned.

It can be proven that there is no longer path that satisfies the conditions.

Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters is the 
path: 2 -> 0 -> 3. The length of this path is 3, so 3 is returned.

-------

Constraints:

n == parent.length == s.length
1 <= n <= 10^5
0 <= parent[i] <= n - 1 for all i >= 1
parent[0] == -1
parent represents a valid tree.
s consists of only lowercase English letters.
*/

/*
Solution2:

class Solution {
public:
    
    unordered_map<int, vector<int>>gr;
    unordered_map<int, int>vis;
    int fnans=0;
    
    int dfs(int node){
        if(vis[node]==1) return 0;
        vis[node]=1;
        vector<int>ans={0, 0};
        for(auto &child: gr[node]){
            if(vis[child]==0){
                ans.push_back(dfs(child));
            }
        }
        sort(ans.begin(), ans.end());
        int curans=1+ans.back()+ans[ans.size()-2];
        fnans=max(fnans, curans);
        return 1+ans.back();
    }
    
    int longestPath(vector<int>& parent, string s) {
       int sz=parent.size();
       for(int i=0; i<sz; ++i){
           if(parent[i]!=-1&&s[i]!=s[parent[i]]){
               gr[i].push_back(parent[i]);
               gr[parent[i]].push_back(i);
           }
       }
       for(int i=0; i<sz; ++i){
           dfs(i);
       }
        return fnans;
    }
};
*/

/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function(parent, s) {
    const adjList=parent.reduce(
                    (adjList, parent, node)=>{
                        if(parent<0) return adjList;
                        adjList[parent].push(node);
                        return adjList;
                    }, new Array(parent.length).fill(0).map(()=>[])
                  );
    var longest=1;
    const dfs=(node)=>{
        let maxChild1=0, maxChild2=0;
        adjList[node].forEach(
                            (child)=>{
                                const childLength=dfs(child);
                                if(s[child]===s[node]) return;
                                if(childLength>maxChild1){
                                    maxChild2=maxChild1;
                                    maxChild1=childLength;
                                } else if(childLength>maxChild2){
                                    maxChild2=childLength;
                                }
                            }
                        );
        longest=Math.max(longest, maxChild1+maxChild2+1);
        return 1+maxChild1;
    }
    dfs(0);
    return longest;
};