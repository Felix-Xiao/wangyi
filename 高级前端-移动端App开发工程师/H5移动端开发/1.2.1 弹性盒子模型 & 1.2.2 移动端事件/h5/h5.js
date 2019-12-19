(function(window){
    // 对外提供的接口
    function myMobile(selector){
        return myMobile.prototype._init(selector);
    }
    myMobile.prototype = {
        _init: function (selector){
            if( typeof selector === "string"){
                this.ele  = window.document.querySelector(selector);
                //this 原型对象
                return this;
            }
        },
        // 单机事件
        tap: function (hanler) {
            this.ele.addEventListener("touchstart",touchFn);
            this.ele.addEventListener("touchend",touchFn);
            var startTime,
                endTime;
            function touchFn (e){
                e.preventDefault();
                switch (e.type){
                    case "touchstart":
                        startTime = new Date().getTime();
                        break;
                    case "touchend":
                        endTime = new Date().getTime();
                        if ( endTime - startTime < 500 ){
                            hanler.call(this,e)
                        }
                        break;    
                }
            }
        },
        //长按事件
        longTap:function(hanler){
            this.ele.addEventListener("touchstart",touchFn);
            this.ele.addEventListener("touchmove",touchFn);
            this.ele.addEventListener("touchend",touchFn);
            var timerId;
            
            function touchFn(e){
                switch (e.type){
                    case "touchstart":
                        timerId = setTimeout( function (){
                            hanler.call(this.e) 
                        },500);
                        break;
                    case "touchmove":
                        clearTimeout(timerId)
                        break;   
                    case "touchend":
                        clearTimeout(timerId)
                        break;       
                }
            }
        },
        //左侧滑动
        slideLeft: function (hanler){
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);
            var startX, startY, endX, endY;

            function touchFn(e){
                e.preventDefault();
                // console.log(e.changedTouches);
                var firstTouch = e.changedTouches[0];
                switch (e.type){
                    case "touchstart":
                        startX = firstTouch.pageX;
                        startY = firstTouch.pageY;
                        break;
                    case "touchend":
                        endX = firstTouch.pageX;
                        endY = firstTouch.pageY;
                        // x方向移动的距离大于Y（定义为左滑操作）并且移动距离超过了25px
                        
                        if ( Math.abs(endX - startX) >= Math.abs(endY -startY) && startX - endX >= 25){
                            hanler.call(this, e)
                        }
                        break;
                }
            }
        }
    }
    window.$ = window.myMobile = myMobile;
})(window);