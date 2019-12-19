(function(){
    // 获取外框
    var list = document.querySelector(".list-wrapper");
    // 获取导航
    var indexListNav = document.querySelector(".index-list-nav");
    // 导航下的所有li
    var indexListNavs = indexListNav.querySelectorAll("li");

    var indexListContent =  document.querySelector(".index-list-content");
    // 获取ul下的所有li
    var indexLists = indexListContent.children[1].children;
    // 顶部索引
    var indexListFixed = document.querySelector(".index-list-fixed");

    var indexList = new BScroll(list,{
        //  事件派发 实时派发
        probeType: 3
    })
    // 列表滚动控制右侧的导航
    indexList.on("scroll",(e)=>{
        var y = -e.y;
         // 排除定位城市
        if(y  < indexLists[0].offsetTop){
            setNav(0);
            indexListFixed.style.display = "none";
            return;
        }
        // 过了第1项 显示它
        indexListFixed.style.display = "block";
        // 对于最后一项并不成立
        for(var i = 0; i < indexLists.length - 1; i++){
            // 滚动距离是否大于当前项目 并且小于下一项  是的话 就说明还在当前项
            if(y >= indexLists[i].offsetTop && 
                y < indexLists[i+1].offsetTop) {
                    setNav(i);
                    // 赋值
                    indexListFixed.innerHTML  = indexLists[i].children[0].innerHTML;
                    return;
            }
        }
        // 最后一项单独处理
        setNav(indexLists.length -1);
        indexListFixed.innerHTML  = indexLists[indexLists.length -1].children[0].innerHTML;
    })
   


    // 通过右侧导航控制列表的滚动
    indexListNav.addEventListener("touchstart",  (e)=>{
        setIndex(e.changedTouches[0].clientY);
    })
    indexListNav.addEventListener("touchmove",  (e)=>{
        setIndex(e.changedTouches[0].clientY);
    })
    function setIndex(y){
        let index = getIndex(y);
        if(index < 0 || index > 9){
            //  没有对应元素 返回
            return;
        }
        // 滚动到对应元素上去
        indexList.scrollToElement(indexLists[index],100);
    }

    // 拿到坐标
    function getIndex(y){
        var navTop = indexListNav.getBoundingClientRect().top;
        // navli的高度
        var h = 18;
        var index  = parseInt((y - navTop)/18); // 0-8
        return index;
    }

    // nav li active控制
    function setNav(index){
        indexListNavs.forEach((li)=>{
            li.classList.remove("active");
        })
        indexListNavs[index].classList.add("active");
    }
})();