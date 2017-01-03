/**
 * Created by gunjoe on 2016/12/16.
 */
var ul_new = getId("new"),
    lis = getTagName(ul_new,"li"),
    write = getId("write"),
    span = getId("span");
    btn = getId("btn");

function scroll() {
    var li = ul_new.removeChild(lis[0]);
    ul_new.appendChild(li);
}

btn.onclick = function () {
    var li = crtDom("li");
    var a = crtDom("a");
    var text = write.value;
    if (text.length > 18){
        a.setAttribute("data-detail",text);
        text = text.substr(0,18);
        text += "...";
    }
    a.href = "#";
    a.innerHTML = text;
    li.appendChild(a);
    ul_new.appendChild(li);
    write.value = "";
};

//2s滚动定时器
var twoSecond = setInterval(scroll,2000);

//鼠标移入清除
ul_new.addEventListener("mouseover",function () {
    clearInterval(twoSecond);
},false);

//鼠标移出重新设置定时器，并添加移入清除事件
ul_new.addEventListener("mouseout",function () {
    var twoSecond = setInterval(scroll,2000);
    ul_new.addEventListener("mouseover",function () {
        clearInterval(twoSecond);
    },false);
    span.style.display = "";
},false);

//移入显示信息
ul_new.addEventListener("mousemove",function (e) {
    if (e.target.tagName.toLowerCase() == "a"){
        //区分新添加信息和本来就有的信息
        if (e.target["data-detail"]){
            span.innerHTML = e.target.getAttribute("data-detail");
            span.style.top = e.clientY + 10 + "px";
            span.style.left = e.clientX + 40 + "px";
            span.style.display = "block";
        }else {
            span.innerHTML = e.target.innerHTML;
            span.style.top = e.clientY + 10 + "px";
            span.style.left = e.clientX + 40 + "px";
            span.style.display = "block";
        }
    }
},false);














