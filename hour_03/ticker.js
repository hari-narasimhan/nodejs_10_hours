"use strict";

var util = require('util'),

EventEmitter = require('events').EventEmitter;

var Ticker = function(limit){ 
    var self = this; 
    
    this.limit = limit || 10;
    this.counter = 0;

    setInterval(function() {
        self.emit('tick');
        self.counter += 1;

        if(self.counter === self.limit) {
            console.log('limit reached -- removing event listener');
            self.emit('limit');
        }

    }, 1000);
};

util.inherits(Ticker,EventEmitter)

var ticker = new Ticker(); 

var tickListener = function(){
  console.log('TICK');
};

ticker.on('tick',tickListener);

ticker.on('limit', function(){
    ticker.removeListener('tick', tickListener);
    ticker.removeAllListeners('limit');
})

// As an exercise, remove the event listener after 100 ticks