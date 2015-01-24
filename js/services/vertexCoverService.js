app.factory("VertexCoverService", function(Edge, Vertex, Graph){
	return function () {
		var self = this;
		function getWithHighestDscore(graph, cover)
		{
			var max = -1000; var vertex;
			$.each(cover, function (i,e){
				var ds = dscore(graph, cover, e);
				if (max < ds){
					max = ds;
					vertex = e;
				}
			});
			return vertex;
		}
		
		function choseRandonUncoveredEdge(graph, cover){
			var uncovered;
			$.each(graph.edges, function (i,e){
				var covered = false;
				$.each(cover, function (j,v){
					if (e.incidentVertexes().indexOf(v)>-1)
						covered = true;
				});
				if (!covered)
				uncovered = e;
			});
			return uncovered;
		}
		
		self.NuMVC = function (graph) {
			initWeights(graph);
			initConfChange(graph);
			var cover = self.GreedyMVC(graph);
			var solution;
			var dateTime =  new Date();
			var endDateTime =  addMinutes(dateTime, 0.05);
			while(new Date() < endDateTime){
				console.log('New Cycle');
				if (self.isMVCover(graph, cover)){
					console.log("NuMVC: Already Cover, Remove V with highest dscore")
					solution =  cover.slice();;
					//remove a vertex with the highest dscore from C;
					var v = getWithHighestDscore(graph, cover);
					var index = cover.indexOf(v);
					if (index > -1) {
						cover.splice(index, 1);
						console.log('Remove V from Cover');
						console.log('V=' + v);
					}
					
					continue;
				} else {
					console.log("NuMVC: Not Cover")
					var v = getWithHighestDscore(graph, cover);
					var index = cover.indexOf(v);
					if (index > -1) {
						cover.splice(index, 1);
						console.log('Remove V from Cover');
						console.log('V=', v);
					}
					v.confChange = 0;
					$.each(graph.edges, function (i,e){
						if (e.incidentVertexes().indexOf(v)>-1)
						{
							if (e.target != v)
							{
								e.target.confChange = 1;
							} else  if (e.source != v)
							{
								e.source.confChange = 1;
							}
						}
					});
					var randonUncoveredE =  choseRandonUncoveredEdge(graph, cover);
					var onlyConfChange1=[];
					$.each(graph.vertexes, function (i,e){
						if (e.confChange == 1){
							onlyConfChange1.push(e);
						}
					});
					var v = getWithHighestDscore(graph, onlyConfChange1);
					cover.push(v);
					console.log('Add V to Cover');
						console.log('V=', v);
					v.confChange = 0;
					$.each(graph.edges, function (i,e){
						if (e.incidentVertexes().indexOf(v)>-1)
						{
							if (e.target != v)
							{
								e.target.confChange = 1;
							} else  if (e.source != v)
							{
								e.source.confChange = 1;
							}
						}
					});
					$.each(graph.edges, function (i,e){
						var covered = false;
						$.each(cover, function (j,v){
							if (e.incidentVertexes().indexOf(v)>-1)
								covered = true;
						});
						if (!covered)
							v.W += 1;
						var avrgW =  avrgWeight(graph);
						var gamma = 10;
						if (avrgW > gamma){
							$.each(graph.edges, function (i,e){
								e.W = Math.floor(e.W * 0.1);
							});
						}
					});
					
				}
			}
			return solution;
			/*
				An implementation of the CC strategy is to maintain a Boolean array confChange for vertices.
During the search procedure, those vertices which have a confChange value of 0 are forbidden to
add into C. The confChange array is initialized as an all-1 array. After that, when a vertex v is
removed from C, confChange(v) is reset to 0, and when a vertex v changes its state, for each
z ∈ N(v), confChange(z) is set to 1.
			*/
				
			
			
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
		
		function addMinutes(date, minutes) {
			return new Date(date.getTime() + minutes*60000);
		}
		
		self.isMVCover =  function (graph, cover){
		// console.log("ISCOVER");
		// console.log("____G=", graph);
		// console.log("____Cover=", cover);
			var isCover=true;
			$.each(graph.edges,function (i,e){
				if (cover.indexOf(e.target)==-1 && cover.indexOf(e.source)==-1){
					isCover = false;
				}
			});
		// console.log("____ISMVC=", isCover);
			return isCover;
		};		
		
		function initWeights(g){
			$.each(g.edges,function (i,e){
				e.W = 1;
			});
		};
		
		function avrgWeight(graph){
			var avrg=0;
			$.each(graph.edges, function (i,e){
				avrg+= e.W;
			});
			return avrg / graph.edges.length;
		}
		
		function initConfChange(g){
			$.each(g.vertexes,function (i,e){
				e.confChange = 1;
			});
		};
		
		function dscore(graph, C, v){
		// console.log("DSCORE");
		// console.log("____G=", graph);
		// console.log("____C=", C);
		// console.log("____v=", v);
		var C2 = C.slice(0);
			if(C.indexOf(v)==-1){
				C2.push(v);
			}
			else{
				C2.splice(C.indexOf(v), 1);			
			}
		var res = cost(graph,C)-cost(graph,C2);
		//console.log("____RESULT=",res);
		return res;
		}
		
		function cost(graph,X/*array of Verticies, candidate solution*/){
		// console.log("COST");
		// console.log("____G=", graph);
		// console.log("____X=", X);
		var W = 0;
			$.each(graph.edges, function (i,e){
				if( X.indexOf(e.target)== -1 && X.indexOf(e.source)== -1)
				{
					W += e.W;
				}
			});
		//console.log("____WEIGHT=",W);
		return W;
		}
		
		
	};
	
	
});