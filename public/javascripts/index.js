var btnLogout=document.querySelector("#logout");
if(btnLogout){
    if(window.addEventListener){
        btnLogout.addEventListener("click",function(){
            debugger;
            ajax.requestWithRespond({
                url:"/logout",
                type:"get",
                isAsyn:true,
                success:function(data,status){
                    debugger;
                    console.log(data);
                    data=JSON.parse(data);
                    if(data.code==200){
                        alert(data.msg);
                        window.location.href="/";
                    }
                },
                error:function(data,status){
                    console.log(data);

                }
            });
        });
    }
}