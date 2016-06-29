'use strict';

var global;

exports.setGlobal = function (val) {
  global = val;
};

exports.getGlobal = function () {
  return global;
};
