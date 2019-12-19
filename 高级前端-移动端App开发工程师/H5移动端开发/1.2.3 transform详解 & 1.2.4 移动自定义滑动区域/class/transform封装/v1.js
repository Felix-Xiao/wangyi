function cssTransform(element, prop, value){
    // element 要操作的元素
    // prop 运动属性
    // value 具体值

    // 定义一个属性
    var transform,
        transformValue = "";
        if(element.transform === undefined){
            element.transform = transform = Object.create(null);
            // var a = {}; 
            // console.log(a);
            // console.log(transform);
        }

        // 设置元素
        if(value !== undefined){
            element.transform[prop] = value;
            transform = element.transform;

            // transform对象可能不止一个属性 遍历
            for (let name in transform) {
                switch (name){
                    case "scale":
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
            // 设置值 
            element.style.WebkitTransform = element.style.transform = transformValue;

        }else{
            // 读取元素
            return element.transform[prop];
        }
}