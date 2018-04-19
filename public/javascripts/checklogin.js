define(function()
{
    function isNullOrUndefined(value)
    {
        return value==null||value==NaN||value=='';
    }
    let checklogin=function()
    {
        return !isNullOrUndefined(localStorage.getItem('username'))&&!isNullOrUndefined(localStorage.getItem('nickname'))&&!isNullOrUndefined(localStorage.getItem('paddress'))&&!isNullOrUndefined(localStorage.getItem('access_token'));
    }
    return {
        checklogin:checklogin
    }
});