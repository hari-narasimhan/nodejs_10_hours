"use strict";

var express = require('express');
var router = express.Router();
var moment = require('moment');
var Project = require('../../models/Project');
var moment = require('moment');

router.get('/new', function(req, res){
    res.render('project/new');
});

// POST /projects
router.post('/', function(req, res, next){
     // TODO - CREATE THE PROJECT HERE
     var project = new Project({
         name : req.body.name,
         description: req.body.description,
         team: req.body.team,
         startDate: moment(req.body.startDate).toDate(),
         endDate: moment(req.body.endDate).toDate()
     });
     project.save(function(err){
        if(err) {
            next(err);
        }
        else {
            res.location('/projects');
            res.redirect('projects');
        }
     });
});

// GET /projects/
router.get('/', function(req, res, next){
   Project.find({}, function(err, projects){
       if (err) {
        next(err);   
       } else {
        res.render('project/list', {projects: projects});     
       }
   })
   
});

// GET /projects/:id
router.get('/:id', function(req, res, next) {
   Project.findById(req.params.id, function (err, project){
        if(err) {
            next(err);
        } else {
            res.render('project/show', {project: project}); 
        }
   });
   
});

module.exports = router;