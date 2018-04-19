var express = require('express');
var request = require('request');
var Web3 = require("web3");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', {  });
});

router.post('/', function(req, res, next) {
    var data=req.body;
    if (typeof web3 !== 'undefined') 
    {
        web3 = new Web3(web3.currentProvider);
    } 
    else 
    {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }
    // web3.eth.personal.unlockAccount('0xE2871F362639D96493318B5F37e58b0B9cAE386B','wyj787188');
    web3.eth.personal.newAccount(data.password,function(error,result)
    {
        if(error)
        {
            res.send(error);
            return;
        }
        web3.eth.sendTransaction({"from":'0xa37A1CB49128B50AB0F8fc0A5f54715D41E29eEd',"to":result,"value":web3.utils.toWei('1','ether')},function(error, result)
        {
            (error)?console.log(error):console.log(result);
        });
        console.log(data);
        var datajson={"username":data.username,"nickname":data.nickname,"password":data.password,"paddress":result};
        var option=
        {
            url:'http://localhost:81/Users/register',
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
            res.send(body);
        });
    });
});

module.exports = router;