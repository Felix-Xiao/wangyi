(function ($, root) {
    const defaltOpction = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    };
    var settings, images, observer;
    function Lazyload(elements, opctions) {
        settings = $.extend(defaltOpction, opctions) || {};
        images = Array.prototype.slice.call(elements);
        observer = null;
        this.init();
    }
    Lazyload.prototype = {
        init: function () {
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }
            let observerConfig = {
                root : settings.root,
                rootMargin : settings.rootMargin,
                threshold: settings.threshold
            }
            observer = new IntersectionObserver(function(entries){
                Array.prototype.forEach.call(entries, function(entry){
                    if(entry.isIntersecting){
                        observer.unobserve(entry.target);
                        let src = entry.target.getAttribute("origin-src");
                        if("img" === entry.target.tagName.toLowerCase()){
                            entry.target.src = src;
                        }
                    }
                })
            },observerConfig);
            Array.prototype.forEach.call(images, function (image) {
                observer.observe(image);
            });
        },
        loadImages: function(){
            if(!this.settings) return;
            Array.prototype.forEach.call(this, function(image){
                image.src = image.getAttribute("origin-src");
            })
        },
        destory: function(){
            if(!this.settings) return;
            observer.disconnect();
            settings = null;
        }
    }
    $.fn.lazyload = function (opctions) {
        opctions = opctions || {};
        new Lazyload(this, opctions);
        return this;
    }
    return Lazyload;
})(jQuery, window)