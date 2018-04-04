require.config(
{
    paths: 
    {
        "pet": "pet",
        "pobject": "pobject",
        'petfeatures': "petfeatures",
        "httprequest": "httprequest"
    }
});
require(['pet','pobject','petfeatures','httprequest'],function(pet,pobject,petfeatures,httprequest)
{
    let c=document.getElementById('pet');
    let ctx=c.getContext('2d');
    let talkwords=document.getElementById('talkwords');
    let talksend=document.getElementById('talksend');
    let responeaudio=document.getElementById('responeaudio');
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
        petfeatures.init('00000354');
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
        window.setTimeout(function(){run();},10);
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