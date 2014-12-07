app.factory("GraphBuilder", function(Graph, Edge, Vertex){
return function(){
		this.buildGraph1 = function (){
			var vertex1 =  new Vertex("v1",1);
			var vertex2 =  new Vertex("v2",2);
			var vertex3 =  new Vertex("v3",3);
			var vertex4 =  new Vertex("v4",4);
			
			var edge1 =  new Edge("e1",1,vertex1,vertex2);
			var edge2 =  new Edge("e2",1,vertex2,vertex3);
			var edge3 =  new Edge("e3",1,vertex3,vertex4);
			var edge4 =  new Edge("e4",1,vertex4,vertex1);
			var graph = new Graph(
				[vertex1,vertex2,vertex3,vertex4],
				[edge1, edge2, edge3, edge4]
			);
			return graph;
		};
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		function getNewRandomEdge(edges,vertices,i){
		var v1, v2, isUnique;
		var vn = vertices.length;
		do
		{
			v1 = vertices[getRandomInt(0,vn-1)];
			v2 = vertices[getRandomInt(0,vn-1)];
			if (v1 != v2){
				isUnique =true;
				$.each(edges, function(i,e){
					if ((e.target.id == v1.id && e.source.id == v2.id) || 
						(e.target.id == v2.id && e.source.id == v1.id ))
						{
						isUnique = false;
					}
				});
			}
			}
			while(!isUnique);
			return new Edge("E"+i,i,v1,v2)
		}
	
		this.buildRandomGraph = function(vn,en){
			var vertices = [];
			var edges = [];
			for(var i=0;i<vn;i++)
			{
				vertices.push(new Vertex("V"+i,i))
			}
			for(var i=0;i<en;i++)
			{
/*				var	v1 = vertices[getRandomInt(0,vn-1)];
				var	v2 = vertices[getRandomInt(0,vn-1)];
				var isUnique = true;
				$.each(edges, function(i,e){
					if ((e.target.id == v1.id && e.source.id == v2.id) || 
					(e.target.id == v2.id && e.source.id == v1.id ))
					{
						isUnique = false;
					}
				});
				if(isUnique){
					edges.push(new Edge("E"+i,i,v1,v2));
				}*/
				edges.push(getNewRandomEdge(edges, vertices, i));
			}
			return new Graph(vertices,edges);
		}
	}
});