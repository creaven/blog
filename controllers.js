
this.Controllers = {

	home: function(data){
		var controller = data.controller;
		var data = data.data;
		return template[controller]({config: config});
	},
	
	'new': function(data){
		var controller = data.controller;
		var data = data.data;
		return template[controller]({config: config});
	}
	
};