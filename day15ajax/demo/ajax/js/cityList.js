

//  ========== 
//  = create 2016-12-26 = 
//  ========== 
console.log('是否使用了该js');
function ajax(opt) {
	
	//默认值
	var defaults = {
		type:"get",
		async:true
	}
	//如果需要传入type,async
	for (var attr in opt){
		defaults[attr] = opt[attr];
	}
	//重新赋值给opt
	opt = defaults;
	
	//处理参数
	//opt.data{name:'zhangsan',age:18}
	
	if (opt.data) {
		//判断url有没有"?"
		if(opt.url.indexOf('?') == -1){
			opt.url += "?";
		}else{
			opt.url += "&";
		}
		//处理opt.data
		for (var key in opt.data){
			opt.url += key + "=" + opt.data[key] + "&";
		}
		//处理多个参数时最后面的&或?
		opt.url = opt.url.replace(/[&\?]$/,"");
	}
	//进入JOSNP
	if(opt.type === 'jsonp'){
		// 2.创建script标签
		var script = document.createElement('script');
		
		// 1.声明一个全局函数
		var fnName = 'getData' + parseInt(Math.random()*1000000000);
		// 对象的属性是变量,需要用[]
		window[fnName] = function(data){
			opt.callback(data);
			//执行完行数清除请求数据时创建的script标签
			document.head.removeChild(script);
			//同时清除当前的全局函数
			delete window[fnName];
		}
		
		//判断url中是否存在"?";
		if(opt.url.indexOf("?") == -1){
			opt.url += '?callback='+fnName;
		}else{
			opt.url += '&callback='+fnName;
		}
		script.src = opt.url;
		//把script写入页面
		document.head.appendChild(script);
		//进入JSONP就不再执行下面的代码
		return;
	}
	
	// ajax 请求
	var xhr;
	//处理兼容性
	try {
		// 尝试执行这里的代码
		xhr = new XMLHttpRequest();
	} catch (error) {
		// 如果有错误，执行这里的代码，并把错误信息保存在error中
		// 并不会在浏览器中抛出错误，也不会中断代码的执行
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (error) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (error) {
				alert('你的世界我不懂~');
			}
		}
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			//对象调用方法
			//&& 短路操作
			typeof opt.callback === 'function' && opt.callback(JSON.parse(xhr.responseText));
		}
	}
	xhr.open(opt.type, opt.url, opt.async);
	xhr.send();
}

