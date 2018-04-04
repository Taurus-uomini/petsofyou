var express = require('express');
var request = require('request');
var md5 = require('md5');
var router = express.Router();
var userInfo=[{"apiKey":"d06760be821d42d3b6e7492cd0c73856","userId":"231365"}];

router.post('/', function(req, res, next) {
  var data=req.body;
  var datajson={"perception":{"inputText":{"text":data.talkwords}},"userInfo":userInfo[data.character]};
  var option=
  {
    url:'http://openapi.tuling123.com/openapi/api/v2',
    method:'POST',
    json:true,
    headers:
    {
      'Content-Type':'application/json'
    },
    body:datajson
  };
  request(option,function(error, response, body)
  {
    request('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=q2LGl6MLmfhS7DtWsOGvhmFn&client_secret=b0a86371a0d0ff01db177c11c1d0c020',function(e,r,b)
    {
      var result={"text":body,"audiourl":"http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid="+md5(req.connection.remoteAddress)+"&tok="+JSON.parse(b).access_token+"&tex="+body.results[0].values.text+"&vol=5&per="+data.voice+"&spd="+data.speed+"&pit="+data.tone};
      res.send(result);
    });
    
  });

});

module.exports = router;
