app.controller("MainController", function($scope, Edge, Vertex, Graph,GraphD3VisualizationService){
	$scope.initial = "Initial commit";
	var buildGraph1 =  function(){
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
	var g = buildGraph1();
	var presentationService = new GraphD3VisualizationService({
		selector:'.viz-viewport',
		width: $('.viz-viewport').width(),
		height: $('.viz-viewport').height()
	});
	var d3graph = presentationService.translateGrapToD3(g);
	presentationService.visualizeD3(d3graph);
});