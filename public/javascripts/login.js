require.config(
    {
        paths: 
        {
            "httprequest": "httprequest"
        }
    });
    require(['httprequest'],function(httprequest)
    {
        let login_btn = document.getElementById('login_btn');
        login_btn.onclick = function()
        {
            let login_form = document.getElementById('login_form');
            let username = login_form.username.value;
            let password = login_form.password.value;
            if(username==null||username=='')
            {
                alert('用户名不能为空！');
                login_form.username.focus();
                return;
            }
            if(password==null||password=='')
            {
                alert('密码不能为空！');
                login_form.password.focus();
                return;
            }
            let formdata = 'username='+username+'&'+'password='+password;
            httprequest.dorequest
            (
                '/login',
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
                            localStorage.setItem('username',data.result.username);
                            localStorage.setItem('nickname',data.result.nickname);
                            localStorage.setItem('paddress',data.result.paddress);
                            localStorage.setItem('access_token',data.result.access_token);
                            location='/user';
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