/**
 * Created by jessic on 2016/10/18.
 */
module.exports={
    extend:function(target,source,flag){
        for(var key in source){
            if(source.hasOwnProperty(key)){
                flag?
                    (target[key]=source[key]):
                    (target[key]===void 0&&(target[key]=source[key]));
            }
        }
        return target;
    },
    authorize:function(req,res,next){
        if (!req.session.user_id) {
            res.redirect('/loginRegister');
        } else {
            next();
        }
    }
};