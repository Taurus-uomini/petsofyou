require.config(
{
    paths: 
    {
        "pat": "pat",
        "pobject": "pobject",
        "httprequest": "httprequest"
    }
});
require(['pat','pobject','httprequest'],function(pat,pobject,httprequest)
{
    let c=document.getElementById('pet');
    let ctx=c.getContext('2d');
    let talkwords=document.getElementById('talkwords');
    let talksend=document.getElementById('talksend');
    talksend.onclick = function()
    {
        let text=talkwords.value;
        let datajson={'perception':{'inputText':{'text':text}},'userInfo':{'apiKey':'d06760be821d42d3b6e7492cd0c73856','userId':'231365'}};
        httprequest.dorequest
        (
            'http://openapi.tuling123.com/openapi/api/v2',
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
        let arr=[{'x':70,'y':120,'scalex':1,'scaley':1,'priority':1,'img':'img/pet-body.png'},{'x':70,'y':0,'scalex':1,'scaley':1,'priority':2,'img':'img/pet-head.png'},{'x':80,'y':20,'scalex':1,'scaley':1,'priority':3,'img':'img/pet-mouth.png'},{'x':40,'y':0,'scalex':1,'scaley':1,'priority':4,'img':'img/pet-eye.png'},{'x':120,'y':0,'scalex':1,'scaley':1,'priority':5,'img':'img/pet-eye.png'}];
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
            pat.addpobjects(npobject);
        });
        run();
    }
    function run()
    {
        pat.blink();
        pat.jump();
        draw();
        window.setTimeout(function(){run();},10);
    }
    function draw()
    {
        ctx.fillStyle="#f0f8ff";
        ctx.fillRect(0,0,c.width,c.height);
        ctx.fillStyle="#000000";
        ctx.save();
        ctx.translate(450,pat.getgroundy()+210);
        ctx.scale(1,0.3);
        ctx.beginPath();
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle="rgba(157, 157, 157, 0.5)";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.translate(pat.getpx(),pat.getpy()); 
        ctx.scale(0.4,0.4);
        pat.getpobjects().forEach(function(v)
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