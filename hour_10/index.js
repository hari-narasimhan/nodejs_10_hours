var express = require('express');
var fs = require("fs");
var _ = require("lodash");
var exphbs = require('express-handlebars');


var app = express();
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout:'main'}));
app.set('view engine', '.hbs');
app.use(express.static('public'));

var staff = [];

fs.readFile('staff.json', {encoding:'utf8'},function (err, data){
  if(err) throw err;
  JSON.parse(data).forEach(function(s){
    s.fullname = _.startCase(s.firstname + ' ' + s.lastname);
    staff.push(s);
  });
});

// app.use?
app.get('/*', function(req, res, next){
    console.log("contains en");
    next();
});

app.get('/', function(req, res){
  res.render('index');
});


app.get('/help', function(req, res){
  res.send('You will get help here');
});

app.get('/contact', function(req, res){
  res.send('contact us page');
});

app.get('/staff', function(req, res) {
  res.render('staff/list', {staff:staff});
});

app.get('/staff/formatted', function(req, res){
  var fmt = '';
  staff.forEach(function(s){
    fmt += '<a href="/' + s.fullname + '">' + s.fullname + '</a><br>'
  })
  res.send(fmt);
});

app.get('/staff/:fullname', function(req, res) {
    var fullname = req.params.fullname;
    var s = _.find(staff, {fullname: fullname});
    var gender = s.gender === 'Female' ? 'women' : 'men';
    s.profileUrl = 'http://api.randomuser.me/portraits/' + gender+ '/' + (_.random(1,100)) + '.jpg'
    res.render('staff/view', {staff:s});
});

var server = app.listen(3000, function(){
  console.log('server started @ ' + server.address().port);
});
