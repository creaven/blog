var version = '0.9';

var cache = {};

this.compile = function(tpl, data){
	if(!tpl) return '';
	var fn = cache[tpl];
	if(!fn){
		var functionString = 'with(data){\nvar p = [];';
		var lastHtml = false;
		var lines = tpl.split('\n').forEach(function(line){
			if(/^\s*</.test(line)){
				line = line.replace(/'/g, "\\'").replace(/^\s*/, '').replace(/\{(.*?)\}/g, "', $1, '");
				if(!lastHtml){
					functionString += "\np.push('" + line;
				}else{
					functionString += line;
				}
				lastHtml = true;
			}else{
				if(lastHtml){
					functionString += "');\n" + line;
				}else{
					functionString += '\n' + line;
				}
				lastHtml = false;
			}
		});
		if(lastHtml) functionString += "');\n}\nreturn p.join('');";
		var fn = new Function('data', functionString);
		cache[tpl] = fn;
	}
	return data ? fn(data) : fn;
};