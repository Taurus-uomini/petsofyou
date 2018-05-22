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
    let access_token = localStorage.getItem('access_token');
    let paddress = localStorage.getItem('paddress');
    let user_petslist = document.getElementById('user_petslist');
    let datajson={"access_token":access_token};
    let c=document.createElement('canvas');
    c.width = 200;
    c.height = 200;
    let ctx=c.getContext('2d');
    let bcanvasobj = bcanvas.getBcanvas();
    document.body.appendChild(bcanvasobj.canvas);
    bcanvasobj.init();
    setInterval(function(){bcanvasobj.draw();},200);
    httprequest.dorequest
    (
        '/pets/getonsellpets',
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
                else {
                    let pets = data.result.pets;
                    if (pets.length == 0) 
                    {
                        let nopets_p = document.createElement('p');
                        nopets_p.appendChild(document.createTextNode("没有正在出售的宠物:-)"));
                        user_petslist.appendChild(nopets_p);
                    }
                    pets.forEach(function (pet,index) 
                    {
                        let postjsondata = { "petaddr": pet.addr };
                        httprequest.dorequest
                            (
                            '/pets/getpetinfo',
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
                                    drawpet(data.pet.features, petimg, index);
                                    petitem_div.appendChild(petimg);
                                    let item_info_div = document.createElement('div');
                                    item_info_div.className = 'item_info_div';
                                    let prize_p = document.createElement('p');
                                    prize_p.appendChild(document.createTextNode("价格：" + pet.pcoinnum + "pcoin"));
                                    item_info_div.appendChild(prize_p);
                                    let buy_btn = document.createElement('button');
                                    buy_btn.appendChild(document.createTextNode("购买"));
                                    buy_btn.onclick = function () 
                                    {
                                        var postdata = { "access_token": access_token, "paddress": paddress, "petaddr": pet.addr, "petid": pet.id, "pcoinnum": pet.pcoinnum }
                                        httprequest.dorequest
                                            (
                                            '/pets/buypet',
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
                                                        location = '/user';
                                                    }
                                                }
                                            },
                                            2000,
                                            'application/json',
                                            'json'
                                            );
                                    }
                                    item_info_div.appendChild(buy_btn);
                                    petitem_div.appendChild(item_info_div);
                                    user_petslist.appendChild(petitem_div);
                                    // petitem_div.onclick = function () {
                                    //     location = '/user/petitem/' + pet.id;
                                    // }
                                }
                            },
                            2000,
                            'application/json',
                            'json'
                            );
                    });
                } 
            }
        },
        2000,
        'application/json',
        'json'
    );
    function drawpet(features,petimg,index)
    {
        window.setTimeout(function(){init(features,petimg,index);},500*index);
    }
    function init(features,petimg)
    {
        pet.cleanpobjects();
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
        window.setTimeout(function(){draw(petimg);},50);
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