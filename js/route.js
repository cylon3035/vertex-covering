app.config(function($routeProvider){
$routeProvider
	.when('/main',{
		controller:'MainController',
		templateUrl:'partails/Vertex.html'
	})
	.otherwise({redirectTo:'/main'});
});