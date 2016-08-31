
var https = require('https');
var fs = require('fs');

var options = {
  key : fs.readFileSync('./my_private_key.pem'),
  cert : fs.readFileSync('./my_cert.pem')
};

var server = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(4041, function(){
  console.log('HTTPS server started at port 4041');
});
