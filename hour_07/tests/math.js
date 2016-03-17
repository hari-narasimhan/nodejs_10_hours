// npm install should
require('should');
var assert = require('assert');

var math = require('../lib/math');

describe("Math Lib - Sum", function() {

    it("Should be able to sum 0 and 10", function(){
        math.sum(0,10).should.equal(10);
    });

    it("Should throw an error", function(){
        assert.throws (
            function() {
                //math.sum(1, 2)
                throw new Error('I am an error');
            }, Error

        );
    });
});
