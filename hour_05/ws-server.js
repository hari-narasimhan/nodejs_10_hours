// npm install websocket
// Please note that there are many other websocket implementations example socket.io

var server = require('websocket').server, 
    http = require('http');

var socket = new server({
    httpServer: http.createServer().listen(1337)
});

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        console.log(message.utf8Data);
        connection.sendUTF('Welcome');
        setTimeout(function() {
            connection.sendUTF('Sending message back to the websocket client');
        }, 1000);
    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
}); 
