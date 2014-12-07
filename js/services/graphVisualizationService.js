app.factory("GraphD3VisualizationService", function(){
	return function(viewPortCnfg)
	{
		this.visualizeD3=  function(d3graph){
	    var links = d3graph.links;
		var nodes = d3graph.nodes;
		var force = d3.layout.force()
			.nodes(d3.values(nodes))
			.links(links)
			.size([viewPortCnfg.width, viewPortCnfg.height])
			.linkDistance(100)
			.charge(-300)
			.on("tick", tick)
			.start();

		d3.select("svg").remove();
	   
		var svg = d3.select(viewPortCnfg.selector).append("svg")
			.attr("width", viewPortCnfg.width)
			.attr("height", viewPortCnfg.height);

		var link = svg.selectAll(".link")
			.data(force.links())
		  .enter().append("line")
			.attr("class", "link");

		var node = svg.selectAll(".node")
			.data(force.nodes())
		  .enter().append("g")
			.attr("class", function(d) {
				return d.inCover?"node cover":"node"; 
			})
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
			.call(force.drag);

		node.append("circle")
			.attr("r", 8);

		node.append("text")
			.attr("x", 12)
			.attr("dy", ".35em")
			.text(function(d) {
				return d.name; 
			});
			
			
		function tick() {
		  link
			  .attr("x1", function(d) { return d.source.x; })
			  .attr("y1", function(d) { return d.source.y; })
			  .attr("x2", function(d) { return d.target.x; })
			  .attr("y2", function(d) { return d.target.y; });

		  node
			  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		}

		function mouseover() {
		  d3.select(this).select("circle").transition()
			  .duration(750)
			  .attr("r", 16);
		}

		function mouseout() {
		  d3.select(this).select("circle").transition()
			  .duration(750)
			  .attr("r", 8);
		}
		};
	
		this.translateGrapToD3 =  function (g, cover) {
			var edges = g.edges;
			var vertexes = g.vertexes;
			var nodes = {};
			cover = cover || [];
			vertexes.forEach(function(e) {
			e.inCover=cover.indexOf(e)>-1;
		    nodes[e.name] = e;
		}); 
			return {
				nodes: nodes,
				links: edges
			};
		};
	
	}
});