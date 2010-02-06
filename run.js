sys = require('sys');
posix = require('posix');
http = require('http');
config = require('./config').config;
urls = require('./urls').urls;
route = require('./route').route;
controller = require('./controllers').Controllers;
load = require('./load');
template = load.template;

http.createServer(function(request, response){
	if(!load.loaded) return;
	var data = route(request.url);
	if(!data.controller){
		if(config.debug){
			sys.puts('\x1b[31m' + request.method + ' ' + request.url + '\x1b[0m');
		}
		response.sendHeader(404, {'Content-Type': 'text/html; charset=utf-8'});
		response.sendBody(template['404']({config: config}), encoding='utf-8');
		response.finish();
	}else{
		response.sendHeader(200, {'Content-Type': 'text/html; charset=utf-8'});
		if(config.debug){
			sys.puts(request.method + ' ' + request.url);
		}
		if(!controller[data.controller]){
			if(config.debug){
				sys.puts('\x1b[31mcontroller "' + data.controller + '" not exists\x1b[0m');
				response.sendBody('controller "' + data.controller + '" not exists', encoding='utf-8');
			}
			response.finish();
			return;
		}
		var body = controller[data.controller](data);
		response.sendBody(body, encoding='utf-8');
		response.finish();
	}
}).listen(5001);