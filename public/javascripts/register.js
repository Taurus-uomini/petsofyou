require.config(
    {
        paths: 
        {
            "httprequest": "httprequest",
            "bcanvas":"bcanvas"
        }
    });
    require(['httprequest','bcanvas'],function(httprequest,bcanvas)
    {
        let register_btn = document.getElementById('register_btn');
        let bcanvasobj = bcanvas.getBcanvas();
        document.body.appendChild(bcanvasobj.canvas);
        bcanvasobj.init();
        setInterval(function(){bcanvasobj.draw();},200);
        register_btn.onclick = function()
        {
            let register_form = document.getElementById('register_form');
            let username = register_form.username.value;
            let password = register_form.password.value;
            let rpassword = register_form.rpassword.value;
            let nickname = register_form.nickname.value;
            if(username==null||username=='')
            {
                alert('用户名不能为空！');
                register_form.username.focus();
                return;
            }
            if(password==null||password=='')
            {
                alert('密码不能为空！');
                register_form.password.focus();
                return;
            }
            if(nickname==null||nickname=='')
            {
                alert('昵称不能为空！');
                register_form.nickname.focus();
                return;
            }
            if(password!=rpassword)
            {
                alert('两次密码不一致！');
                register_form.rpassword.focus();
                return;
            }
            let formdata = 'username='+username+'&'+'password='+password+'&'+'nickname='+nickname;
            httprequest.dorequest
            (
                '/register',
                formdata,
                'post',
                function (status, data) {
                    if (status == -1) {
                        alert('网络超时，请重试！');
                    }
                    else if (status == 0) {
                        console.log(data);
                        if(data.code == 0)
                        {
                            location='/login';
                        }
                        else
                        {
                            alert(data.message);
                        }
                    }
                },
                2000,
                'application/x-www-form-urlencoded',
                'json'
            );
        }
    });