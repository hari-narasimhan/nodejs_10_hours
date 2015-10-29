
// Couple of ways to create buffers

var buffer1 = new Buffer(1024);

var buffer2 = new Buffer ('Hello, Friends!', 'utf-8');

var buffer3 = new Buffer ([8, 6, 7, 5, 3, 0, 9]);

console.log(buffer2);
console.log(buffer2.toString('utf-8'));
console.log(buffer2.toString('base64'));
console.log(buffer2.toString('ascii'));


