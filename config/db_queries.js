

const db = require("../models")

const db_queries = {
    get_workouts: ()=>{
        console.log("Get Workouts")
        return db.Workout.find({});
    },
    create_exercise: (exercise) => {
        console.log("Create Exercise");
        return db.Exercise.create(exercise)
    }

}

module.exports = db_queries