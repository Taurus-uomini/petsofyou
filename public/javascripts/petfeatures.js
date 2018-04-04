define(function()
{
    let bodytype;
    let headtype;
    let mouthtype;
    let eyetype;
    let character;
    let voice;
    let speed;
    let tone;
    let init=function(featuresvalue)
    {
        bodytype=parseInt(featuresvalue.substr(0,1),16);
        headtype=parseInt(featuresvalue.substr(1,1),16);
        mouthtype=parseInt(featuresvalue.substr(2,1),16);
        eyetype=parseInt(featuresvalue.substr(3,1),16);
        character=parseInt(featuresvalue.substr(4,1),16);
        voice=parseInt(featuresvalue.substr(5,1),16);
        speed=parseInt(featuresvalue.substr(6,1),16);
        tone=parseInt(featuresvalue.substr(7,1),16);
    }
    let getbodytype=function()
    {
        return bodytype;
    }
    let getheadtype=function()
    {
        return headtype;
    }
    let getmouthtype=function()
    {
        return mouthtype;
    }
    let geteyetype=function()
    {
        return eyetype;
    }
    let getcharacter=function()
    {
        return character;
    }
    let getvoice=function()
    {
        return voice;
    }
    let getspeed=function()
    {
        return speed;
    }
    let gettone=function()
    {
        return tone;
    }
    return{
        init:init,
        getbodytype:getbodytype,
        getheadtype:getheadtype,
        getmouthtype:getmouthtype,
        geteyetype:geteyetype,
        getcharacter:getcharacter,
        getvoice:getvoice,
        getspeed:getspeed,
        gettone:gettone
    }
});