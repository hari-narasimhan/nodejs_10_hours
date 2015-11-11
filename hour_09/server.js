"use strict";

var express = require("express");

var app = express();
var port = 8080;

app.set('view engine', 'ejs');

var router = require('./router')(app);

app.listen(port, function(){
   console.log('Hour 09 server started at ' + port); 
});