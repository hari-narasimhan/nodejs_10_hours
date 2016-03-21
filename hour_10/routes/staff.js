'use strict';

var express = require('express');
var _ = require('lodash');

var router = express.Router({
  mergeParams: true,
});
var staff = require('../db/staff');

// GET /staff
router.get('/', function (req, res) {
  res.render('staff/list', { staff:staff });
});

// GET /staff/formatted
router.get('/formatted', function (req, res) {
  var fmt = '';
  staff.forEach(function (s) {
    fmt += '<a href="/' + s.fullname + '">' + s.fullname + '</a><br>';
  });

  res.send(fmt);
});

// GET /staff/:fullname
router.get('/:fullname', function (req, res) {
  var fullname = req.params.fullname;
  var s = _.find(staff, { fullname: fullname });
  var gender = s.gender === 'Female' ? 'women' : 'men';
  s.profileUrl = 'http://api.randomuser.me/portraits/' + gender + '/' + (_.random(1, 100)) + '.jpg';
  res.render('staff/view', { staff:s });
});

// PUT /staff/:fullname
router.put('/:fullname', function (req, res) {
  var fullname = req.params.fullname;
  var skills = req.body.skills;
  var s = _.find(staff, { fullname: fullname });
  console.log(fullname, skills);
  s.skills = skills;
  res.send(JSON.stringify(s));
});

module.exports = router;
