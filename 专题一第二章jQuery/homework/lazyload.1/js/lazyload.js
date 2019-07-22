(function ($, root) {
    const defaltOpction = {
        className: "lazyload",
        attribute: "data-src",
        root: null,
        rootMargin: "0px",
        threshold: 0,
    };
    function Lazyload(elements, opctions) {
        this.settings = $.extend(defaltOpction, opctions) || {};
        var className = this.settings.className;
        this.images = Array.prototype.slice.call(elements).filter(function (ele) {
            var classNameArray = ele.className.split(/\s+/);
            var cn = classNameArray.find(function(value){
                return value.toLowerCase() === className
            })
            return cn !== undefined
        });
        this.observer = null;
        this.init();
    }
    Lazyload.prototype = {
        init: function () {
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }
            let observerConfig = {
                root: this.settings.root,
                rootMargin: this.settings.rootMargin,
                threshold: this.settings.threshold
            }
            let self = this;
            this.observer = new IntersectionObserver(function (entries) {
                Array.prototype.forEach.call(entries, function (entry) {
                    if (entry.isIntersecting) {
                        self.observer.unobserve(entry.target);
                        let src = entry.target.getAttribute(self.settings.attribute);
                        if ("img" === entry.target.tagName.toLowerCase() && src) {
                            entry.target.src = src;
                        }
                    }
                })
            }, observerConfig);
            Array.prototype.forEach.call(this.images, function (image) {
                self.observer.observe(image);
            });
        },
        loadImages: function () {
            if (!this.settings) return;
            let self = this;
            Array.prototype.forEach.call(this, function (image) {
                let src = image.getAttribute(self.settings.attribute);
                if ("img" === image.tagName.toLowerCase() && src) {
                    image.src = src;
                }
            })
        },
        destory: function () {
            if (!this.settings) return;
            this.observer.disconnect();
            this.settings = null;
        }
    }
    $.fn.lazyload = function (options) {
        options = options || {};
        new Lazyload(this, options);
        return this;
    }
    return Lazyload;
})(jQuery, window)