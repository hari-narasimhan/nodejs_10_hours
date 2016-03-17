"use strict";

var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/', require('./routes'));
  app.use('/projects', require('./routes/project'));
};