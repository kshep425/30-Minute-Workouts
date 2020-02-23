const db_queries = require("../config/db_queries");
function api_routes(app) {

    app.get("/api/workout_names", function (req, res) {
        console.log('Get Workouts')
        // const workouts =[{_id: 1, workoutName: "Test Workout"}]
        // res.json(workouts)
        db_queries.get_workouts()
        .then((workouts)=>{
            console.log(workouts)
            res.json(workouts);
        })
        .catch((err)=>{
            console.log(err);
        });
    });

    app.post("/api/exercise", function (req, res) {
        console.log("Create new exercise")
        console.log(req.body)
        db_queries.create_exercise(req.body)
        .then((result)=>{
            console.log(result)
            res.json(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    app.get("/api/exercises", function(req, res){
        db_queries.get_exercises()
        .then((exercises)=>{
            console.log(exercises);
            res.json(exercises);
        })
        .catch((err)=>{
            console.log(err);
        });
    })

    app.patch("/api/workout/:id", function(req,res){
        db_queries.update_workout(req.params.id, req.body)
        .then((workout)=>{
            console.log(workout);
            res.json(workout);
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    app.post("/api/workout", function (req, res){
        db_queries.create_workout(req.body)
        .then((workout)=>{
            console.log(workout)
            res.json(workout);
        })
        .catch((err)=>{
            console.log(err)
        })
    })

};

module.exports = api_routes