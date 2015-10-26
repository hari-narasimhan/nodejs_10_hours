
"use strict";


function sayHello (message) {
    console.log(message);
}


function createMessage(name) {
       return "Hi " + name + " welcome to Node in 10 hours training!";
}

var message = createMessage('Jack');

sayHello(message);

