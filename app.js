const express = require('express');
var path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
var hbs = require('hbs');
var dotenv = require('dotenv');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
dotenv.load();

// Set up the express app
const app = express();

//Register Views
hbs.registerPartials(__dirname + 'views');
hbs.registerPartials(__dirname + '/views/partials');

// Log requests to the console.
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// // Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// // Connect Flash
app.use(flash());

// // Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

module.exports = app;
