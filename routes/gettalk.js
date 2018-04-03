var express = require('express');
var request = require('request');
var md5 = require('md5');
var router = express.Router();

router.post('/', function(req, res, next) {
  var data=req.body;
  var option=
  {
    url:'http://openapi.tuling123.com/openapi/api/v2',
    method:'POST',
    json:true,
    headers:
    {
      'Content-Type':'application/json'
    },
    body:data
  };
  request(option,function(error, response, body)
  {
    request('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=q2LGl6MLmfhS7DtWsOGvhmFn&client_secret=b0a86371a0d0ff01db177c11c1d0c020',function(e,r,b)
    {
      var result={'text':body,'audiourl':'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid='+md5(req.connection.remoteAddress)+'&tok='+JSON.parse(b).access_token+'&tex='+body.results[0].values.text+'&vol=9&per=3&spd=5&pit=5'};
      res.send(result);
    });
    
  });

});

module.exports = router;
