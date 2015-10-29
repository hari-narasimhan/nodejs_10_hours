"use strict";

var fs = require('fs');

// Asynchronous
fs.stat('./', function (err, stats) {

	if(err) {
		console.log(err.message);
		return;
	}
	
	console.log(stats);
});


// Synchronous
try {
	var myStat = fs.statSync('./notAvailable.txt');
	console.log(myStat);
}
catch (e) {
	console.log(e); 
}

