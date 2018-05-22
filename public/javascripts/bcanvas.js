define(function () 
{
    let getBcanvas = function()
    {
        return new bCanvas();
    }
    function bCanvas() 
    {
        this.canvas = document.createElement('canvas');
        this.cxt = this.canvas.getContext('2d');
        this.stars = Array();
        this.timecount;

        this.init = function () 
        {
            this.canvas.width = window.innerWidth - 20;
            this.canvas.height = window.innerHeight - 20;
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = 0;
            this.canvas.style.zIndex = -1;
            this.timecount = 0;
            this.initStar();
        }
        this.getRandom = function (min, mix) 
        {
            return parseInt(Math.random() * (mix - min) + min);
        }

        this.PrefixInteger = function (num, length) 
        {
            return (Array(length).join('0') + num).slice(-length);
        }

        this.initStar = function () 
        {
            this.stars = Array();
            for (i = 0; i < 200; ++i) 
            {
                this.stars.push({ 'x': this.getRandom(1, this.canvas.width), 'y': this.getRandom(1, this.canvas.height), 'op': 0 });
            }
        }

        this.cleanAll = function () 
        {
            this.cxt.fillStyle = '#090723';
            this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.draw = function () 
        {
            this.cleanAll();
            var that = this;
            if (this.timecount > 40) 
            {
                this.timecount = 0;
                this.initStar();
            }
            this.stars.forEach(function (item) 
            {
                console.log(item.op.toString(16));
                that.cxt.beginPath();
                that.cxt.strokeStyle = '#ffffff' + (that.PrefixInteger(item.op.toString(16), 2));
                that.cxt.lineWidth = 1;
                that.cxt.arc(item.x, item.y, 1, 0, 2 * Math.PI);
                that.cxt.fillStyle = '#ffffff' + (that.PrefixInteger(item.op.toString(16), 2));
                that.cxt.fill();
                that.cxt.stroke();
                if (that.timecount > 20) 
                {
                    item.op -= that.getRandom(1, 10);
                }
                else 
                {
                    item.op += that.getRandom(1, 10);
                }
            });
            this.timecount++;
        }
    }
    return{
        getBcanvas:getBcanvas
    }
});