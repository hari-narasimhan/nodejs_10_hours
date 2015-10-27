"use strict";

var myMath 		= require('./lib/my-math');
var myMathLib 		= require('./lib/my-math-lib');
var myMathLibModule 	= require('./lib/my-math-lib-module');
var Employee 		= require('./models/employee');

console.log('my-math');
console.log(myMath.square(4));
console.log('my-math-lib');
console.log(myMathLib.cube(4));
console.log(myMathLib.square(10));
console.log('my-math-lib-module');
console.log(myMathLibModule.square(3));

console.log('Employee Model');
var emp = new Employee('Jack', 'Peters', 'Engineering');
console.log(emp.print());

