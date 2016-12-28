//  ========== 
//  = create 2016-12-27 = 
//  ========== 
//
//封装随机数
function randomNum(min,max){
	return parseInt(Math.random()*(max - min + 1) + min);
}
//封装随机颜色
function randomColor() {
	var str = '0123456789abcdef';
	var color = "#";
	for (var i = 0; i < 6; i++) {
		var idx = parseInt(Math.random() * str.length);
		color += str[idx];
	}
	return color;
}