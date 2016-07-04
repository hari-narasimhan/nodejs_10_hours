'use strict';

var  server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};

handle['/']         = requestHandlers.home;
handle['/home']     = requestHandlers.home;
handle['/upload']   = requestHandlers.upload;
handle['/ls']      = requestHandlers.ls;

server.start(router.route, handle);
