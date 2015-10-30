var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var message = new Buffer('A Datagram Message!!!');
client.bind(4001);
client.send(message,0,message.length,4000, 'localhost');
client.close();
