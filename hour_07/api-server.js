var restify = require('restify');

function _createUser (req, res, next) {
    var response = req.body;
    response._id = "1234";
    console.log(response);
    res.send(201, response);
    return next();
}

function _queryUser (req, res, next) {
    res.send(201, {_id:"1001"});
    return next();
}

var server = restify.createServer();
// use the body parser
server.use(restify.bodyParser({ mapParams: false })); // mapped in req.body

// Setup routes
server.post('/api/v1/users', _createUser);
server.get('/api/v1/users', _queryUser);

server.listen(3232, function() {
    console.log('%s listening at %s', server.name, server.url);
});