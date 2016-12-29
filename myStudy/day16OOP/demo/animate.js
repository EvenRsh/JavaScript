//  ========== 
//  = create 20161227 = 
//  ========== 
console.log('已调用js');
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



// 获取页面元素
// return 元素/元素列表
// selector:必选
//context:可选
/**
 * [Element description]
 * @param {[type]} selector [description]
 * @param {[type]} context  [description]
 */
function Element(selector, context) {
    this.init(selector, context);
}
Element.prototype.init = function(selector, context) {
    var res;
    context = context || document;
    if (document.querySelectorAll) {
        res = context.querySelectorAll(selector);
    } else {
        //id选择器context
        if (/^#/.test(selector)) {
            res = context.getElementById(selector.slice(1));
        }
        //类选择器
        else if (/^\./.test(selector)) {
            res = context.getElementsByClassName(selector.slice(1));
        }
        //标签
        else {
            res = context.getElementsByTagName(selector);
        }
    }
    if (res.length === 1) {
        res = res[0];
    }
    this.ele = res;
    return this;
};
Element.prototype.css = function(attr, val) {
    var self = this;
    //取值
    if (typeof attr === "string" && val === undefined) {
        return getStyle(this.ele, attr);
    } else {
        //赋值
        if (typeof attr === 'object') {
            for (var key in attr) {
                setStyle(key, attr[key]);
            }
        } else {
            setStyle(attr, val);
        }
    }
    function setStyle(_attr, _val) {
      if (self.ele.length === undefined) {
        self.ele.style[_attr] = _val;
      } else {
        for (var i = 0; i < self.ele.length; i++) {
          self.ele[i].style[_attr] = _val;
        }
      }
    }
    return this;
};
Element.prototype.bind = function(type, fn) {
    if (this.ele.length) {
        for (var i = 0; i < this.ele.length; i++) {
            this.ele[i]['on' + type] = fn;
        }
    } else {
        this.ele['on' + type] = fn;
    }
    return this;
};

function $(selector) {
    return new Element(selector);
}

/*
 * 获取样式方法
 * 标准:getComputedStyle();
 * IE8-:ele.currentStyle;
 * 当对象的属性是一个变量,需要调用该属性时.应该用obj[var];
 *
 */
function getStyle(ele, attr) {
    //标准浏览器判断
    if (window.getComputedStyle) {
        return getComputedStyle(ele)[attr];
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
