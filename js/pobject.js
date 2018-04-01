define(function()
{
    let createpobject = function () 
    {
        let x = 0;
        let y = 0;
        let scalex = 1;
        let scaley = 1;
        let priority = 100;
        let img;
        let setx = function (ix) 
        {
            x = ix;
        }
        let getx = function () 
        {
            return x;
        }
        let sety = function (iy) 
        {
            y = iy;
        }
        let gety = function () 
        {
            return y;
        }
        let setscalex = function (iscalex) 
        {
            scalex = iscalex;
        }
        let getscalex = function () 
        {
            return scalex;
        }
        let setscaley = function (iscaley) 
        {
            scaley = iscaley;
        }
        let getscaley = function () 
        {
            return scaley;
        }
        let setpriority = function (ipriority) 
        {
            priority = ipriority;
        }
        let getpriority = function () 
        {
            return priority;
        }
        let setimg = function (iimg) 
        {
            img = iimg;
        }
        let getimg = function () 
        {
            return img;
        }
        return {
            x: x,
            y: y,
            scalex: scalex,
            scaley: scaley,
            priority: priority,
            img: img,
            setx: setx,
            sety: sety,
            setscalex: setscalex,
            setscaley: setscaley,
            setpriority: setpriority,
            setimg: setimg,
            getx: getx,
            gety: gety,
            getscalex: getscalex,
            getscaley: getscaley,
            getpriority: getpriority,
            getimg: getimg
        }
    }
    return {
        createpobject:createpobject
    }
});