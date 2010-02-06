var Class = require('./mootools').Class;

var Blog = new Class({
	
	initialize: function(){
		sys.puts('initialize blog class');
	},
	
	getArticle: function(id){
		
	}
	
});

var Article = new Class({

	initialize: function(data){
		var title = data.title;
		var desc = data.desc;
		var article = data.article;
		var created = Date.now;
		var modified = created;
	},
	
	getVersion: function(version){
		
	}
	
});


this.blog = new Blog;
this.Article = Article;