var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var message = new Buffer('A Datagram Message!!!');
client.send(message,0,message.length,4000, '127.0.0.1', function(err, bytes){
	if(err) throw err;

	console.log('UDP message set to 127.0.0.1:4000');
	client.close(); 
});
