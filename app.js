var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clubRouter=require('./routes/club');
var clubUserRouter =require('./routes/clubUser');

var app = express();

//报错request entity too large
// var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 读取env需要安装dotenv
// let dotenv=require('dotenv');
// dotenv.config('./env');
// console.log(process.env)
//见bin/www

// app.use(bodyParser.json({limit : '2100000kb'}));
// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser  .urlencoded({limit:'50mb',extended:true}));
// app.use(express.json({limit: '5mb'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/club', clubRouter);
app.use('/clubuser',clubUserRouter);

module.exports = app;
