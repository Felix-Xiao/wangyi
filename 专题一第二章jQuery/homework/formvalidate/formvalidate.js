// (function ($, root) {
//     $.fn.formvalidate = function (options) {
//         var options = options || {};
//         console.log(this);
//     }
// })(jQuery, window)

(function (global, functory, plug) {
    return functory.call(global, global.jQuery, plug);
})(typeof window === "undefind" ? this : window, function ($, plug) {
    var mobileExp = /^1(3|4|5|6|7|8|9)\d{9}$/;
    var idExp = /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
    var emailExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var __DEFS__ = {
        "raise": "change",
        "errorMessage" : "校验失败"
    }
    //规则引擎
    var __RULES__ = {
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
        }
    }
    $.fn[plug] = function (ops) {
        // if (this.is("form")) {
        if (true) {
            // var fileds = this.
            var self = this;
            var $fileds = this;
            $.extend(this, __DEFS__, ops);
            $fileds.on(this.raise, function () {
                var $f = $(this);
                var $g = $f.parent(".form-group:first").removeClass("has-success has-error");
                $g.find(".help-block").remove();
                var msg, res = true;
                $.each(__RULES__, function (rule, valid) {
                    var v = $f.data("" + rule);
                    if ($f.data("" + rule)) {
                        res = valid.call($f,v);
                        if (!res) {
                            msg = $f.data("" + rule + "-error") || self.errorMessage;
                            $f.after('<span class="help-block">' + msg + '.</span>')
                        }
                        $g.addClass(res ? "has-success" : "has-error")
                    }
                })
            })
            this.extendRules = function(rules){
                $.extend(__RULES__, rules)
            }
            return this;
        } else {
            throw new Error("require form")
        }
    }

}, "formvalidate")