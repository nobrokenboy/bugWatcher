/**
 * Created by jessic on 2016/10/17.
 */
//实现与mySQL交互
var mysql=require('mysql');
var $conf=require('../conf/db');
var $util=require('../util/util');
var $sql=require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON方法的简单封装
var jsonWrite=function(res,ret){
    if(typeof ret ==='undefined'){
        res.json({
            code:"1",
            msg:"操作失败"
        });
    }else{
        res.json(ret);
    }
};
module.exports={
    add:function(req,res,next){
        pool.getConnection(function(err,connection){
            console.log(req);
            //获取前台页面传过来的参数,get方式
          /*  var param=req.query||req.params;*/
            //post方式获取参数
            var param=req.body;
            //建立连接，向表中插入值
            connection.query($sql.insert,[param.username,param.phonenum,param.password],function(err,result){
                if(result){
                    result={
                        code:200,
                        type:"register",
                        msg:"注册成功！",
                        userData:result
                    };

                }else{
                    result={
                        code:404,
                        type:"register",
                        msg:"注册失败！",
                        userData:result
                    };
                }

                //以json形式，把操作结果返回给前台页面
                jsonWrite(res,result);
                //释放连接
                connection.release();

            });
        });

    },
    queryLogin:function(req,res,next){
        pool.getConnection(function(err,connection){
            debugger;
            console.log(req);
            //获取前台页面传过来的参数
            /*var param=req.query||req.params;*/
            var param=req.body;
            console.log(param);
            //建立连接，查询表格
            connection.query($sql.queryById,[param.phonenum2,param.password2],function(err,result){
                console.log(err);
                console.log(result);
                if(result.length!=0){
                    result={
                        code:200,
                        type:"login",
                        msg:"登录成功！",
                        userData:result
                    };

                }else{
                    result={
                        code:404,
                        type:"login",
                        msg:"登录失败！",
                        userData:null
                    };
                }
                //以json形式，把操作结果返回给前台页面
                jsonWrite(res,result);
                //释放连接
                connection.release();
            });
        });
    }
};
