var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.get('/user/:userId',function (req, res) {
    console.log(req.params.userId + '의 정보를 가져옵니다');
    var user = {
        userId: 100,
        name: 'hoon',
        email: 'hhh0912_gmail.com',
        company: 'aaa'
      };  
    res.send(user);
});

app.get('/user/search', function (req, res) {

    console.log('데이터 확인', req.query.name);

    var users = [{
      userId: 13579,
      name: 'John',
      email: 'yohany_AT_gmail.com',
      company: 'KossLAB'
    }];
  
    res.send({result: users});
  });

app.post('/user', function (req, res) {
    console.log('데이터 확인', req.body);
    res.send({state: 'OK', data: req.body});
});

app.put('/user/:userId', function (req, res) {
    console.log('데이터 수정', req.body);
    res.send({state: 'OK', data: req.body});
});
  
app.delete('/user/:userId', function (req, res) {
    console.log('데이터 삭제', req.body);
    res.send({state: 'OK', data: req.body});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

