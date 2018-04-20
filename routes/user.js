var express = require('express');
var request = require('request');
var Web3 = require("web3");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('user', {});
});

router.get('/petitem/:id?', function (req, res, next) {
    res.render('petitem', {'id':req.params.id});
});

router.post('/getpetscount', function (req, res, next) {
    var data = req.body;
    var datajson = { "access_token": data.access_token };
    var option =
        {
            url: 'http://localhost:81/Users/havepetscount',
            method: 'POST',
            json: true,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: datajson
        };
    request(option, function (error, response, body) {
        res.send(body);
    });
});

router.post('/getuserpets', function (req, res, next) {
    var data = req.body;
    var datajson = { "access_token": data.access_token };
    var option =
        {
            url: 'http://localhost:81/Users/getuserpets',
            method: 'POST',
            json: true,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: datajson
        };
    request(option, function (error, response, body) {
        res.send(body);
    });
});
router.post('/getpetitem', function (req, res, next) {
    var data = req.body;
    var datajson = { "access_token": data.access_token, "id": data.id};
    var option =
        {
            url: 'http://localhost:81/Users/getuserpetitem',
            method: 'POST',
            json: true,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: datajson
        };
    request(option, function (error, response, body) {
        res.send(body);
    });
});
router.post('/getpetinfo', function (req, res, next) {
    var data = req.body;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }
    var address = '0x527e4ad029db0fbf13be40fe85526781500fee1d';
    var account_one = '0xa37A1CB49128B50AB0F8fc0A5f54715D41E29eEd';
    var abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "creater",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "userpets",
            "outputs": [
                {
                    "name": "addr",
                    "type": "bytes32"
                },
                {
                    "name": "features",
                    "type": "string"
                },
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "createtime",
                    "type": "uint64"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "MAX_PETS",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "pets",
            "outputs": [
                {
                    "name": "addr",
                    "type": "bytes32"
                },
                {
                    "name": "features",
                    "type": "string"
                },
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "createtime",
                    "type": "uint64"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "maxpets",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "touser",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "petaddr",
                    "type": "bytes32"
                }
            ],
            "name": "GivePets",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "fromuser",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "touser",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "petaddr",
                    "type": "bytes32"
                }
            ],
            "name": "Transaction",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "touser",
                    "type": "address"
                }
            ],
            "name": "givepets",
            "outputs": [
                {
                    "name": "success",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "petaddr",
                    "type": "bytes32"
                }
            ],
            "name": "transaction",
            "outputs": [
                {
                    "name": "success",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    var MyContract = new web3.eth.Contract(abi, address);
    MyContract.methods.userpets(data.paddress, data.petaddr).call({ "from": data.paddress }, function (error, result) 
    {
        if (error) 
        {
            console.log(error);
        }
        else 
        {
            res.send({ "code": 0, "message": "success", "pet": result });
        }
    });
});

module.exports = router;