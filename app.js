var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var exSession = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');
var app = express();

// view engine setup
//app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(exSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('inside serializeuser method'+JSON.stringify(user));
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log('inside deserialize user method');
  done(null, id);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('in the local strategy');
      if (username === password) {
        console.log(' : '+username + ' - and password : ' + password + ' in the if statement');
        done(null, username);
      } else{
        done(null, null);
      }
    }
));



app.use('/', routes);
app.use('/users', users);

app.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

app.post('/login', passport.authenticate('local', { successRedirect: '/index',failureRedirect: '/fail', failureFlash: true }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
