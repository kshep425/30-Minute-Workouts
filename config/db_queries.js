

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
    },

    update_workout: (id, workout)=>{
        console.log("Update Workout")
        filter = { _id: id }
        return db.Workout.findOneAndUpdate(filter,workout)
    },

    create_workout: (workout) =>
    {
        console.log("Create Workout")
        return db.Workout.create(workout)
    }

}

module.exports = db_queries