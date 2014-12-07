app.controller("MainController", function($scope, Edge, Vertex, Graph,GraphD3VisualizationService,GraphBuilder,
VertexCoverService){
	$scope.initial = "Initial commit";
	$scope.verticesCount = 9;
	$scope.edgesCountMax = function () { return $scope.verticesCount * ($scope.verticesCount-1) / 2; };
	$scope.edgesCount = $scope.edgesCountMax();
	
	$scope.generate =  function() {
		$scope.graph= builder.buildRandomGraph($scope.verticesCount, $scope.edgesCount);
		var d3graph = presentationService.translateGrapToD3($scope.graph);
		presentationService.visualizeD3(d3graph);
	};
	
	$scope.mvcGreedy =  function (){
		var cover = service.GreedyMVC($scope.graph);
		console.log("COVER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		console.log(cover);
		var d3graph = presentationService.translateGrapToD3($scope.graph,cover);
		presentationService.visualizeD3(d3graph);
		
	}
	
	var builder = new GraphBuilder();
	var service  = new VertexCoverService();
	var presentationService = new GraphD3VisualizationService({
		selector:'.viz-viewport',
		width: $('.viz-viewport').width(),
		height: $('.viz-viewport').height()
	});
	
});