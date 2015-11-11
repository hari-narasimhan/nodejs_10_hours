"use strict";

var express = require('express');
var router = express.Router();
var moment = require('moment');

var projects = [{_id:'1', name:'First Project', description: 'Description', startdate: moment().toISOString(), endDate:null, team:null}];

router.get('/new', function(req, res){
    res.render('project/new');
});

// POST /projects
router.post('/', function(req, res){
     // TODO - CREATE THE PROJECT HERE
     res.location('/list');
     res.redirect('list')
});

// GET /projects/
router.get('/', function(req, res){
   res.render('project/list', projects); 
});

// GET /projects/:id
router.get('/:id', function(req, res){
   res.render('project/show', {}); 
});

module.exports = router;