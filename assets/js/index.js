/** The query url and api are preset to be called. */
const wger_api = {
    key: "25d6f241707205c0e6e01e38c8a191d27f8b1b8d",
    uri: "https://wger.de/api/v2/"
}

/** The query data can be updated as needed.
*  For endpoint 'exercise/id': format and status;
*/
const exercise_query_data = {
    format: "json"
}
//image query data
const img_query_data = {
    language: "2",
    limit: '204'
}

/**
 * Get exercises using wger_query
 * @param {string} endpoint
 */
const wger_query = function (endpoint, data=exercise_query_data) {

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Token " + wger_api.key);
            xhr.setRequestHeader("Accept", "application/json;indent=4")
        },
        url: wger_api.uri + endpoint,
        data: data,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        if (endpoint.includes("exerciseimage")){
            response.results.forEach(function(image){
                let img_holder = $('<img>');
                img_holder.attr('src', image.image);
                img_holder.attr('width', '200px');
                img_holder.attr('height', '200px');
                img_holder.attr('exercise_id', image.exercise)
                img_holder.attr('is_main', image.is_main)
                img_holder.hide()
                $("#exercise_imgs").append(img_holder);
            })
        } else {
            set_exercises(response);
        }
    }).fail(function (err) {
        console.log("Query Failed!")
        console.log(err)
        alert("Query Failed!")
    })
}

var exercise_music;
// determine if in responsive mode
var responsive_mode;
var sleep_time=2;
/**
 * Set Exercise info to display during time interval
 * @param {object} exercise This is the response from the exercise/id endpoint
 */
async function set_exercises(exercise) {
    let ex = {
        name: exercise.name,
        id: exercise.id,
        description: exercise.description
    }
    $("#break_or_go").text("GO!")
    $("#exercise_name").text(ex.name)
    $("#workout_description").text("Workout Description")
    $("#exercise_description").html(ex.description)
    $("[exercise_id=" + id + "]").show();

    next_exercise_announcement = "Your next exercise is " + ex.name;


    //responsiveVoice.speak(next_exercise_description)
    if (responsive_mode){
        // set sleep_time to 10 because it allows for time to get the prompts
        sleep_time=10;
        await sleep(2).then(async function are_you_ready(){
            next_exercise_announcement_ready = next_exercise_announcement + " are you ready?"
            responsiveVoice.speak(next_exercise_announcement_ready);
            // the 4 second sleep is needed so that it gives time for responsive voice to finish.
            return await sleep(4)
        }).then(function are_you_ready_prompt(){
            // TODO: enter wait for voice response here next
            prompt("are_you_ready?");
        })
    } else{
        responsiveVoice.speak(next_exercise_announcement);
    }

    exercise_music = $($(":selected")[1]).attr("music");
    play_sound(exercise_music);
}


/**
 * Create a sound object using the sound constructor
 * @param {*} src path to sound
 */
let play_sound = function (song_audio) {
    let m = document.getElementById(song_audio)
    m.play();
    return true;
}

function stop_sound(song_audio) {
    let m = document.getElementById(song_audio)
    m.pause();
}
/**
 * It's Break Time!
 * This will:
 * - Display the time left for the break
 * - change the exercise name to break;
 *
 * TODO: add next exercise name.
 * TODO: Get break time from profile settings.
 *
 */
function its_break_time(break_time=5) {
    $("#break_or_go").text("BREAK!")
    $("#exercise_name").text("")
    $("#exercise_description").text("")
    $("#workout_description").text("")
    display_time(break_time, "#exercise_timer_section")
}
/**
 * Display Time
 * @param {Number} time_left must be in seconds
 * @param {string} section section needs to include # or . example: ('#exercise_timer_section')
 *
 * TODO: Add 3,2,1 beeps with big number flashes when timer is ending
 *
 */
function display_time(time_left, section) {
    text_time_left = convert_seconds_to_time(time_left)
    console.log("Display " + text_time_left + " on " + section)
    $(section).show();
    let exercise_interval = setInterval(() => {
        $(section).text(convert_seconds_to_time(time_left))
        if (time_left <= 0) {
            clearInterval(exercise_interval)
        }
        time_left = time_left - 1
    }, 1000)
}

/**  Convert seconds to Time
* @param {number} given_seconds
* @returns {string} Time String formatted hh:mm:ss
* referenced on 11/24/2019: https://www.geeksforgeeks.org/how-to-convert-seconds-to-time-string-format-hhmmss-using-javascript/
*/
function convert_seconds_to_time(given_seconds) {

    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let time_string = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');

    return time_string;
}
/**
 *sleep function pauses before doing the next action
 * @param {number} seconds (length of time to sleep)
 * referenced on 11/24/2019: https://www.tutorialspoint.com/javascript-sleep-function
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * start exercise
 *
 * Get the break and interval times and exercise ids
 * For each exercise query the exercise id using wger api
 * Display the exercise name and info for the interval time
 * Break before moving on to next exercise
 */
async function start_exercise() {
    responsive_mode = ($($(":selected")[2]).attr("play_mode") == "responsive")? true : false;
    console.log("Responsive mode is: " + responsive_mode);
    // demo_mode: 3 min total; 20 sec interval; 10 sec break;
    let total_workout_time = 1;//($($(":selected")[1]).attr("workout") === "demo")? 3 : 30;
    let interval_time = parseInt($($(":selected")[1]).attr("interval_time"));
    let break_time = parseInt($($(":selected")[1]).attr("break_time"));
    let total_exercises = (total_workout_time * 60)/(interval_time + break_time)
    let exercise_ids = [93, 60, 4, 91, 128, 341, 260, 358, 326, 376, 383, 338, 367, 325, 172, 295, 361, 238, 195, 325, 400, 417, 393, 359, 203];

    display_time( total_workout_time * 60, "#total_workout_time");

    for (let i = 0; i < total_exercises; i++) {
        id = exercise_ids[i]
        console.log("Start Exercise: " + id);

        wger_query("exercise/" + id);

        // use sleep(sleep_time) to accomodate for longer waits
        // note: you can chain these awaits, that may help with the pause timer in the future.
        await sleep(sleep_time)

        display_time(interval_time, "#exercise_timer_section");

        await sleep(sleep_time)

        setTimeout(() => {
            console.log("Start Break");
            $("[exercise_id=" + id + "]").hide();
            its_break_time(break_time);
        }, (interval_time * 1000) + sleep_time);

        if ($("#total_workout_time").text() === "00:00:00") {
            stop_sound(exercise_music);
            stop_workout();
            return;
        }
        await sleep(interval_time + break_time);

    }

    stop_workout();

}

function stop_workout(){
    console.log("Workout done")
    stop_sound(exercise_music);
    $("#work_out_page").hide();
    let last_workout_date = {
        month: $("#last_workout_month").text(),
        day: $("#last_workout_day").text(),
        year: $("#last_workout_year").text()
    }

    let total_consecutive_workouts= parseInt($("#total_consecutive_workouts").text());
    let total_workouts = parseInt($("#total_workouts").text());
    if(is_yesterday(last_workout_date)){
        console.log("last workout was yesterday, update total consecutive workouts")
        total_consecutive_workouts += 1;
    };
    total_workouts += 1;

    $("#total_consecutive_workouts").text(total_consecutive_workouts);
    $("#total_workouts").text(total_workouts);
    $("#work_out_done").show();

    responsiveVoice.speak("Great Job!")
    responsiveVoice.speak($("#total_workouts_text").text())

    save_profile(true);
}

function save_profile(update_date=false){
    console.log("save profile and update_date: " + update_date)
    profile = {
        user_name: $("#user_name").val(),
        goal: $("#goal_pref").val(),
        intensity: $("#intensity_pref").val(),
        total_consecutive_workouts: $("#total_consecutive_workouts").text(),
        total_workouts: $("#total_workouts").text(),
        last_workout_date: {
            month: $("#last_workout_month").text(),
            day: $("#last_workout_day").text(),
            year: $("#last_workout_year").text(),
        },
        play_mode: $("#play_mode").val()
    }

    if (update_date){
        console.log("Update Last Workout Date")
        let updated_date = new Date();
        profile.last_workout_date.month = updated_date.getMonth();
        profile.last_workout_date.day = updated_date.getDate();
        profile.last_workout_date.year = updated_date.getFullYear();
    }

    console.log(profile)
    localStorage.setItem("profile", JSON.stringify(profile));
}

function load_profile() {
    $("profile").show();
    profile = JSON.parse(localStorage.getItem("profile"))
    console.log(profile)
    if (profile != undefined) {
        $("#user_name").val(profile.user_name);
        $("#goal_pref").val(profile.goal);
        $("#intensity_pref").val(profile.intensity);
        $("#play_mode").val(profile.play_mode)
        $("#total_consecutive_workouts").text(profile.total_consecutive_workouts);
        $("#total_workouts").text(profile.total_workouts);
        $("#last_workout_month").text(profile.last_workout_date.month)
        $("#last_workout_day").text(profile.last_workout_date.day)
        $("#last_workout_year").text(profile.last_workout_date.year)
        $("#last_workout_month").hide()
        $("#last_workout_day").hide()
        $("#last_workout_year").hide()
    }
}

function progress() {
    sec = 0;

    var proBar = setInterval(function () {
        let total_workout_time = ($($(":selected")[1]).attr("workout") === "demo")? 3 : 30;
        let i = sec / (total_workout_time * 60)
        $("#progress_bar").attr("value", i);
        //console.log($("#progress_bar").attr("value"));
        if (i >= 1) {
            clearInterval(proBar);
        }
        sec++
    }, 1000)

}

// Check if last_workout_date is yesterday
function is_yesterday(lw_date){
    is_yesterday_bool = false;
    if (lw_date === undefined || lw_date === "" || typeof lw_date != "object"){
        console.log("last_workout_date not defined")
        return is_yesterday_bool
    }

    let today = new Date();
    let yesterday_epoch_seconds = Math.floor(today.getTime()/1000.0) - 86400 //getTime gets epoch time in millisonds; 86400 is seconds in a day
    let yesterday = new Date(yesterday_epoch_seconds*1000)

    if (parseInt(lw_date.month) === yesterday.getMonth() &&
        parseInt(lw_date.day) === yesterday.getDate() &&
        parseInt(lw_date.year) === yesterday.getFullYear()){
            is_yesterday_bool = true
            console.log("good. you worked out yesterday")
    }

    return is_yesterday_bool;

}

/**
 * Hot Shot Implicit Return (WHAT)
 * Error handling es6 style in one line
 * higher order function
 * https://www.youtube.com/watch?v=BDqZLfBFeGk
 * */
const handleError = fn => (...params) => fn(...params).catch(console.error);
/**
 * example creating a function using handleError
 * const safeYolo = handleError(yolo_function)
 * safeYolo();
 */