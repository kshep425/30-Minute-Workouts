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

};

module.exports = api_routes