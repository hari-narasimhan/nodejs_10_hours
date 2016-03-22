var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var staff = require('./db/staff');
var mongoose = require('mongoose');
var staffRoutes = require('./routes/staff');

var URI = 'mongodb://localhost:27017/skillTrackerDev';
mongoose.connect(URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function (callback) {
  console.log('Database connected');
});

var app = express();
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout:'main' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/staff', staffRoutes);

var server = app.listen(3000, function () {
  console.log('server started @ ' + server.address().port);
});
