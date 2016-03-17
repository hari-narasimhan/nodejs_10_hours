"use strict";

var http = require("http");
var port = process.env.PORT || 8888;

http.createServer(function (req, res) {
	console.log(req.referrer);
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello, world from nodejs in 10 hours");
	res.end();
}).listen(port);

console.log("HTTP server listening to port :" + port);
