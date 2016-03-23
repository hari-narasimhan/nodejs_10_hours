var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var fs = require('fs');
var _ = require('lodash');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var staff = require('./db/staff');
var mongoose = require('mongoose');
var staffRoutes = require('./routes/staff');

passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function (err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

var URI = 'mongodb://localhost:27017/skillTrackerDev';
mongoose.connect(URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function (callback) {
  console.log('Database connected');
});

var User = require('./models/user');
var app = express();
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout:'main' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'MY SECRET KEY',  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

app.get('/signup', function (req, res) {
  res.render('signup', { user: req.user });
});

app.post('/signup', function (req, res) {
  var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

  user.save(function (err) {
    req.logIn(user, function (err) {
      res.redirect('/');
    });
  });
});

app.use('/staff', staffRoutes);

var server = app.listen(3000, function () {
  console.log('server started @ ' + server.address().port);
});
