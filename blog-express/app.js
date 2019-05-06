//404页面处理
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs=require('fs')
//解析cookie
var cookieParser = require('cookie-parser');
//生成日志
var logger = require('morgan');
//使用session
const session=require('express-session')
//使用redis
const redisStore=require('connect-redis')(session)

//引用路由
const blogRouter=require('./routes/blog.js')
const userRouter=require('./routes/user.js')
//初始化一个app实例
var app = express();

const ENV=process.env.NODE_ENV
if (ENV!=='production') {
  app.use(logger('dev',{

}));
}else {
  const logFileName=path.join(__dirname,'logs','access.log')
  const writeStream=fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(logger('combined',{
    stream:writeStream
  }))
}

//视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev',{

}));
//处理请求post  json格式数据
app.use(express.json());
//处理post 其他格式数据
app.use(express.urlencoded({ extended: false }));
//处理cookie
app.use(cookieParser());
//处理静态资源的路径
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient=require('./db/redis.js')
const sessionStore=new redisStore({
  client:redisClient
})

//处理session
app.use(session({
  secret:'sdsa#f',

  cookie:{
    // path:'/',//默认配置
    // httpOnly:true,//默认配置
    maxAge:24*60*60*1000
  },
  saveUninitialized:false,//是否保存未初始化的会话
  resave:false,//是否允许session重新设置
  store:sessionStore

}))


//设置路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
