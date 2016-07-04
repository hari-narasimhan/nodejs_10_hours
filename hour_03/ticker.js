'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Ticker = function (limit) {
    var _this = this;

    this.limit = limit || 10;
    this.counter = 0;

    setInterval(function () {
        _this.emit('tick');
        _this.counter += 1;

        if (_this.counter === _this.limit) {
          console.log('limit reached -- removing event listener');
          _this.emit('limit');
        }

      }, 1000);
  };

util.inherits(Ticker, EventEmitter);

var ticker = new Ticker();

var tickListener = function () {
  console.log('TICK');
};

ticker.on('tick', tickListener);

ticker.on('limit', function () {
    ticker.removeListener('tick', tickListener);
    ticker.removeAllListeners('limit');
  });

// As an exercise, remove the event listener after 100 ticks
