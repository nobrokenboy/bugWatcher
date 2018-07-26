var express = require('express');
var app=express();
var router = express.Router();
var userDao = require('../dao/userDao');
var session=require("express-session");
var redis = require("redis");
var client = redis.createClient(6379,'127.0.0.1');

/* GET home page. */
router.get('/', function(req, res, next) {
    client.hgetall("sessionId", function (err,obj) {
        /*if(obj.hasOwnProperty("user")){
            res.render('index', { title: 'Express',username:obj.user});
        }else{
            res.render('index', { title: 'Express'});
        }*/
        res.render('index', { title: 'Express',username:obj});

    });


/*    res.render('index', { title: 'Express'});*/
   /* var session = req.session;
    session.count = session.count || 0;
    var n = session.count++;
    res.send('hello, session id:' + req.sessionID + ' count:' +n);*/
    /*if(req.session.visit) {
        req.session.visit++;
        res.send('<p>第 ' + req.session.visit + '次来到此页面</p>');
    } else {
        req.session.visit = 1;
        res.send('欢迎第一次来这里');
    }*/
});
//获取登录注册界面
router.get('/loginRegister', function(req, res, next) {
  res.render('loginRegister',{
    title:"欢迎登录注册"
  });

});

//实现登录接口
router.post('/login', function(req, res, next) {
    /*数据测试成功*/
/*    res.send("手机号"+req.body['phonenum2']+",密码"+req.body['password2']);*/
    userDao.queryLogin(req, res, next);
    client.hmset("sessionId",{user:req.body.phonenum2,password:req.body.password2});
});
//实现注册接口
router.post('/register', function(req, res, next) {
  /*res.send("成功了三分之一");*/
 /* res.send("用户名"+req.body['username']+",手机号"+req.body['phonenum']+"，密码"+req.body['password']);*/
  /*以上代码测试成功*/
    userDao.add(req, res, next);

});
//退出登录
router.get('/logout',function(req,res,next){
    /*client.get("sessionId",function(err,response){
       res.send("err:"+err+"response:"+response);
    });*/
 /*   res.send("hello");*/
    /*store.destroy(req.sessionID,function(){
        res.redirect('/');
    });*/
    var result={
        code:200,
        type:"logout",
        msg:"退出成功！"
    };
    client.keys('sessionId', function(err, keys) {
        if(keys.length){
            client.del(keys);
            res.send(result);
        }
       /* res.redirect('/');*/
    });


});
module.exports = router;