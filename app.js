var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");
var RedisStore=require('connect-redis')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
//使用session
app.set('trust proxy', 1) // trust first proxy
//store表示session存放的地方
app.use(session({
    store: new RedisStore({
      host: "127.0.0.1",
      port: 6379
    }),
    resave:false,
    saveUninitialized:true,
    secret: 'keyboard cat',
    cookie: {maxAge: 100000}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //404 未找到
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
//检测redis模块
app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('oh no')); // handle error
    }
    next(); // otherwise continue
})



module.exports = app;
