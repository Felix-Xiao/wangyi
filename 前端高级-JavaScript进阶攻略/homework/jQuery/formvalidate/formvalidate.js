(function (global, functory, plug) {
    return functory.call(global, global.jQuery, plug);
})(typeof window === "undefind" ? this : window, function ($, plug) {
    var mobileExp = /^1(3|4|5|6|7|8|9)\d{9}$/;
    var idExp = /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
    var emailExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    //[A-Z]密码长度6-12位，由数字、小写字符、大写字母组成，但必须至少包括2种字符。
    var passwordExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    var defaultConfig = {
        "defaultEvent": "change",
        "errorMessage": "校验失败"
    }
    var defaultRules = {
        "require": function () {
            return !!(this.val());
        },
        "mobile": function (regex) {
            var reg = new RegExp(regex || mobileExp);
            return reg.test(this.val())
        },
        "id": function (regex) {
            var reg = new RegExp(regex || idExp);
            return reg.test(this.val())
        },
        "email": function () {
            var reg = new RegExp(regex || emailExp);
            return reg.test(this.val())
        },
        "password": function () {
            var reg = new RegExp(regex || passwordExp);
            return reg.test(this.val())
        }
    }
    $.fn[plug] = function (ops) {
        var self = this;
        var fileds = this;
        //将默认配置和客户配置挂载到this
        $.extend(this, defaultConfig, ops);
        //（用户配置的事件 || 默认事件）发生时触发校验
        fileds.on(this.event || this.defaultEvent, function () {
            var $f = $(this);
            //移除上一次的校验class
            var $g = $f.parent(".form-group:first").removeClass("has-success has-error");
            $g.find(".help-block").remove();
            var msg, res = true;
            //循环所有的校验规则
            $.each(defaultRules, function (rule, valid) {
                // 获取元素是否自定义规则
                var v = $f.data("" + rule + "-rule");
                //判断元素是否拥有这个校验规则
                if ($f.data("" + rule)) {
                    //校验
                    res = valid.call($f, v);
                    //添加提示信息
                    if (!res) {
                        msg = $f.data("" + rule + "-error") || self.errorMessage;
                        $f.after('<span class="help-block">' + msg + '.</span>')
                    }
                    //改变layout
                    $g.addClass(res ? "has-success" : "has-error")
                }
            })
        })
        //允许用户扩展校验规则
        this.extendRules = function (rules) {
            $.extend(defaultRules, rules)
        }
        return this;
    }

}, "formvalidate")