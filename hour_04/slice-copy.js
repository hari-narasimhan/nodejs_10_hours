// Slice a buffer
// Slice does not create new memory, it uses the original memory underneath

var buffer = new Buffer ('this is the string in my buffer');
var slice = buffer.slice(10,20);

console.log(slice.toString());


// Copy a buffer
var copy = new Buffer(10);
var targetStart = 0,
    sourceStart = 10,
    sourceEnd = 20;

buffer.copy(copy, targetStart, sourceStart, sourceEnd);

console.log(copy.toString());

// manupulate the slice
slice.write('_-_-_-_-_-');

console.log(buffer.toString());
