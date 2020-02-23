var mongoose = require("mongoose");
var Schema = mongoose.Schema
var ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        len: [1, 300]
    },
    url: {
        type: String
    },
    category: {
        type: String
    },
    level: {
        type: String
    },
    sets: {
        type: Number,
        defaultValue: 3
    },
    reps: {
        type: Number,
        defaultValue: 5
    },
    easy_interval_time: {
        type: Number,
        defaultValue: 5
    },
    medium_interval_time: {
        type: Number,
        defaultValue: 10
    },
    hard_interval_time: {
        type: Number,
        defaultValue: 15
    },
    rest: {
        type: Number,
        defaultValue: 30
    },
    switch: {
        type: Number,
        defaultValue: 0
    },
    place: {
        type: Number,
        defaultValue: 0
    }
})
var Exercise = mongoose.model("Exercise", ExerciseSchema)
module.exports = { Exercise, ExerciseSchema };
