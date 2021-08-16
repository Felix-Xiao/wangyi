(function(root) {
	//Vue编译器默认配置项
	var baseOptions = {
		// expectHTML: true,
		// modules: modules$1,
		// directives: directives$1,
		// isPreTag: isPreTag,
		// isUnaryTag: isUnaryTag,
		// mustUseProp: mustUseProp,
		// canBeLeftOpenTag: canBeLeftOpenTag,
		// isReservedTag: isReservedTag,
		// getTagNamespace: getTagNamespace,
		// staticKeys: genStaticKeys(modules$1)
	};

	function extend(to, _from) {
		for (var key in _from) {
			to[key] = _from[key];
		}
		return to
	}

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


	function createCompileToFunctionFn(compile) {
		var cache = Object.create(null); //缓存对象  优化处理

		return function compileToFunctions(template, options, vm) {
			options = extend({}, options);
			// options.warn 编译错误  警告信息的收集
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
				return cache[key] //res   render
			}

			// compile
			var compiled = compile(template, options); // 编译以结束

			// check compilation errors/tips
			{
				if (compiled.errors && compiled.errors.length) { //错误信息
					warn$$1(
						"Error compiling template:\n\n" + template + "\n\n" +
						compiled.errors.map(function(e) {
							return ("- " + e);
						}).join('\n') + '\n',
						vm
					);
				}
				if (compiled.tips && compiled.tips.length) { //警告信息
					compiled.tips.forEach(function(msg) {
						return tip(msg, vm);
					});
				}
			}

			// turn code into functions
			var res = {};
			var fnGenErrors = []; //渲染函数调用时的错误新收集
			//compiled.render  渲染函数所需的字符串
			res.render = createFunction(compiled.render, fnGenErrors);
			res.staticRenderFns = compiled.staticRenderFns.map(function(code) { //标注的静态节点 最终也呈现成渲染函数的格式
				return createFunction(code, fnGenErrors)
			});

			{ //呈现渲染函数中的错误
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
		return function createCompiler(baseOptions) {
			function compile(template, options) { //正在编译
				//finalOptions  最终的配置对象
				var finalOptions = Object.create(baseOptions); //{}.__proto__  baseOptions
				var errors = [];
				var tips = [];
				finalOptions.warn = function(msg, tip) { //错误 警告信息的收集
					(tip ? tips : errors).push(msg);
				};

				if (options) { //extend
					// merge custom modules    是否有要处理特殊的属性或者标签
					if (options.modules) {
						finalOptions.modules =
							(baseOptions.modules || []).concat(options.modules);
					}
					// merge custom directives    合并自定义的指令
					if (options.directives) {
						finalOptions.directives = extend(
							Object.create(baseOptions.directives || null),
							options.directives
						);
					}
					// copy other options
					for (var key in options) {
						if (key !== 'modules' && key !== 'directives') {
							finalOptions[key] = options[key];
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

	var createCompiler = createCompilerCreator(function baseCompile(
		template, //模板
		options //配置对象
	) {
		var ast = parse(template.trim(), options); //功能划分区域   模板解析操作  ast对象
		if (options.optimize !== false) {
			optimize(ast, options); //标注静态节点
		}
		var code = generate(ast, options); //渲染函数所需的字符串
		return {
			ast: ast,
			render: "code.render",
			staticRenderFns: []
		}
	});


	var ref$1 = createCompiler(baseOptions);
	//var compile = ref$1.compile;
	var compileToFunctions = ref$1.compileToFunctions;
     
	 //编译器解析的工作
	function parse(template, options) {
         console.log(template)
	}

	function optimize() {

	}

	function generate() {

	}

	root.compiler = compileToFunctions;
})(this);
