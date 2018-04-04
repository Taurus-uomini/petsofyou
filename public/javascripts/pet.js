define(function()
{
    let pet_img;
    let blinki=0;
    let blinkr=1;
    let blinksp=0;
    let speaki=0;
    let speakr=1;
    let speaksp=0;
    let px=380;
    let py=170;
    let jumpy=70;
    let jumpn=0;
    let jumpr=-5;
    let groundy=170;
    let pobjects=Array();
    let getpobjects=function()
    {
        return pobjects;
    }
    let getpx=function()
    {
        return px;
    }
    let getpy=function()
    {
        return py;
    }
    let addpobjects=function(object)
    {
        pobjects.push(object);
    }
    let getjumpn=function()
    {
        return jumpn;
    }
    let getgroundy=function()
    {
        return groundy;
    }
    let blink=function()
    {
        if(blinksp==0)
        {
            pobjects[3].setscaley(1-0.25*blinki);
            pobjects[4].setscaley(1-0.25*blinki);
            blinki+=blinkr;
            blinksp=10;
            if(blinki==3)
            {
                blinkr=-1;
            }
            else if(blinki==0)
            {
                blinkr=1;
            }
            if(blinki==1&&blinkr==1)
            {
                let r=Math.random();
                if(r<0.2)
                {
                    blinksp=10;
                }
                else if(r>=0.2&&r<0.5)
                {
                    blinksp=50;
                }
                else
                {
                    blinksp=100;
                }
            }
        }
        else
        {
            --blinksp;
        }
    }
    let jump=function()
    {
        if(jumpn!=0)
        {
            if(py>=groundy)
            {
                jumpr=-5;
                --jumpn;
            }
            else if(py<=jumpy)
            {
                jumpr=5;
            }
            py+=jumpr;
        }
        else
        {
            jumpn=Math.random()>0.999?2:0;
        }
    }
    let speak=function(isspeak)
    {
        if(isspeak)
        {
            if(speaksp==0)
            {
                pobjects[2].setscaley(1-0.25*speaki);
                speaki+=speakr;
                if(speaki==3)
                {
                    speakr=-1;
                }
                else if(speaki==0)
                {
                    speakr=1;
                }
                speaksp=6;
            }
            else
            {
                --speaksp;
            }
        }
        else
        {
            pobjects[2].setscaley(1);
        }
    }
    return {
        getpobjects:getpobjects,
        getpx:getpx,
        getpy:getpy,
        addpobjects:addpobjects,
        getjumpn:getjumpn,
        getgroundy:getgroundy,
        blink:blink,
        speak:speak,
        jump:jump
    }
});