// touch nonBlockingDemo.js

"use strict";

var fs = require('fs');

fs.readFile('read-nb.txt', 'utf8', function(err, contents) {
	console.log(contents);
});

console.log('Hello there, the file is being read asynchronously');

