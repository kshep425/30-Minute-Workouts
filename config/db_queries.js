

const db = require("../models")

const db_queries = {
    get_workouts: ()=>{
        console.log("Get Workouts")
        return db.Workout.find({});
    },

    create_exercise: (exercise) => {
        console.log("Create Exercise");
        return db.Exercise.create(exercise)
    },

    get_exercises: ()=>{
        console.log("Get Exercises")
        return db.Exercise.find()
    }

}

module.exports = db_queries