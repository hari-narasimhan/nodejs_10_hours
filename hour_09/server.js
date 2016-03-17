"use strict";

var express     = require('express');
var config      = require('config');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');

var app = express();
var port = config.appConfig.port;

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('common/error', {error:err});
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

// Connect to mongoose
mongoose.connect(config.appConfig.db.url);

// Setup the routes
var router = require('./router')(app);

app.use(errorHandler);

// Start listening for incoming connections
app.listen(port, function(){
   console.log('Hour 09 server started at ' + port); 
});