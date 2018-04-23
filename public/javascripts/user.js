require.config(
    {
        paths:
            {
                "pet": "pet",
                "pobject": "pobject",
                'petfeatures': "petfeatures",
                "httprequest": "httprequest",
                "checklogin": "checklogin"
            }
    });
require(['pet', 'pobject', 'petfeatures', 'httprequest', 'checklogin'], function (pet, pobject, petfeatures, httprequest, checklogin) {
    if(!checklogin.checklogin())
    {
        location='/login';
    }
    let access_token = localStorage.getItem('access_token');
    let paddress = localStorage.getItem('paddress');
    let user_petslist = document.getElementById('user_petslist');
    let datajson={"access_token":access_token};
    let c=document.createElement('canvas');
    c.width = 200;
    c.height = 200;
    let ctx=c.getContext('2d');
    httprequest.dorequest
    (
        '/user/checksignin',
        JSON.stringify(datajson),
        'post',
        function (status, data) 
        {
            if (status == -1) 
            {
                alert('网络超时，请重试！');
            }
            else if (status == 0) 
            {
                if(data.result.hassignin)
                {
                    var signin_btn = document.getElementById('signin_btn');
                    signin_btn.innerHTML = '你今天已签到';
                    signin_btn.onclick = '';
                }
                else
                {
                    var signin_btn = document.getElementById('signin_btn');
                    signin_btn.onclick = function()
                    {
                        httprequest.dorequest
                        (
                            '/user/signin',
                            JSON.stringify(datajson),
                            'post',
                            function (status, data) 
                            {
                                if (status == -1) 
                                {
                                    alert('网络超时，请重试！');
                                }
                                else if (status == 0) 
                                {
                                    var modal_div = document.getElementsByClassName('modal_div');
                                    var signin_btn = document.getElementById('signin_btn');
                                    if(data.code != 0)
                                    {
                                        alert(data.message);
                                    }
                                    else
                                    {
                                        document.getElementById('givepcoin_p').innerHTML = '恭喜你获得'+data.result.gave_pcoin+'pcoin';
                                        var div_id = signin_btn.getAttribute('data_div_id');
                                        modal_div.do('show',div_id);
                                        var okclose_btn = document.getElementById('okclose_btn');
                                        okclose_btn.onclick = function()
                                        {
                                            modal_div.do('hide',div_id);
                                        }
                                    }
                                    signin_btn.innerHTML = '你今天已签到';
                                    signin_btn.onclick = '';
                                }
                            },
                            2000,
                            'application/json',
                            'json'
                        );
                    }
                }
            }
        },
        2000,
        'application/json',
        'json'
    );
    httprequest.dorequest
    (
        '/user/getpetscount',
        JSON.stringify(datajson),
        'post',
        function (status, data) {
            if (status == -1) {
                alert('网络超时，请重试！');
            }
            else if (status == 0) {
                console.log(data);
                if (data.code != 0) {
                    alert(data.message);
                    if (data.code == 1000) {
                        location = '/login';
                    }

                }
                else {
                    if(data.result.petscount == 0)
                    {
                        let nopets_p = document.createElement('p');
                        nopets_p.appendChild(document.createTextNode("你还没有宠物:-)"));
                        let givepet_div = document.createElement('div');
                        let givepet_btn = document.createElement('button');
                        givepet_div.className = 'givepet_div';
                        givepet_btn.id = 'givepet_btn';
                        givepet_btn.innerHTML = '领取宠物';
                        givepet_div.appendChild(givepet_btn);
                        user_petslist.appendChild(nopets_p);
                        user_petslist.appendChild(givepet_div);
                        givepet_btn.onclick = function () 
                        {
                            let paddress = localStorage.getItem('paddress');
                            let datajson = { "access_token": access_token, "paddress": paddress };
                            httprequest.dorequest
                            (
                                '/givepet',
                                JSON.stringify(datajson),
                                'post',
                                function (status, data)
                                {
                                    if (status == -1) 
                                    {
                                        alert('网络超时，请重试！');
                                    }
                                    else if (status == 0) 
                                    {
                                        console.log(data);
                                        if (data.code != 0) 
                                        {
                                            alert(data.message);
                                            if (data.code == 1000) 
                                            {
                                                location = '/login';
                                            }

                                        }
                                        else 
                                        {
                                            if (data.result) 
                                            {
                                                alert('you have already get a pet');
                                            }
                                            else 
                                            {
                                                let petitem_div = document.createElement('div');
                                                petitem_div.className = 'petitem_div';
                                                user_petslist.removeChild(nopets_p);
                                                user_petslist.removeChild(givepet_div);
                                                let petimg = new Image();
                                                drawpet(data.pet.features,petimg);
                                                petitem_div.appendChild(petimg);
                                                user_petslist.appendChild(petitem_div);
                                                petitem_div.onclick = function()
                                                {
                                                    location='/user/petitem/'+data.petid;
                                                }
                                            }
                                        }
                                    }
                                },
                                2000,
                                'application/json',
                                'json'
                            );
                        }
                    }
                    else
                    {
                        datajson={"access_token":access_token};
                        httprequest.dorequest
                        (
                            '/user/getuserpets',
                            JSON.stringify(datajson),
                            'post',
                            function (status, data) 
                            {
                                if (status == -1) 
                                {
                                    alert('网络超时，请重试！');
                                }
                                else if (status == 0) 
                                {
                                    console.log(data);
                                    let pets = data.result.pets;
                                    pets.forEach(function(pet)
                                    {
                                        let postjsondata = {"paddress":paddress,"petaddr":pet.addr};
                                        httprequest.dorequest
                                        (
                                            '/user/getpetinfo',
                                            JSON.stringify(postjsondata),
                                            'post',
                                            function (status, data) 
                                            {
                                                if (status == -1) 
                                                {
                                                    alert('网络超时，请重试！');
                                                }
                                                else if (status == 0) 
                                                {
                                                    let petitem_div = document.createElement('div');
                                                    petitem_div.className = 'petitem_div';
                                                    let petimg = new Image();
                                                    drawpet(data.pet.features,petimg);
                                                    petitem_div.appendChild(petimg);
                                                    user_petslist.appendChild(petitem_div);
                                                    petitem_div.onclick = function()
                                                    {
                                                        location='/user/petitem/'+pet.id;
                                                    }
                                                }
                                            },
                                            2000,
                                            'application/json',
                                            'json'
                                        );
                                    });
                                }
                            },
                            2000,
                            'application/json',
                            'json'
                        );
                    }
                }
            }
        },
        2000,
        'application/json',
        'json'
    );
    function drawpet(features,petimg)
    {
        init(features,petimg);
    }
    function init(features,petimg)
    {
        petfeatures.init(features);
        let arr=[{'x':70,'y':120,'scalex':1,'scaley':1,'priority':1,'img':'images/pet-body'+petfeatures.getbodytype()+'.png'},{'x':70,'y':0,'scalex':1,'scaley':1,'priority':2,'img':'images/pet-head'+petfeatures.getheadtype()+'.png'},{'x':80,'y':20,'scalex':1,'scaley':1,'priority':3,'img':'images/pet-mouth'+petfeatures.getmouthtype()+'.png'},{'x':40,'y':0,'scalex':1,'scaley':1,'priority':4,'img':'images/pet-eye'+petfeatures.geteyetype()+'.png'},{'x':120,'y':0,'scalex':1,'scaley':1,'priority':5,'img':'images/pet-eye'+petfeatures.geteyetype()+'.png'}];
        arr.forEach(function(v)
        {
            let npobject=pobject.createpobject();
            npobject.setx(v.x);
            npobject.sety(v.y);
            npobject.setscalex(v.scalex);
            npobject.setscaley(v.scaley);
            npobject.setpriority(v.priority);
            let img=new Image();
            img.src=v.img;
            npobject.setimg(img);
            pet.addpobjects(npobject);
        });
        window.setTimeout(function(){draw(petimg);},20);
    }
    function draw(petimg)
    {
        ctx.fillStyle="#f0f8ff";
        ctx.fillRect(0,0,c.width,c.height);
        ctx.fillStyle="#000000";
        ctx.save();
        ctx.translate(100,185);
        ctx.scale(1,0.3);
        ctx.beginPath();
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle="rgba(157, 157, 157, 0.5)";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.translate(50,30); 
        ctx.scale(0.3,0.3);
        pet.getpobjects().forEach(function(v)
        {
            ctx.save();
            ctx.translate(v.getx()-v.getimg().width*0.4,v.gety()-v.getimg().height*0.4);
            ctx.scale(v.getscalex(),v.getscaley());
            ctx.drawImage(v.getimg(),v.getx(),v.gety()+(v.getimg().height*(1-v.getscaley())));
            ctx.restore();
        });
        ctx.restore();
        petimg.src = c.toDataURL('image/jpeg');
    }
});