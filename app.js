var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clubRouter=require('./routes/club');
var clubUserRouter =require('./routes/clubUser');
var activityRouter=require('./routes/activity');
var activityAppRouter=require('./routes/activityApp');
var activityLogRouter=require('./routes/activityLog');
var clubMemberRouter=require('./routes/clubMember');
var activityCommentRouter=require('./routes/activityComment');

var app = express();

//报错request entity too large
// var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// 读取env需要安装dotenv
// let dotenv=require('dotenv');
// dotenv.config('./env');
// console.log(process.env)
//见bin/www

// app.use(bodyParser.json({limit : '2100000kb'}));
// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser  .urlencoded({limit:'50mb',extended:true}));
// app.use(express.json({limit: '5mb'}));

//跨域
app.all('*', function (req, res, next) {
    //Access-Control-Allow-Origin允许的域
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', '*');
    //是Access-Control-Allow-Headers   允许的header类型
    res.header('Access-Control-Allow-Headers', 'x-token, Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    // res.header("Access-Control-Allow-Credentials","true");
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/club', clubRouter);
app.use('/clubuser',clubUserRouter);
app.use('/activity',activityRouter);
app.use('/activitysign',activityAppRouter);
app.use('/activitylog',activityLogRouter);
app.use('/clubmember',clubMemberRouter);
app.use('/logcomment',activityCommentRouter);

module.exports = app;
