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


// 获取样式方法
// 标准：getComputedStyle()
// 兼容ie8-：currentStyle
function getStyle(ele,attr){
	// 标准浏览器判断
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr];
	}else if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return ele.style[attr];
	}
}

// getStyle(ele,'font-size')



// 动画函数
/*function animate(ele,attr,target){

	clearInterval(attr + 'timer');
	ele[attr + 'timer'] = setInterval(function(){
		var current = parseFloat(getStyle(ele,attr));

		// 计算速度
		var speed = (target - current)/10;

		// 单位
		var unit = '';

		if(attr === 'opacity'){
			speed = speed.toFixed(2)*1;
		}else{
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			unit = 'px';
		}
		
		if(current == target || speed == 0){
			clearInterval(ele.timer);
			current = target - speed;
		}

		ele.style[attr] = current + speed + unit;
	},50);
}*/

/**
 * [animate description]
 * @ele  执行动画的元素(DOM)
 * @opt  动画改变的属性（Oject）
 * @callback  回调函数(function)，参数可选，所有动画完成后执行的函数
 */
function animate(ele,opt,callback){
	// 给ele添加timerLen属性，用于保存定时器的个数
	ele.timerLen = 0;

	// 遍历属性，为每个属性创建一个定时器
	for(var attr in opt){
		createTimer(attr);
	}

	// 创建定时器函数
	function createTimer(attr){
		// 定时器名字
		var timerName =attr + 'timer';

		ele.timerLen++;

		// 目标值
		var target = opt[attr];

		clearInterval(ele[timerName]);
		ele[timerName] = setInterval(function(){
			var current = getStyle(ele,attr);

			// 提取单位
			var unit = current.match(/[a-z]*$/i)[0];
			current = parseFloat(getStyle(ele,attr));

			// 计算速度
			var speed = (target - current)/10;

			
			if(attr === 'opacity'){
				speed = speed.toFixed(2)*1;
			}else{
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			}
			
			if(current == target || speed == 0){
				clearInterval(ele[timerName]);
				current = target - speed;

				ele.timerLen--;

				// 所有定时器执行后
				if(ele.timerLen === 0 && typeof callback === 'function'){
					callback();
				}
			}

			ele.style[attr] = current + speed + unit;
		},50);
	}
}

/**
 * [ajax description]
 * 
 */
function ajax(opt){
	var xhr;

	// 处理兼容性
	try{
		// 尝试执行这里的代码
		xhr = new XMLHttpRequest();
	}catch(error){
		// 如果有错误，执行这里的代码，并把错误信息保存在error中
		// 并不会在浏览器中抛出错误，也不会中断代码的执行
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(error){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(error){
				alert('你的世界我不懂...');
			}
		}
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){

			// 回调函数的执行
			opt.callback(JSON.parse(xhr.responseText));
		}
	}
	
	xhr.open(opt.type,opt.url,opt.async);
	xhr.send();
}


// ajax({url:'http://baidu.com',type:'get',async:true,callback:function(data){}})
// ajax({url:'..getweather',type:'get',async:true,callback:function(data){
// 	data.forEach(function(item,idx){

// 	})
// }});