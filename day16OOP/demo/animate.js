//  ========== 
//  = create 20161227 = 
//  ========== 
function animate(ele, opt, callback) {
	//给ele添加timerLen属性,用于记录定时器的个数
	ele.timerLen = 0;

	//遍历属性,为每一个属性创建一个定时器
	for (var attr in opt) {
		createTimer(attr);
	}

	//创建定时器函数
	function createTimer(attr) {
		//定时器的名字(标识)
		var timerName = attr + 'timer';

		ele.timerLen++;
		//目标值
		var target = opt[attr];

		clearInterval(ele[timerName]);
		ele[timerName] = setInterval(function() {
			var current = getStyle(ele, attr);

			//单位
			var unit = current.match(/[a-z]*$/i)[0];
			current = parseFloat(current);

			//计算速度
			var speed = (target - current) / 10;
			if (attr === 'opacity') {
				speed = speed.toFixed(2) * 1;
			} else {
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				unit = 'px';
			}

			//达到目标值
			if (current === target || speed == 0) {
				clearInterval(ele[timerName]);
				current = target - speed;

				//清除一个定时器就减一次
				ele.timerLen--;

				//所有定时器执行完成后
				if (ele.timerLen === 0 && typeof callback === 'function') {
					callback();
					console.log(ele.timerLen);
				}
			}
			ele.style[attr] = current + speed + unit;
		}, 50)
	}
}
function getStyle(ele, attr) {
	//标准浏览器判断
	if (window.getComputedStyle) {
		return getComputedStyle(ele)[attr]
	}
	//IE8-
	else if (ele.currentStyle) {
		return ele.currentStyle[attr];
	}
	//都不符合条件
	else {
		return ele.style[attr];
	}
}