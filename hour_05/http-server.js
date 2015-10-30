var util = require('util');
var http = require('http');
var url = require('url');

http.createServer(function(req,res){ 
    res.writeHead(200, {'Content-Type':'application/json'});
    var response = url.parse(req.url, true);
    res.end(util.inspect(response));
}).listen(4000);
