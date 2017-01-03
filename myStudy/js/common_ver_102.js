/**
 * Created by Administrator on 2017/1/1 0001.
 */
console.log('是否使用了该js');
//封装随机颜色
function randomColor() {
    var str = "0123456789ABCDEF";
    var color = "#";
    for (var i=0;i<6;i++){
        var idx = parseInt(Math.random()*str.length);
        color += str[idx];
    }
    return color;
}

//封装随机数
function randomNum(min,max) {
    max = max > min ? max : min;
    min = max > min ? min : max;
    return parseInt( Math.random()*(max - min + 1) + min );
}
/*
 *事件绑定函数
 *兼容IE浏览器
 //bind(元素,事件名,事件处理函数,捕获)
 //bind(box,'click',function({}))
 *@bind(捆绑): 函数名
 *@ele: 绑定事件的元素
 *@type: 事件类型(事件名)
 *@handler: 事件处理函数
 *@capture: 是否捕获
 */
function bind(ele,type,handler,capture) {
    if (ele.addEventListener){
        ele.addEventListener(type,handler,capture)
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+type,handler)
    }
    else{
        ele["on"+type] = handler;
    }
}

/*
*封装cookie的函数;
* 设置 setCookie({name:xx,val:xx,expires:expires,path:path});
* 获取 getCookie(name)
* 删除 removeCookie(name);
* */
function setCookie(name,val,expires,path) {
    var cookie =name + "=" + val;
    if(expires){
        cookie += ";expires=" + expires;
    }
    if(path){
        cookie += ";path=" + path;
    }
    document.cookie = cookie;
}

function getCookie(name) {
    var cookies = document.cookie.split(";");
    var val = "";
    cookies.forEach(function (item) {
        var arr = item.split("=");
        if(arr[0] === name){
            val = arr[1];
        }
    });
    return val;
}

function removeCookie(name) {
    var now = new Date();
    now.setDate(now.getDate()-7);
    setCookie(name,"val",now);
}

/*
 * 获取样式方法
 * 标准:getComputedStyle();//获取的是最终的样式
 * IE8-:ele.currentStyle;
 * 当对象的属性是一个变量,需要调用该属性时.应该用obj[var];
 * ele是节点对象
 */

function getStyle(ele,attr){
    if(window.getComputedStyle){
        return getComputedStyle(ele)[attr];
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else {
        return ele.style[attr]
    }
}

/*
 * [animate descrition]
 * @ele [执行动画的元素]
 * @opt [动画改变的属性]
 * @callback [回调函数]
 */

function animate(ele,opt,callback) {
    //目标值
    var target = opt[attr];
    //获取当前值
    var unit = getStyle(ele,opt[attr]).replace(/^\d*/,"");
    setInterval(function () {
    var current = getStyle(ele,opt[attr]).replace(/\D*$/,"");

     var speed = (target - current)/10;


    },50)
    ele.style[opt[attr]] = current + speed + unit;


}