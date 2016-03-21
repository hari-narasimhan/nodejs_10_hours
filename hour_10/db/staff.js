'use strict';
var fs = require('fs');
var _ = require('lodash');

var staff = [];

fs.readFile('staff.json', { encoding:'utf8' }, function (err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function (s) {
    s.fullname = _.startCase(s.firstname + ' ' + s.lastname);
    staff.push(s);
  });
});


module.exports = staff;
