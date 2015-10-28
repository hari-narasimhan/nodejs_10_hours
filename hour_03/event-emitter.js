"use strict";

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Person = function (firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
};

util.inherits(Person, EventEmitter);

// Create an method that emits an event
Person.prototype.sayHello = function () {
    this.emit('greet', {firstname: this.firstname, lastname: this.lastname});
};


// Create an instance of person and say hello

var p = new Person('Peter', 'Parker');

p.on('greet', function (data){
    console.log('Got a greet event from ' + data.firstname); 
});

// Fire the event
p.sayHello();