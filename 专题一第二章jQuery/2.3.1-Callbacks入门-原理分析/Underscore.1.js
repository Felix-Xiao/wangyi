(function (root) {
	var optionsCache = {};
	var _ = {
		callbacks: function (opctions) {
			var opctions = typeof opctions === "string" ? (optionsCache[opctions] || creatOpctions(opctions)) : {};
			var list = [];
			var index, length, testting, memory, start, starts;
			var fire = function(data){
				memory = memory || data;
				index = starts || 0;
				start = 0;
				testting = true;
				length = list.length;
				for(;index < length; index++){
					if(!list[index].apply(data[0], data[1]) && opctions["StopOnFalse"]){
						break;
					}
				}
			}
			var self = {
				add : function(){
					var args = Array.prototype.slice.call(arguments);
					start = list.length;
					args.forEach(function(fn){
						if(toString.call(fn) === "[object Function]"){
							list.push(fn);
						}
					})
					if(memory){
						starts = start;
						fire(memory);
					}
				},
				fireWith : function(context, arguments){
					var arg = [context, arguments];
					if(!opctions["once"] || !testting){
						fire(arg);
					}
				},
				fire: function(){
					self.fireWith(this, arguments);
				}
			}
			return self;
		}
	}
	creatOpctions = function (opctions) {
		var opt = optionsCache[opctions] = {};
		opctions.split(/\s+/).forEach(function (value) {
			opt[value] = true;
		});
		return opt;
	}
	root._ = _;
})(this)