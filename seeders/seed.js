let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

var ExerciseSeed = [{
    name: "Jog in Place",
    description: "Switch lifting your legs up and down like you are jogging.",
    url: "./assets/Images/gifs/jog_in_place.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "High Knees",
    description: "Raise right leg to hip while left foot is on the ground and alternate at medium tempo.",
    url: "./assets/Images/gifs/high_knees.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Lateral Slide",
    description: "Get in a squat position and step laterally with the left foot and push with the right foot staying in the squat position and then alternate stepping with the right foot and pushing off with the left.",
    url: "./assets/Images/gifs/lateral_slides.GIF",
    Category: "warmup",
    level: "easy"
},
{
    name: "Body Squats",
    description: "Feet are shoulder width apart as you squat down to 90 degrees then explode up squeezing your glutes.",
    url: "./assets/Images/gifs/body_squats.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Squat Jumps",
    description: "Squat down to 90 degrees and explode up with you arms reaching for the ceiling",
    url: "./assets/Images/gifs/squat_jumps.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "One Leg Jumps",
    description: "Standing on your left leg only, do quick jumps and then switch to your right leg",
    url: "./assets/Images/gifs/one_leg_jumps.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Butt Kicks",
    description: "Jogging in place attempt to kick your but with each lift of the right and left leg",
    url: "./assets/Images/gifs/butt_kicks.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Feet Chop",
    description: "Standing in place knees slightly bent start one foot slightly off the ground and quickly alternate chopping the feet",
    url: "./assets/Images/gifs/feet_chop.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Power Skips",
    description: "Jump as high as you can driving your right knee into your chest and then alternate legs",
    url: "./assets/Images/gifs/power_skips.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Pause Squats",
    description: "Squat to 90 degrees and hold.",
    url: "./assets/Images/gifs/pause_squats.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Split Jumps",
    description: "Get in a lunge position and jump up and alternate between your left and right leg.",
    url: "./assets/Images/gifs/split_jumps.GIF",
    category: "warmup",
    level: "easy"
},
{
    name: "Shoulder Rolls",
    description: "Rotate shoulders backwards then forwards",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 10,
    easy_interval_time: 5,
    medium_interval_time: 8,
    hard_interval_time: 10,
    rest: 30,
    switch: 1
},
{
    name: "Head Flexion and Extension",
    description: "Look up then look down",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Head Rotation Right and Left",
    description: "Look behind you on your left then right",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Head Side Bend with Shoulder Depression",
    description: "While seated Stretch neck to left side, with right arm extended or holding chair",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Upper Neck Strtch",
    description: "Pull head to side and drop chin down, on left then right sides",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Levator Scapula Stretch",
    description: "While seated, rotate head towards side of your body with the hand behind your back.  Then lean head away and down attemptig to lower opposite ear to back of had on thigh.  A getle stretch should be felt in upper trapezius and neck.",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Chest Stretch at 90 degrees",
    description: "Place arm on wall at 90 degree angle, elbow slightly below chest level.  Maintain forearm contact, rotate body away until gentel stretch is felt in chest and shoulders",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Brugger Postural Upper Body",
    description: "Stand in an athletic stance feet slight apart knees softneutral position.  Hands at your sides, shoulders relaxed. Head looking forward.  Squeeze glutes.  Keep hands by your sides gently squeezeback your shoulder blads while keeping your shoulders relaxed (don't shrug shoulders), retract chin",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 10,
    easy_interval_time: 10,
    medium_interval_time: 20,
    hard_interval_time: 30,
    rest: 30,
    switch: 0
},
{
    name: "",
    description: "",
    url: "",
    category: "",
    level: "Easy",
    sets: 3,
    reps: 10,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 1
},
{
    name: "Cat / Camel",
    description: "On hands and knees, round back up, then arch back",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 10,
    easy_interval_time: 10,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 30,
    switch: 0
},
{
    name: "Double Knee to Chest Stretch",
    description: "Lay on back, bend one knee towards chest and grab, then other knee",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 0,
    switch: 0
},
{
    name: "Supine Low Back Twist",
    description: "On back with knees bent, roll knees to left, then to right",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 0,
    switch: 1
},
{
    name: "Childs Pose Stretch",
    description: "On all fours, then sit back on heels and stretch arms forward",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 0,
    switch: 0
},
{
    name: "Quadruped Spinal Twist",
    description: "On all fours, reach under and across body",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 0,
    switch: 1
},
{
    name: "Half Kneeling Hip Flexor Stretch",
    description: "In a kneeling position with left knee up, right knee down, reach right up up and over to the left and lean forward until you feel stretch in kneeling leg, then switch",
    url: "",
    category: "chiropractor",
    level: "Easy",
    sets: 3,
    reps: 5,
    easy_interval_time: 5,
    medium_interval_time: 10,
    hard_interval_time: 15,
    rest: 0,
    switch: 1
}


]

console.log(db)

db.Exercise.deleteMany({})
    .then(() => db.Exercise.collection.insertMany(ExerciseSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");

        db.Exercise.find()
            .then((dbExercises) => {
                db.Workout.deleteMany({})
                    .then(() => {


                        //console.log(dbExercise)
                        let workout_name = "Default Workout"

                        db.Workout.collection.insertMany([{
                            workoutName: workout_name,
                            exercises: dbExercises,
                        }])
                            .then((dbWorkout) => {
                                console.log(dbWorkout)
                                console.log("Workout created")
                                process.exit(0);
                            })
                            .catch((err) => {
                                console.log(err)
                                process.exit(1);
                            })

                    })

            })
            .catch(err => {
                console.log(err)
                process.exit(1);
            })


    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
