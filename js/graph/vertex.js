app.factory("Vertex", function(  ) {
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
	return function(vertexText, id){
		this.text = vertexText;
		this.id = id || createGuid();
	}
});