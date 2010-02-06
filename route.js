
this.route = function(url){
	for(var pattern in urls){
		var match = new RegExp(pattern).exec(url);
		if(match) return {
			controller: urls[pattern],
			data: match
		}
	};
	return false;
}