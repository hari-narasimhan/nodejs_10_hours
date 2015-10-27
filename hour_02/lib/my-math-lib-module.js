"use strict";

var square = function (n) { return n*n;};
var cube = function(n) {return square(n) * n;};

module.exports = {
    square:square,
    cube: cube
};

