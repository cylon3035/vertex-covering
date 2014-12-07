app.factory("VertexCoverService", function(Edge, Vertex, Graph){
	return function () {
		var self = this;
		self.NuMVC = function (graph) {
			initWeights(graph);
			while(true/*cuttof*/){
				
			}
			
		};
		
		self.GreedyMVC =  function (graph){
			var cover = [];
			while(!self.isMVCover(graph,cover))
			{
				var candidate, max=0;
					$.each(graph.vertexes,function (i,v){
					if (cover.indexOf(v)==-1){
						if(max<countEdgesNotInCover(graph,v, cover)){
							max=countEdgesNotInCover(graph,v, cover);
							candidate = v;
						}
					}
				});
				cover.push(candidate);
				console.log("ADDED CANDIDATE TO COVER");
				console.log("____V=",candidate);
				console.log("____COVER=",cover);
			}
			return cover
		};
		
		function countEdgesNotInCover(g,v, cover){
			var c=0;
			$.each(g.edges,function (i,e){
				if (e.target.id==v.id || e.source.id==v.id && cover.indexOf(e)==-1){
					c++;
				}
			});
			return c;
		};
		
		function countEdgesOf(g,v){
			var c=0;
			$.each(g.edges,function (i,e){
				if (e.target.id==v.id || e.source.id==v.id){
					c++;
				}
			});
			return c;
		};
		
		self.isMVCover =  function (graph, cover){
		console.log("ISCOVER");
		console.log("____G=", graph);
		console.log("____Cover=", cover);
			var isCover=true;
			$.each(graph.edges,function (i,e){
				if (cover.indexOf(e.target)==-1 && cover.indexOf(e.source)==-1){
					isCover = false;
				}
			});
		console.log("____ISMVC=", isCover);
			return isCover;
		};		
		
		function initWeights(g){
			$.each(g.edges,function (i,e){
				e.W = 1;
			});
		};
		
		function dscore(graph, C, v){
		console.log("DSCORE");
		console.log("____G=", graph);
		console.log("____C=", C);
		console.log("____v=", v);
		var C2 = C.slice(0);
			if(C.indexOf(v)==-1){
				C2.push(v);
			}
			else{
				C2.splice(C.indexOf(v), 1);			
			}
		var res = cost(graph,C2)-cost(graph,C2);
		console.log("____RESULT=",res);
		return res;
		}
		
		function cost(graph,X/*array of Verticies, candidate solution*/){
		console.log("COST");
		console.log("____G=", graph);
		console.log("____X=", X);
		var W = 0;
			$.each(graph.edges, function (i,e){
				if( X.indexOf(e.target)== -1 && X.indexOf(e.source)== -1)
				{
					W += e.W;
				}
			});
		console.log("____WEIGHT=",W);
		return W;
		}
		
		
	};
	
	
});