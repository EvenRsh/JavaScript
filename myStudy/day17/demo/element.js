/**
 * 1.0.0 by 12-29
 */
console.log('是否使用了该js');
// 获取页面元素
// return 元素/元素列表
// selector:必选
//context:可选

// 获取页面元素
// return 元素/元素列表
// selector:必选
//context:可选
/**
 * [Element description]
 * @param {[type]} selector [description]
 * @param {[type]} context  [description]
 */
function Element(selector,context){
  this.init(selector,context);
}
Element.prototype.init = function(selector,context){
  var res;
  context = context || document;
  if (document.querySelectorAll) {
    res = context.querySelectorAll(selector);
  } else {
    //id选择器context
    if(/^#/.test(selector)){
      res = context.getElementById(selector.slice(1));
    }
    //类选择器
    else if(/^\./.test(selector)){
      res = context.getElementsByClassName(selector.slice(1));
    }
    //标签
    else{
      res = context.getElementsByTagName(selector);
    }
  }
  if(res.length === 1){
    res = res[0];
  }
  this.ele = res;
	return this;
};
Element.prototype.css = function(attr,val){
  var self = this;
  //取值
  if(typeof attr === 'string' &&arguments === undefined){
    return getStyle(this.ele,attr);
  }else{
    //赋值
    if(typeof attr === 'object'){
      for (var key in attr) {
        setStyle(key,attr[key]);
      }
    }else{
      setStyle(attr,val);
    }
  }
  function setStyle(_attr,_val){
    if(self.ele.length === undefined){
      self.ele.style[_attr] = _val;
    }else{
      for (var i = 0; i < self.ele.length; i++) {
        self.ele[i].style[_attr] = _val;
      }
    }
  }
	return this;
};
Element.prototype.bind = function(type,fn){
  if(this.ele.length){
    for(var i=0; i<this.ele.length;i++){
      this.ele[i]['on' + type] =fn;
    }
  }else{
    this.ele['on' + type] =fn;
  }
  return this;
};

function $(selector){
  return new Element(selector);
}

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
