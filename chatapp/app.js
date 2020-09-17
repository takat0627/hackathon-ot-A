'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemon = require("nodemon");
const routes = require('./routes/index');
// date関連
require('date-utils');


const app = express();

// view engine setup
// habdlebars関連
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({});

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', layoutsDir: 'views', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

// habdlebars関連の関数
// 入力値が偶数かどうかの真偽値を返す
hbs.handlebars.registerHelper('evenNumberChecker', function (num) {
  return num % 2 === 0;
});
// unixtime時間を Dateクラスへ流してそれをformatに従って変換する
hbs.handlebars.registerHelper('unixtimeToDate', function (unixtime, format) {
  return (new Date(unixtime).toFormat(format));
});

/**
 * DBへ保存する際のtimezoneによる時間のずれを戻す
 * 具体的にはJSTで登録したのにUTCとしてDBが認識するのでJST（UTC+9）として表示すると
 * 実際の時間よりもこの+9が逆に邪魔する
 * これを-9時間（マイクロ秒なので1000 * 60 * 60 * 9）戻して修正する
 *  */
hbs.handlebars.registerHelper('timeConverter', function (time, format) {
  let UTC = new Date(time)
  UTC.setTime(UTC.getTime() + 1000 * 60 * 60 * 9)
  return UTC.toFormat(format);
});

// 二つの値が等しいかどうかの真偽値を返す
hbs.handlebars.registerHelper('isEquals', function (value1, value2) {
  return value1 === value2;
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-sessionモジュールを追加
// ページ遷移しても現在ユーザーの情報を保持できるらしい
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

let sessionCheck = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/index');
  }
};

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
