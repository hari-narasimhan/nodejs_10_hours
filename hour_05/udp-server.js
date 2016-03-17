// UDP Server 
var dgram = require('dgram');

var server=dgram.createSocket('udp4'); // can be 'udp6' for ipv6

server.on('message',function ( message,rinfo ){
  console.log('server got message: ' + message + ' from ' + rinfo.address + ':' + rinfo.port);
});

server.on('listening',function(){
    var address = server.address();
    console.log('server listening on ' + address.address + ':' + address.port);
});

server.bind(4000, '127.0.0.1');
