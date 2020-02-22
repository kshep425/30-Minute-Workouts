var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var Exercise = require("./exercises")
var { ExerciseSchema } = require("./exercises.js")
var WorkoutSchema = new Schema({
    workoutName: {
        type: String
    },
    // exercise: {
    //     type: Number,
    //     //ref: "Exercise"
    // },
    exercises: {
        type: [ExerciseSchema]
    },
    // exerciseId: {
    //     type: Number
    // },
    // place: {
    //     type: Number
    // }
});

var Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;