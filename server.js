var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var survey_mdoel = require('./model');

mongoose.connect('mongodb://localhost/survey_data').then(()=>{
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not connected to Database Error! ", err);
});
var app = express();

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('hahaha');
})
app.post('/', function (req, res) {
    console.log('데이터 확인', req.body);

    var newSurvey = survey_mdoel({gender: req.body.gender, age:req.body.age});
    newSurvey.save(function(err){
        if(err) console.log(err);
        res.send({'text':'hahaha'});
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

