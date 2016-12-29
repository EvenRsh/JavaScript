// 封装随机背景色
function randomColor(){
	var str = '0123456789abcdef';

	var color = '#';
	for(var i=0;i<6;i++){
		var idx = parseInt(Math.random()*str.length);//0-15
		color += str[idx]
	}

	return color;
}

/**
 * 事件绑定函数
 * 兼容ie浏览器
 * @ele：绑定事件的元素
 * @type：事件类型
 * @handler：事件处理函数
 * @capture：是否捕获
 */
function bind(ele,type,handler,capture){
	// 标准写法
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}else if(ele.attachEvent){
		// ie8-
		ele.attachEvent('on' + type,handler);
	}else{
		ele['on' + type] = handler;
	}
}
// bind(元素,事件名,事件处理函数,捕获)
// bind(box,'click',function(){})



// 封装cookie的操作方法
// 1、设置：setCookie(name,val,expires,path);
// 2、获取：getCookie(name)
// 3、删除：removeCookie(name);

function setCookie(name,val,expires,path){
	var cookie = name + '=' + val;

	// 如果有有效期
	if(expires){
		cookie +=';expires=' + expires;
	}

	// 如果有路径
	if(path){
		cookie +=';path=' + path;
	}

	document.cookie = cookie;
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

//getCookie('carlist');


function removeCookie(name){
	var now = new Date();
	now.setDate(now.getDate()-7);
	// document.cookie = name + '=xx;expires=' + now;
	setCookie(name,'xx',now);
}

// removeCookie('carlist')