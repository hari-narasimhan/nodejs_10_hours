"use strict";

var rl = require('readline').createInterface({
  input: require('fs').createReadStream('readme.txt')
});

rl.on('line', function (line) {
    console.log('Line from file:', line);
});

rl.on('close', function () {
    console.log('Closed::The end');
});