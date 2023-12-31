const undirectedPath=(edges, nodeA, nodeB)=>{
	const graph=buildGraph(edges);
	return hasPath(graph, nodeA, nodeB, new Set());
};

const hasPath=(graph, src, dest, visited)=>{
	if(src===dest) return true;
	if(visited.has(src)) return false;
	visited.add(src);
	for(let nei of graph[src]){
		if(hasPath(graph, nei, dest, visited)){
			return true;
		}
	}
	return false;
};

const buildGraph=(edges)=>{
	const graph={};
	for(let edge of edges){
		const [a, b]=edge;
		if(!(a in graph)) graph[a]=[];
		if(!(b in graph)) graph[b]=[];
		graph[a].push(b);
		graph[b].push(a);
	}
	return graph;
};

const edges=[['i', 'j'], ['k', 'i'], ['m', 'k'], ['k', 'l'], ['o', 'm']];
console.log(undirectedPath(edges, 'j', 'm'));
