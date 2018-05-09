var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SequenceSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});

var sequences = mongoose.model("sequences", SequenceSchema);

var SurveySchema = new Schema({
    _id: {type: Number},
    gender: String,
    age: Number,
    created_at: Date
});

SurveySchema.pre("save", function(next){
    var self = this;
    sequences.findOneAndUpdate(
        {_id: "survey_count"},
        {$inc: {seq: 1}},
        {upsert: true},
        function(error, result) {
            console.log(result);
            if (error) return next(error);
            self.created_at = new Date();
            self._id = result.seq;
            next();
        }
    )
})

var surveys = mongoose.model("surveys", SurveySchema);

module.exports = surveys;