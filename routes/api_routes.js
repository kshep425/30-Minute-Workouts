function api_routes(app){

    app.get("/api/workout_names", function(req, res){
        res.json([
            {workout_name: "Default Workout"}
        ])
    })
    
}

module.exports = api_routes