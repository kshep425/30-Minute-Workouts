/** The query url and api are preset to be called. */
const wger_api = {
    key: "25d6f241707205c0e6e01e38c8a191d27f8b1b8d",
    uri: "https://wger.de/api/v2/"
}

/** *The query data can be updated as needed.
*  For endpoint 'exercise/id': format and status;
*/
const query_data = {
    format: "json",
    status: "2",
}

/**
 * Get exercises using wger_query
 * @param {string} endpoint
 */
const wger_query = function (endpoint) {

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Token " + wger_api.key);
            xhr.setRequestHeader("Accept", "application/json;indent=4")
        },
        url: wger_api.uri + endpoint,
        data: query_data,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        set_exercises(response);
    }).fail(function (err) {
        console.log("Query Failed!")
        console.log(err)
        alert("Query Failed!")
    })
}

/**
 * Set Exercise info to display during time interval
 * @param {object} exercise This is the response from the exercise/id endpoint
 */
function set_exercises(exercise) {
    ex = {
        name: exercise.name,
        id: exercise.id,
        description: exercise.description
    }
    $("#break_or_go").text("GO!")
    $("#exercise_name").text(ex.name)
    $("#exercise_description").html(ex.description)
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
function its_break_time() {
    let break_time = 5;
    $("#break_or_go").text("BREAK!")
    $("#exercise_name").text("")
    $("#exercise_description").text("Next exercise is: ")
    display_time(break_time, "#exercise_break_section")
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
    console.log("Display " + time_left + " on " + section)
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

    let interval_time = 10;
    let break_time = 5;
    let exercise_ids = [91, 341, 260, 358, 326, 376, 383, 338, 367, 325, 172, 295, 361, 238, 195, 325, 400, 417, 393, 359, 203];

    display_time(30*60, "#total_workout_time");

    for (let i = 1; i < exercise_ids.length; i++) {
        id = exercise_ids[i]
        console.log("Start Exercise: " + id);

        wger_query("exercise/" + id);
        display_time(interval_time, "#exercise_timer_section");

        setTimeout(() => {
            console.log("Start Break");
            its_break_time();
        }, interval_time * 1000);

        await sleep(interval_time + break_time);
    }
}