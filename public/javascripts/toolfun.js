window.onload = function()
{
    let modal_div = document.getElementsByClassName('modal_div');
    let modal_button = document.getElementsByClassName('modal_button');
    for(i = 0; i < modal_div.length; ++i)
    {
            modal_div.item(i).onclick = function(event)
            {
                var lx=event.clientX;
                var ly=event.clientY;
                var modal_item_div = null;
                for(j = 0; j < this.children.length; ++j)
                {
                    if(this.children.item(j).className == 'modal_item_div')
                    {
                        modal_item_div = this.children.item(j);
                        break;
                    }
                }
                var mx = parseInt((window.getComputedStyle(modal_item_div))['margin-right']);
                var my = parseInt((window.getComputedStyle(modal_item_div))['margin-top']);
                var mw = parseInt((window.getComputedStyle(modal_item_div))['width']);
                var mh = parseInt((window.getComputedStyle(modal_item_div))['height']);
                if(!(lx>=mx && lx<=(mx+mw) && ly>=my && ly<=(my+mh)))
                {
                    console.log(this.id);
                    modal_div.do('hide',this.id);
                }
            }
    }
    window.onresize = function()
    {
        for(i = 0; i < modal_div.length; ++i)
        {
            modal_div.item(i).style.height = window.innerHeight+'px';
        }
    }
    modal_div.do = function(action,div_id_str)
    {
        var div_id = document.getElementById(div_id_str);
        div_id.style.height = window.innerHeight+'px';
        switch(action)
        {
            case 'show':
                div_id.style.display = 'block';
                break;
            case 'hide':
                div_id.style.display = 'none';
                break;
        }
    }
    for(i = 0; i < modal_button.length; ++i)
    {
        modal_button.item(i).onclick = function()
        {
            var div_id = this.getAttribute('data_div_id');
            modal_div.do('show',div_id);
        }
    }
}