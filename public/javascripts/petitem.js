require.config(
{
    paths: 
    {
        "pet": "pet",
        "pobject": "pobject",
        'petfeatures': "petfeatures",
        "httprequest": "httprequest",
        "checklogin": "checklogin",
        "bcanvas":"bcanvas"
    }
});
require(['pet','pobject','petfeatures','httprequest','checklogin','bcanvas'],function(pet,pobject,petfeatures,httprequest,checklogin,bcanvas)
{
    if(!checklogin.checklogin())
    {
        location='/login';
    }
    let c=document.getElementById('pet');
    let ctx=c.getContext('2d');
    let talkwords=document.getElementById('talkwords');
    let talksend=document.getElementById('talksend');
    let responeaudio=document.getElementById('responeaudio');
    let features;
    let stime;
    let access_token = localStorage.getItem('access_token');
    let paddress = localStorage.getItem('paddress');
    let petid = document.getElementById('petid').value;
    let bcanvasobj = bcanvas.getBcanvas();
    document.body.appendChild(bcanvasobj.canvas);
    bcanvasobj.init();
    setInterval(function(){bcanvasobj.draw();},200);
    talksend.onclick = function()
    {
        let datajson={"talkwords":talkwords.value,"character":petfeatures.getcharacter(),"voice":petfeatures.getvoice(),"speed":petfeatures.getspeed(),"tone":petfeatures.gettone()};
        httprequest.dorequest
        (
            '/gettalk',
            JSON.stringify(datajson),
            'post',
            function(status,data)
            {
                if(status==-1)
                {
                    alert('网络超时，请重试！');
                }
                else if(status==0)
                {
                    console.log(data);
                    document.getElementById('respone').innerHTML=data.text.results[0].values.text;
                    responeaudio.src=data.audiourl;
                    responeaudio.play();
                }
            },
            2000,
            'application/json',
            'json'
        );
    }
    httprequest.dorequest
    (
        '/user/getpetitem',
        JSON.stringify({"access_token":access_token,"id":petid}),
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
                if(data.result.pet == null)
                {
                    alert('illegal request');
                    history.go(-1);
                }
                let postjsondata = { "paddress": paddress, "petaddr": data.result.pet.addr };
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
                            features = data.pet.features;
                            init();
                            var modal_div = document.getElementsByClassName('modal_div');
                            var sell_btn = document.getElementById('sell_btn');
                            var close_btn = document.getElementById('close_btn');
                            var ok_btn = document.getElementById('ok_btn');
                            var inputpasswd_p = document.getElementById('inputpasswd_p');
                            var pcoinnum_input = document.getElementById('pcoinnum');
                            var password_input = document.getElementById('password');
                            if(parseInt(data.pet.is_onsell) == 1)
                            {
                                sell_btn.innerHTML = '取消出售';
                                inputpasswd_p.innerHTML = '确认取消出售';
                                pcoinnum_input.style.display = 'none';
                                sell_btn.setAttribute('data_is_onsell',0);
                            }                           
                            close_btn.onclick = function()
                            {
                                modal_div.do('hide',sell_btn.getAttribute('data_div_id'));
                            }
                            ok_btn.onclick = function()
                            {
                                var postdata = {"access_token": access_token, "paddress": paddress, "petaddr": data.pet.addr, "password":password_input.value, "pcoinnum":pcoinnum_input.value, "is_onsell":parseInt(sell_btn.getAttribute('data_is_onsell'))};
                                httprequest.dorequest
                                (
                                    '/user/onsellchange',
                                    JSON.stringify(postdata),
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
                                            if(data.code != 0)
                                            {
                                                alert(data.message);
                                            }
                                            else
                                            {
                                                if(parseInt(data.result.is_onsell) == 1)
                                                {
                                                    sell_btn.innerHTML = '取消出售';
                                                    inputpasswd_p.innerHTML = '确认取消出售';
                                                    pcoinnum_input.style.display = 'none';
                                                    sell_btn.setAttribute('data_is_onsell',0);
                                                }
                                                else
                                                {
                                                    sell_btn.innerHTML = '出售';
                                                    inputpasswd_p.innerHTML = '确认出售';
                                                    pcoinnum_input.style.display = 'inline';
                                                    sell_btn.setAttribute('data_is_onsell',1);
                                                } 
                                                password_input.value = '';
                                                modal_div.do('hide',sell_btn.getAttribute('data_div_id'));
                                            }
                                        }
                                    },
                                    2000,
                                    'application/json',
                                    'json'
                                );
                            }
                        }
                    },
                    2000,
                    'application/json',
                    'json'
                );
            }
        },
        2000,
        'application/json',
        'json'
    );
    function init()
    {
        petfeatures.init(features);
        let arr=[{'x':70,'y':120,'scalex':1,'scaley':1,'priority':1,'img':'/images/pet-body'+petfeatures.getbodytype()+'.png'},{'x':70,'y':0,'scalex':1,'scaley':1,'priority':2,'img':'/images/pet-head'+petfeatures.getheadtype()+'.png'},{'x':80,'y':20,'scalex':1,'scaley':1,'priority':3,'img':'/images/pet-mouth'+petfeatures.getmouthtype()+'.png'},{'x':40,'y':0,'scalex':1,'scaley':1,'priority':4,'img':'/images/pet-eye'+petfeatures.geteyetype()+'.png'},{'x':120,'y':0,'scalex':1,'scaley':1,'priority':5,'img':'/images/pet-eye'+petfeatures.geteyetype()+'.png'}];
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
        run();
    }
    function run()
    {
        pet.speak(!!responeaudio.duration && responeaudio.currentTime!=responeaudio.duration);
        pet.blink();
        pet.jump();
        draw();
        stime=window.setTimeout(function(){run();},10);
    }
    function draw()
    {
        ctx.fillStyle="#f0f8ff";
        ctx.fillRect(0,0,c.width,c.height);
        ctx.fillStyle="#000000";
        ctx.save();
        ctx.translate(450,pet.getgroundy()+210);
        ctx.scale(1,0.3);
        ctx.beginPath();
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle="rgba(157, 157, 157, 0.5)";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.translate(pet.getpx(),pet.getpy()); 
        ctx.scale(0.4,0.4);
        pet.getpobjects().forEach(function(v)
        {
            ctx.save();
            ctx.translate(v.getx()-v.getimg().width*0.4,v.gety()-v.getimg().height*0.4);
            ctx.scale(v.getscalex(),v.getscaley());
            ctx.drawImage(v.getimg(),v.getx(),v.gety()+(v.getimg().height*(1-v.getscaley())));
            ctx.restore();
        });
        ctx.restore();
    }
});