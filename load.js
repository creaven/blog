//load templates
var Template = require('./template');
this.loaded = 2;
this.template = {};
var self = this;
posix.readdir('templates').addCallback(function(names){
	var count = 0;
	names.forEach(function(name){
		++count;
		posix.cat('templates/' + name).addCallback(function(file){
			self.template[name.split('.')[0]] = Template.compile(file);
			sys.puts('\x1b[32mloaded template ' + name + '\x1b[0m');
			--count;
			if(!count){
				--self.loaded;
				sys.puts('\x1b[32mtemplates loaded\x1b[0m');
			}
		});
	});
});

//connect to database
var dbslayer = require('./dbslayer');
this.db = new dbslayer.Server('localhost', 9090);
sys.puts('\x1b[32mconnected to database\x1b[0m')
--this.loaded;