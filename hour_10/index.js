var express = require('express');
var fs = require("fs");
var _ = require("lodash");


var app = express();
var staff = [];

//app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout.ejs'});
app.use(express.static('public'));

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
  //res.send("Welcome to expressjs tutorials!")
  res.render('index', {message: "welcome to expressjs, tutorials"});
});


app.get('/help', function(req, res){
  res.send('You will get help here');
});

app.get('/contact', function(req, res){
  res.send('contact us page');
});

app.get('/staff', function(req, res) {
  res.send(JSON.stringify(staff));
});

app.get('/staff/formatted', function(req, res){
  var fmt = '';
  staff.forEach(function(s){
    fmt += '<a href="/' + s.fullname + '">' + s.fullname + '</a><br>'
  })
  res.send(fmt);
});

app.get('/:staff', function(req, res) {
    var staff = req.params.staff;
    res.send(staff);
});

var server = app.listen(3000, function(){
  console.log('server started @ ' + server.address().port);
});
