var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', {  });
});

router.post('/', function(req, res, next) {
    var data = req.body;
    var datajson = { "username": data.username, "password": data.password};
    var option =
        {
            url: 'http://localhost:81/Users/login',
            method: 'POST',
            json: true,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: datajson
        };
    request(option, function (error, response, body) 
    {
        res.send(body);
    });
});

module.exports = router;