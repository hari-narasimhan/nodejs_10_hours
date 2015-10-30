var http=require('http');
var options={
    host: 'localhost', port: 4000,
    path: '/'
};

http.get(options,function(res)
{ 
    console.log('got response: ' + res.statusCode);
    res.on('data', function(body) {
       console.log(body.toString());
    });
}).on('error',function(err){ 
    console.log('got error: ' + err.message)
});
