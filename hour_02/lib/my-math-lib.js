"use strict";

// var myMath = require('./my-math');


var square = function (n) { return n * n;};
var cube = function(n) {return square(n) * n ;};


// As an EXERCISE, uncomment the require above and use my-math square function
exports.square = square;
exports.cube = cube;
