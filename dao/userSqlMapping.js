/**
 * Created by jessic on 2016/10/17.
 */
//用来操作数据库，实现CRUD
var user={
    insert:'INSERT INTO user(username,phonenum,password) VALUES(?,?,?)',
    update:'update user set username=?, phonenum=?, password=? where id=? ',
    delete:'detele from user where id=?',
    queryById:'select * from user where phonenum=? and password=?',
    queryAll:'select * from user'
};

module.exports=user;
