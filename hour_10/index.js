var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var staff = require('./db/staff');

// var staffRoutes = require('./routes/staff');

var app = express();
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout:'main' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/help', function (req, res) {
  res.send('You will get help here');
});

app.get('/contact', function (req, res) {
  res.send('contact us page');
});

app.get('/staff', function (req, res) {
  var filteredStaff = staff;

  if (req.query && req.query.skills) {
    filteredStaff = _.filter(staff, function (s) {
      return _.includes(s.skills, req.query.skills);
    });
  }

  res.render('staff/list', { staff:filteredStaff });
});

app.get('/staff/formatted', function (req, res) {
  var fmt = '';
  staff.forEach(function (s) {
    fmt += '<a href="/' + s.fullname + '">' + s.fullname + '</a><br>';
  });

  res.send(fmt);
});

app.get('/staff/:fullname', function (req, res) {
  var fullname = req.params.fullname;
  var s = _.find(staff, { fullname: fullname });
  var gender = s.gender === 'Female' ? 'women' : 'men';
  s.profileUrl = 'http://api.randomuser.me/portraits/' + gender + '/' + (_.random(1, 100)) + '.jpg';
  res.render('staff/view', { staff:s });
});

app.put('/staff/:fullname', function (req, res) {
  var fullname = req.params.fullname;
  var skills = req.body.skills;
  var s = _.find(staff, { fullname: fullname });
  console.log(fullname, skills);
  s.skills = skills;
  res.send(JSON.stringify(s));
});

// app.use('/staff', staffRoutes);

var server = app.listen(3000, function () {
  console.log('server started @ ' + server.address().port);
});
