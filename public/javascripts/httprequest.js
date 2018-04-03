define(function()
{
    let dorequest = function(url,data,method,callback,timeout=2000,contenttype='application/x-www-form-urlencoded',excepttype='text')
    {
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open(method,url);
        if(method=='post')
        {
            request.setRequestHeader('content-type',contenttype);
            request.send(data);
        }
        else
        {
            request.send();
        }
        let timeend=false;
        let timer=setTimeout(function()
        {
            timeend=true;
            request.abort();
        },timeout);
        request.onreadystatechange = function()
        {
            if(request.readyState == 4 && request.status == 200)
            {
                clearTimeout(timer);
                let result=null;
                if(excepttype == 'text')
                {
                    result=request.responseText;
                }
                else if(excepttype == 'json')
                {
                    result=JSON.parse(request.responseText);
                }
                callback(0,result);
            }
            else if(timeend)
            {
                callback(-1,null);
            }
        }
    }
    return{
        dorequest:dorequest
    }
})