
"use strict";

// Define the closure
function HelloMaker (name) {

    var message = 'Hi ' + name 	+ 
    	' welcome to Node in 10 hours training!';

	return function sayHello() {
		console.log(message);
	};
}

// Create the closure
var helloJack = new HelloMaker('Jack');

// Use the closure
helloJack();

