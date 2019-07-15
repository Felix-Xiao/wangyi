(function (root) {
	var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
	var jQuery = function (selector, context) {
		return new jQuery.prototype.init(selector, context);
	}
	jQuery.fn = jQuery.prototype = {
		length: 0,
		selector: "",
		readyList: [],
		init: function (selector, context) {
			context = context || document;
			var match, elem, index = 0;
			if (selector === undefined) {
				return this;
			}
			if (typeof selector === "string") {
				if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length > 2) {
					match = [selector];
				}
				if (match) {
					//创建
					jQuery.merge(this, jQuery.parseHTML(selector, context));
				} else {
					//查询
					elem = context.querySelectorAll(selector);
					var elems = Array.prototype.slice.call(elem);
					for (; index < elems.length; index++) {
						this[index] = elems[index];
					}
					this.length = elems.length;
					this.selector = selector;
					this.context = context;
				}
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			} else if (typeof selector === "function") {
				this.readyList.push(selector);
				jQuery.ready(this);
			}
		},
		css: function () {

		}
	}

	//extend
	jQuery.fn.extend = jQuery.extend = function () {
		var target = arguments[0] || {};
		var length = arguments.length;
		var i = 1;
		var deep = false;
		var option, name, copy, src, copyIsArray, clone;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1];
			i = 2;
		}
		if (typeof target !== "object") {
			target = {};
		}
		//参数的个数 1
		if (length === i) {
			target = this;
			i--;
		}

		//浅拷贝  深拷贝
		for (; i < length; i++) {
			if ((option = arguments[i]) != null) {
				for (name in option) {
					copy = option[name];
					src = target[name];
					if (deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
						target[name] = jQuery.extend(deep, clone, copy);
					} else if (copy != undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	}

	//共享原型对象
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend({
		//类型检测
		isPlainObject: function (obj) {
			return toString.call(obj) === "[object Object]";
		},
		isArray: function (obj) {
			return toString.call(obj) === "[object Array]";
		},
		merge: function (first, second) {
			var fl = first.length,
				sl = second.length,
				i = 0;
			if (typeof sl === "number") {
				for (; i < sl; i++) {
					first[fl] = second[i];
				}
			} else {
				while (second[i] !== undefined) {
					first[fl++] = second[i++];
				}
			}
			first.length = fl;
			return first;
		},
		parseHTML: function (data, context) {
			if (!data && typeof data !== "string") {
				return null;
			}
			var parse = rejectExp.exec(data);
			console.log(parse);
			return [context.createElement(parse[1])];
		},
		ready: function (context) {
			document.addEventListener("DOMContentLoaded",function(){
				if(context.readyList && context.readyList.length > 0){
					context.readyList.forEach((element => {
						element();
					}));
				}
			})
		}
	});
	root.$ = root.jQuery = jQuery;
})(this);
