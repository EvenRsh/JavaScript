/**
 * Created by gunjoe on 2016/11/14.
 * DOM选取，CSS选取
 */
//获取
function getId(id) {
    return document.getElementById(id);
}
function getClass(className) {
    return document.getElementsByClassName(className);
}
function getTagName(parent,tagName) {
    return parent.getElementsByTagName(tagName);
}
//创建DOM节点
function crtDom(tagName) {
    return document.createElement(tagName);
}
//CSS选择器
function getCssStyle(ele,p_ele) {
    return document.defaultView.getComputedStyle(ele,p_ele);
}
//下列CSS选择器不实时更新列表，直接返回一个静态列表
function selectCss(element,selector) {
    return element.querySelector(selector);
}
function selectCssAll(element,selector) {
    return element.querySelectorAll(selector);
}

/**
 *  关于DOM元素的距离、长度
 */

//计算元素距离body的offsetLeft
function offLeft(element) {
    var element_l = element.offsetLeft;
    var parent_l = element.offsetParent;
    while (parent_l !== null){
        element_l = parseInt(element_l) + parseInt(parent_l.offsetLeft);
        parent_l = parent_l.offsetParent;
    }
    return element_l;
}

/**
*	时间差函数
*/
function showBTime(afterT) {
    var nowTime = new Date();
    var afterTime = new Date(Date.parse(afterT));
    //时间差，换算成秒
    var backT = parseInt(afterTime.getTime() - nowTime.getTime())/1000;
    //转换时间差
    var second = parseInt(backT % 60);
    var minute = parseInt(backT / 60 % 60);
    var hour = parseInt(backT / 60 / 60 % 24);
    var day = parseInt(backT /60 / 60 / 24);
    backTime.innerHTML = "倒计时：" + day + "天" + hour + "时" + minute + "分" + second + "秒";
}

/*
*   cookie操作
*/
function setCookie(name,val,expires,path){
    var cookie = name + '=' + val;
    if(expires){
        cookie +=';expires=' + expires;
    }
    if(path){
        cookie +=';path=' + path;
    }
    document.cookie = cookie;
    console.log(document.cookie);
}

function getCookie(name){
    var cookies = document.cookie.split('; ');
    var res = '';
    for(var i=0;i<cookies.length;i++){
        var arr = cookies[i].split('=');
        if(arr[0] === name){
            res = arr[1];
            break;
        }
    }
    return res;
}













