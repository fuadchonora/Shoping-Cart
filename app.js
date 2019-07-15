var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let expressHbs =require('express-handlebars');
let db = require('./dbconfig/db-connect');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');

let indexRouter = require('./routes/index');
// let signupRouter = require('./routes/signup');

var app = express();

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user/signup', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connect(function (err) {
  if(err){
    console.log("Unable to Connect Database");
    process.exit(1);
  }else {
    console.log("Shopping Cart Database Connected");
  }
});

module.exports = app;
