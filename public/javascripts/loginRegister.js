/**
 * Created by jessic on 2016/10/19.
 */
//获取切换的按钮
var btnLinkLogin=document.querySelector(".link-login");
var btnLinkRegister=document.querySelector(".link-register");
var btnGoResister=document.querySelector(".btn-go-register");
//获取滑块
var slideBlock=document.querySelector(".slide-block");
//获取登录界面
var loginForm=document.getElementById("login");
//获取注册界面
var registerForm=document.getElementById("register");
//获取登录按钮
var loginBtn=document.querySelector(".btn-login");
//获取注册按钮
var registerBtn=document.querySelector(".btn-register");

/*切换登录注册模块效果*/
if(window.addEventListener){
    btnLinkLogin.addEventListener("click",function(e){
        var self=this;
        util.removeClass(slideBlock,"active");
        util.addClass(self,"select");
        util.removeClass(btnLinkRegister,"select");
        //界面处理
        loginForm.style.display="block";
        registerForm.style.display="none";
    });
    btnLinkRegister.addEventListener("click",function(e){
        var self=this;
        util.addClass(slideBlock,"active");
        util.addClass(self,"select");
        util.removeClass(btnLinkLogin,"select");
        //界面处理
        registerForm.style.display="block";
        loginForm.style.display="none";

    });
    btnLinkRegister.addEventListener("click",function(e){
        var self=this;
        util.addClass(slideBlock,"active");
        util.addClass(self,"select");
        util.removeClass(btnLinkLogin,"select");
        //界面处理
        registerForm.style.display="block";
        loginForm.style.display="none";

    });
    btnGoResister.addEventListener("click", function () {
        var self=this;
        util.addClass(slideBlock,"active");
        util.addClass(btnLinkRegister,"select");
        util.removeClass(btnLinkLogin,"select");
        //界面处理
        registerForm.style.display="block";
        loginForm.style.display="none";

    });

    //实现登陆
    loginBtn.addEventListener("click", function () {
        debugger;
        //获取注册要发送的数据
        var loginData={
            phonenum2:document.getElementById("mobileNum").value,
            password2:document.getElementById("password").value
        };
        //@param url,type,isAsync,data
        ajax.requestWithRespond({
            url:"/login",
            type:"post",
            isAsyn:true,
            data:loginData,
            success:function(data,status){
                debugger;
                console.log(data);
                data=JSON.parse(data);
                if(data.code==200){
                    debugger;
                    alert(data.msg);
                    window.location.href="/";
                }else{
                    alert(data.msg);
                }
            },
            error:function(data,status){
                console.log(data);

            }
        });


    });
    //实现注册
    registerBtn.addEventListener("click", function () {
        debugger;
        //获取注册要发送的数据
        var regData={
            username:document.getElementById("userName").value,
            phonenum:document.getElementById("phoneNum").value,
            password:document.getElementById("comfirmPw").value
         };
        //@param url,type,isAsync,data
        ajax.requestWithRespond({
            url:"/register",
            type:"post",
            isAsyn:true,
            data:regData,
            success:function(data,status){
                console.log(data);
                data=JSON.parse(data);
                alert(data.msg);
            },
            error:function(data,status){
                console.log(data);

            }
        });


    });
}

