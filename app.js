var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const announcementsRouter = require('./routes/announcementsRouter');
const jobRouter = require('./routes/jobRouter');
const scholarshipRouter = require('./routes/scholarshipRouter');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/hcc';
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log('Connected correctly to server'),
  (err) => console.log(err)
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    const err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === 'authenticated') {
      return next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/announcements', announcementsRouter);
app.use('/jobs', jobRouter);
app.use('/scholarhips', scholarshipRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
