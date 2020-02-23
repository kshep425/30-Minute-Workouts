

const db = require("../models")

const db_queries = {
    get_workouts: ()=>{
        console.log("Get Workouts")
        return db.Workout.find({});
        // return db.getCollection('workouts').find({})
        // db.Workout.find({}, function(err, res){
        //     if(err){
        //         console.log(err);
        //         throw err;
        //     }
        //     console.log("Any workouts to print?")
        //     console.log(res)
        //     return res;
        // })
    }
}

module.exports = db_queries