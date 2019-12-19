function Transform(element){
    var transform = {};
    var transformValue = "";

    // 转换属性数组
    var props = ['scaleX', 'scaleY','rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'translateX', 'translateY', 'translateZ'];

    props.forEach(function (prop){
        if(prop.indexOf('scale') >=0 ){
            transform[prop] = 1;
        } else {
            transform[prop] = 0;
        }

        Object.defineProperty(element, prop, {
            get: function (){
                return transform[prop];
            },
            set: function(value){
                transformValue = '';
                transform[prop] = value;
                for (var name in transform) {
                    switch (name) {
                        case "scaleX":
                        case "scaleY":
                            transformValue += " " + name + "(" + transform[name] + ")";
                            break;
                        case "rotate":    
                        case "rotateX":
                        case "rotateY":
                        case "rotateZ":
                        case "skewX":
                        case "skewY":
                            transformValue += " " + name + "(" + transform[name] + "deg)";
                            break;
                        default:
                            transformValue += " " + name + "(" + transform[name] + "px)";
                    }
                }
                element.style.WebkitTransform = element.style.transform = transformValue;
            }
        })
    })
}