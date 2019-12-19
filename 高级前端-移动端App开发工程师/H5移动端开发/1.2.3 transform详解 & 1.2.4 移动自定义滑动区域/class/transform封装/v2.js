HTMLElement.prototype.cssTransform = function (prop, value){
    var transform,
    transformValue = "";
    if(this.transform === undefined){
        this.transform = transform = Object.create(null);
    }
    // 设置元素
    if(value !== undefined){
        this.transform[prop] = value;
        transform = this.transform;

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
    this.style.WebkitTransform = this.style.transform = transformValue;

}else{
    // 读取元素
    return this.transform[prop];
}
}