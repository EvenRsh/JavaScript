//=========  运动的高级封装
/**
 * 
 * @param {Object} 需要移动的元素对象
 * @param {Object} 需要改变的属性和目标值对象
 * @param {Object} 回调函数
 */
function startMove(obj, json, fn) {
	//关闭之前的定时器
	clearInterval(obj.timer);

	//再开启新的定时器
	obj.timer = setInterval(function() {
		//表示所有的属性都到达了目标值，可以停止运动了
		var bStop = true;

		for(var attr in json) {
			//attr是属性名

			var iTarget = json[attr]; //目标值

			//1.获取当前值
			var current = 0;

			if(attr == "opacity") { //透明度
				current = parseFloat(getStyleAttribute(obj, attr)) * 100;
				current = Math.round(current);

			} else { //left,top,width,height
				current = parseFloat(getStyleAttribute(obj, attr));
				current = Math.round(current);
			}

			//2.给一个速度
			var iSpeed = (iTarget - current) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			//3.临界值判断,保证所有的动画都执行完再关闭定时器
			if(current != iTarget) {
				bStop = false;

			}

			//4.运动
			if(attr == "opacity") { //透明度
				obj.style.opacity = (current + iSpeed) / 100;
				obj.style.filter = "alpha(opacity=" + (current + iSpeed) + ")";

			} else {
				obj.style[attr] = current + iSpeed + "px";
			}

		}

		//判断下是不是所有的属性都到达了目标值
		if(bStop) {
			//清除定时器
			clearInterval(obj.timer);

			//判断是否传回调函数
			if(fn) {
				fn();
			}
		}

	}, 30);

}

//				//=======  封装 ----> 缓冲运动
//				function startMove(obj,attr,iTarget,fn){
//					//避免出现多次点击的bug，先清除旧的定时器
//					clearInterval(obj.timer);
//					//设置新的定时器
//					obj.timer = setInterval(function(){
//						//1、获取当前值
//						var current = parseFloat(getStyleAttribute(obj,attr));
//						//判断attr是否为透明度
//						current = attr == "opacity" ? Math.round(100 * current) : Math.round(current);
//						
//						//2、设置速度，速度是变化的
//						var iSpeed = (iTarget - current) / 20;
//						//控制速度的最小值不小于1的绝对值
//						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//						
//						//判断临界值
//						if(current == iTarget){
//							//清除定时器
//							clearInterval(obj.timer);
//							//判断是否有函数参数,有函数参数要在return之前回调
//							if(fn){
//								fn();
//							}
//							return;
//						}
//						
//						//运动
//						//判断attr是否是opacity
//						if(attr == "opacity"){
//							obj.style.opacity = (current + iSpeed) / 100;
//							obj.style.filter = "alpha(opacity="+ (current + iSpeed) +")"
//						}else{
//							obj.style[attr] = current + iSpeed + "px";
//						}
//						
//					},30);
//				}
//				

//=======  获取css属性
/*
 * 参数1：要改变参数值的对象
 * 参数2  要改变的属性值
 */
function getStyleAttribute(obj, attr) {
	//判断是否是ie9+，谷歌，或者火狐
	if(window.getComputedStyle) { //是
		return window.getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle(attr);
}