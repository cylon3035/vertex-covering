app.factory("Graph", function(  ) {
	
	return function(vertexes, edges){
		this.vertexes = vertexes || [];
		this.edges = edges || [];
	}
});