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

        survey_mdoel.find({}, 'gender age', function(err, result){
            if(err) console.log(err);
            
            age_arr = [0, 0, 0, 0];            
            man_count = 0;
            woman_count = 0;

            result.forEach(function(doc){
                if (doc.age >=0 && doc.age < 10)
                    age_arr[0]++;
                else if(doc.age < 20)
                    age_arr[1]++;
                else if(doc.age < 30)
                    age_arr[2]++;
                else
                    age_arr[3]++;

                if(doc.gender == "Man")
                    man_count++;
                else
                    woman_count++;
            });

            age_info = {};
            age_info.chartName = "bar";
            age_info.data = [ 
                {"label":"0 ~ 9" , "value":age_arr[0]}, 
                {"label":"10 ~ 19" , "value":age_arr[1]}, 
                {"label":"20 ~ 29" , "value":age_arr[2]}, 
                {"label":"30 ~ " , "value":age_arr[3]} 
            ];

            gender_info = {};
            gender_info.chartName = "Donught";
            gender_info.data = [
                {"label":"Man", "value":man_count},
                {"label":"Woman", "value":woman_count}
            ];

            result_infos = [age_info, gender_info];
            res.send(result_infos);
        })
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

