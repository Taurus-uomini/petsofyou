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
require(['pet','pobject','petfeatures','httprequest','checklogin'],function(pet,pobject,petfeatures,httprequest,checklogin)
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
    let givepet_btn=document.getElementById('givepet_btn');
    let features='11110354';
    let stime;
    givepet_btn.onclick = function()
    {
        let access_token = localStorage.getItem('access_token');
        let paddress = localStorage.getItem('paddress');
        let datajson={"access_token":access_token,"paddress":paddress};
        httprequest.dorequest
        (
            '/givepet',
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
                    if(data.code != 0)
                    {
                        alert(data.message);
                        if(data.code == 1000)
                        {
                            location='/login';
                        }
                        
                    }
                    else
                    {
                        if(data.result)
                        {
                            alert('you have already get a pet');
                        }
                        else
                        {
                            features = data.pet.features;
                            clearTimeout(stime);
                            pet.cleanpobjects();
                            init();
                        }
                    }
                }
            },
            2000,
            'application/json',
            'json'
        );
    }
    talksend.onclick = function()
    {
        let datajson={"talkwords":talkwords.value,"character":petfeatures.getcharacter(),"voice":petfeatures.getvoice(),"speed":petfeatures.getspeed(),"tone":petfeatures.gettone()};
        httprequest.dorequest
        (
            // 'http://openapi.tuling123.com/openapi/api/v2',
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
    init();
    function init()
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