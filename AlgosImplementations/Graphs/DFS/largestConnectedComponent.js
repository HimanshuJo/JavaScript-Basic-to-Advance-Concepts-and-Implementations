const largestConnectedComponent=(graph)=>{
	let largest=0;
	const visited=new Set();
	for(let node in graph){
		const size=exploreSize(graph, node, visited);
		if(size>largest) largest=size;
	}
	return largest;
};

const exploreSize=(graph, node, visited)=>{
	if(visited.has(String(node))) return 0;
	visited.add(String(node));
	let size=1;
	for(let nei of graph[node]){
		size+=exploreSize(graph, nei, visited);
	}
	return size;
};

graph={0: [8, 1, 5], 1: [0], 5: [0, 8], 8: [0, 5], 2: [3, 4], 3: [2, 4], 4: [3, 2]};
console.log(largestConnectedComponent(graph));
