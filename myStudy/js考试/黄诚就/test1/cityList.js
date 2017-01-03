/**
 * Created by gunjoe on 2016/12/16.
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


var inp = getId("inp"),
    info = getId("info"),
    ul = getId("ul"),
    arr = [{"name": "北京","id": 110100,"hot": true},
           {"name": "上海","id": 310000,"hot": true},
           {"name": "南京市","id": 320100},
           {"name": "广州","id": 440100,"hot": true},
           {"name": "深圳","id": 440300,"hot": true},
           {"name": "成都","id": 510100},
           {"name": "杭州","id": 330100},
           {"name": "南宁","id": 450100},
           {"name": "大连","id": 210200}];

//写入上次点击保留的城市
info.innerHTML = info.innerHTML = "你选择了：" + getCookie("city");

//插入li节点
for(var i = 0; i < arr.length; i++){
    var li = crtDom("li");
    li.innerHTML = arr[i]["name"];
    li.id = arr[i]["id"];
    if (arr[i]["hot"]){
        li.setAttribute("hot",arr[i]["hot"]);
        li.style.backgroundColor = "#f5f5f5";
    }
    ul.appendChild(li);
}

//获得焦点
inp.onfocus = function () {
    ul.style.display = "block";
};

//隐藏列表
document.documentElement.onclick = function (e) {
    if (e.target.tagName.toLowerCase() !== "li" && e.target.tagName.toLowerCase() !== "input"){
        ul.style.display = "none";
    }
};

//点击列表项获取当前city并插入info
ul.onclick = function (e) {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    info.innerHTML = "你选择了：" + e.target.innerHTML;
    setCookie("city",e.target.innerHTML,now);
};

