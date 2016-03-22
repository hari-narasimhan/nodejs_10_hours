'use strict';

var express = require('express');
var _ = require('lodash');

var router = express.Router({
  mergeParams: true,
});

//var staff = require('../db/staff');
var Staff = require('../models/staff');

// GET /staff
router.get('/', function (req, res) {
  var skills = req.query.skills || '';
  var query = req.query.skills ? { skills: new RegExp(skills, 'i') } : {};

  Staff.find(query, function (err, filteredStaff) {

    if (err) res.status(400).send('Error Occured');

    res.render('staff/list', { staff:filteredStaff });
  });
});

// GET /staff/:fullname
router.get('/:id', function (req, res) {
  var id = req.params.id;
  Staff.findById(id, function (err, s) {
    if (err) res.status(400).send('Error Occurred');
    var gender = s.gender === 'Female' ? 'women' : 'men';
    s.profileUrl = 'http://api.randomuser.me/portraits/' +
    gender +
    '/' + (_.random(1, 100)) + '.jpg';

    res.render('staff/view', { staff:s });
  });

});

// PUT /staff/:fullname
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var skills = req.body.skills;
  Staff.findById(id, function (err, staff) {
    if (err) return res.status(400).send('Error Occurred');
    staff.skills = skills;
    staff.save(function (err, updatedStaff) {
      if (err) res.status(400).send('Error Occurred');
      res.send(updatedStaff);
    });
  });
});

module.exports = router;
