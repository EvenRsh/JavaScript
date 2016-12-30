// 'use strict'

var a = 100;

function sum(x,y){
	'use strict'
	b = 20;
	return a + b;
}

// sum();

function test(){
	console.log(arguments.callee);

	// 对当前函数的引用，一般用于递归调用
	arguments.callee
}

test(1,2,5);