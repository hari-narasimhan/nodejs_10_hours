var tls = require('tls'), 
    fs = require('fs'), 
    port = 4040,
    host = 'localhost', 
    options = {
      key : fs.readFileSync('./my_private_key.pem'),
      cert : fs.readFileSync('./my_cert.pem')
    };

// To avoid self signed error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var client=tls.connect(port,host,options,function(){ 
        console.log('connected');
        console.log('authorized: ' + client.authorized); 
        
        client.on('data', function(data) {
            client.write(data); 
            // just send data back to server });
        });
});
