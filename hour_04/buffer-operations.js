// Write to a buffer

var buf = new Buffer(100);

buf.write('Hello, World!');
buf.write(' John!', 13);


// Reading from buffer
console.log(buf.toString());

// Reading from buffer like an array
console.log(buf[10].toString());


// Check if the buffer is actually a buffer
console.log("Buffer.isBuffer  " + Buffer.isBuffer(buf));

// Check bytelength required to encode
snowman = "☃";
console.log('Snowman length: ' + snowman.length);
console.log('Buffer Required for snowman: ' + Buffer.byteLength(snowman));

// Check the length of the buffer

console.log('Buffer length is ' + buf.length);

