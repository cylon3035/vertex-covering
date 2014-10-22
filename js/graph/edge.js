app.factory("Edge", function(  ) {
	var createGuid = function() {
	  function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
				   .toString(16)
				   .substring(1);
	  }
	  return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			   s4() + '-' + s4() + s4() + s4();
	  };
	};
	return function(edgeText, id, ftom, to){
		var self = this;
		this.text = edgeText;
		this.id = id || createGuid();
		this.from = from;
		this.to = to;
		this.incidentVertexes = function(){
			return [self.from, self.to];
		};
		this.oriented= false;
	}
});