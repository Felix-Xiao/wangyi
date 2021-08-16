(function(root) {
	var baseOptions = { //内置的配置项

	}

	var no = function() {
		return false;
	}

	function makeMap(
		str,
		expectsLowerCase
	) {
		var map = Object.create(null);
		var list = str.split(',');
		for (var i = 0; i < list.length; i++) {
			map[list[i]] = true;
		}
		return expectsLowerCase ?
			function(val) {
				return map[val.toLowerCase()];
			} :
			function(val) {
				return map[val];
			}
	}

	var isPlainTextElement = makeMap('script,style,textarea', true);
	var isIgnoreNewlineTag = makeMap('pre,textarea', true);
	var shouldIgnoreFirstNewline = function(tag, html) {
		return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
	};

	//渲染函数
	function createFunction(code, errors) {
		try {
			return new Function(code)
		} catch (err) {
			errors.push({
				err: err,
				code: code
			});
			return noop
		}
	}

	function extend(to, _from) {
		for (var key in _from) {
			to[key] = _from[key];
		}
		return to
	}

	function createCompileToFunctionFn(compile) {
		var cache = Object.create(null);

		return function compileToFunctions(template, options) {
			/*options   用户自定义选项配置 */
			options = extend({}, options);

			{
				// detect possible CSP restriction
				try {
					new Function('return 1');
				} catch (e) {
					if (e.toString().match(/unsafe-eval|CSP/)) {
						warn$$1(
							'It seems you are using the standalone build of Vue.js in an ' +
							'environment with Content Security Policy that prohibits unsafe-eval. ' +
							'The template compiler cannot work in this environment. Consider ' +
							'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
							'templates into render functions.'
						);
					}
				}
			}

			// check cache
			var key = options.delimiters ?
				String(options.delimiters) + template :
				template;

			if (cache[key]) {
				return cache[key] //res 对象
			}

			var compiled = compile(template, options); //编译之后做的事情

			// check compilation errors/tips
			{
				if (compiled.errors && compiled.errors.length) { //errors ["xxxxx...."]
					warn$$1(
						"Error compiling template:\n\n" + template + "\n\n" +
						compiled.errors.map(function(e) {
							return ("- " + e);
						}).join('\n') + '\n',
						vm
					);
				}
				if (compiled.tips && compiled.tips.length) { //tips ["xxxxx...."]
					compiled.tips.forEach(function(msg) {
						return tip(msg, vm);
					});
				}
			}

			// turn code into functions
			var res = {}; //
			var fnGenErrors = []; // vnode 转化成真正的DOM
			res.render = createFunction(compiled.render, fnGenErrors); //1：渲染函数 render()  vnode
			res.staticRenderFns = compiled.staticRenderFns.map(function(code) { //staticRenderFns  静态节点
				return createFunction(code, fnGenErrors)
			});

			{
				if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
					warn$$1(
						"Failed to generate render function:\n\n" +
						fnGenErrors.map(function(ref) {
							var err = ref.err;
							var code = ref.code;

							return ((err.toString()) + " in\n\n" + code + "\n");
						}).join('\n'),
						vm
					);
				}
			}
			return (cache[key] = res)
		}
	}

	function createCompilerCreator(baseCompile) {
		return function createCompiler() {
			function compile(template, options) { //编译之后做的事情
				var finalOptions = Object.create(baseOptions); //finalOptions  编译器配置对象
				var errors = [];
				var tips = [];
				finalOptions.warn = function(msg, tip) { //重置  options.warn("标签未闭合",true)
					(tip ? tips : errors).push(msg);
				};

				if (options) {
					// merge custom modules
					if (options.modules) {
						finalOptions.modules =
							(baseOptions.modules || []).concat(options.modules);
					}
					// merge custom directives  合并自定义指令   finalOptions.directives
					if (options.directives) {
						finalOptions.directives = extend(
							Object.create(baseOptions.directives || null),
							options.directives
						);
					}
					// copy other options
					for (var key in options) {
						if (key !== 'modules' && key !== 'directives') {
							finalOptions[key] = options[key]; //finalOptions   编译器最终的配置对象（默认+自定义）
						}
					}
				}
				var compiled = baseCompile(template, finalOptions);
				compiled.errors = errors;
				compiled.tips = tips;
				return compiled
			}

			return {
				compile: compile,
				compileToFunctions: createCompileToFunctionFn(compile)
			}
		}
	}

	var createCompiler = createCompilerCreator(function baseCompile( //createCompilerCreator  return function  正在编译
		template,
		options
	) {
		var ast = parse(template.trim(), options); //finalOptions
		if (options.optimize !== false) {
			optimize(ast, options);
		}
		var code = generate(ast, options); //change
		return {
			ast: ast,
			render: "",
			staticRenderFns: []
		}
	});

	var ref$1 = createCompiler(baseOptions); //{compileToFunctions:function(){}}
	var compile = ref$1.compile;
	var compileToFunctions = ref$1.compileToFunctions;

	function baseWarn(msg) {
		console.error(("[Vue compiler]: " + msg));
	}

	var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
	var startTagOpen = new RegExp(("^<" + qnameCapture));
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
	var doctype = /^<!DOCTYPE [^>]+>/i;
	// #7298: escape - to avoid being pased as HTML comment when inlined in page
	var comment = /^<!\--/;
	var conditionalComment = /^<!\[/;


	//parse  解析    parser 解析器
	function parse(template, options) {
		warn$2 = options.warn || baseWarn;
		parseHTML(template, {
			start: function() {
				console.log("开始标签的钩子函数")
			},
			end: function() {},
			chars: function() {
				console.log("纯文本的钩子函数")
			},
			comment: function() {}
		});
	}

	function parseHTML(html, options) {
		var stack = [];
		var expectHTML = options.expectHTML; //布尔值
		var isUnaryTag$$1 = options.isUnaryTag || no; //是不是单标签
		var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no; //是不是可以省略闭合标签的双标签
		var index = 0; //解析过程字符流读入的位置
		var last, lastTag; //last 剩余为解析的html字符串   lastTag 始终存储 stack 栈顶的元素名称

		//while (html){   //</div>
		if (!lastTag || !isPlainTextElement(lastTag)) {
			var textEnd = html.indexOf('<');
			if (textEnd === 0) {
				// Start tag:
				var startTagMatch = parseStartTag();
				console.log(startTagMatch)
				if (startTagMatch) {
					handleStartTag(startTagMatch);
					//忽略<pre> 标签 <textarea> 标签的内容中第一个换行符
					if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
						advance(1);
					}
				}

				//continue
			}
			var text = (void 0),
				rest = (void 0),
				next = (void 0);
			if (textEnd >= 0) { //解析纯文本
				rest = html.slice(textEnd);
				while (
					!endTag.test(rest) &&
					!startTagOpen.test(rest) &&
					!comment.test(rest) &&
					!conditionalComment.test(rest)
				) {
					// < in plain text, be forgiving and treat it as text
					next = rest.indexOf('<', 1);
					if (next < 0) {
						break
					}
					textEnd += next; //重置字符流解析的位置
					rest = html.slice(textEnd); //纯文本后面的内容 </div>
				}
				text = html.substring(0, textEnd);
				advance(textEnd);
			}
			//调用处理纯文本的钩子函数
			if (options.chars && text) {
				options.chars(text);
			}
		}
		//}

		function advance(n) {
			index += n;
			html = html.substring(n);
		}

		function parseStartTag() {
			var start = html.match(startTagOpen); //startTagOpen  正则文法   token
			if (start) {
				var match = {
					tagName: start[1],
					attrs: [],
					start: index,
				};
				advance(start[0].length);
				var end, attr;
				//startTagClose  检测标签是否是一个完整的开始标签   "/> || >"
				while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
					advance(attr[0].length);
					match.attrs.push(attr);
				}
				if (end) {
					match.unarySlash = end[1]; //unarySlash 属性 是否有值  判断元素是否为一元标签
					advance(end[0].length);
					match.end = index;
					return match
				}

			}
		}

		//handleStartTag 处理开始标签的解析结果
		function handleStartTag(match) {
			var tagName = match.tagName; //开始标签的名称
			var unarySlash = match.unarySlash; // 一元或非一元标签

			var unary = isUnaryTag$$1(tagName) || !!unarySlash; //非一元标签
			console.log(match.attrs)
			var l = match.attrs.length; //数组 [" id='app'", "id", "=", undefined, "app", undefined, index: 0]
			var attrs = new Array(l);
			for (var i = 0; i < l; i++) {
				var args = match.attrs[i];
				var value = args[3] || args[4] || args[5] || ''; //value
				//
				var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ?
					options.shouldDecodeNewlinesForHref :
					options.shouldDecodeNewlines;
				attrs[i] = {
					name: args[1],
					value: value //decodeAttr(value, shouldDecodeNewlines)
				};
			}

			if (!unary) { //true
				stack.push({
					tag: tagName,
					lowerCasedTag: tagName.toLowerCase(),
					attrs: attrs
				});
				lastTag = tagName;
			}
			//调用开始标签的钩子函数
			if (options.start) {
				options.start(tagName, attrs, unary, match.start, match.end);
			}
		}

	}

	function optimize() {

	}

	function generate() {

	}


	root.compiler = compileToFunctions;
})(this);
