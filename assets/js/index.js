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
const wger_query = function(endpoint){

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Token " + wger_api.key);
            xhr.setRequestHeader ("Accept", "application/json;indent=4")
        },
        url: wger_api.uri + endpoint,
        data: query_data,
        method: "GET"
    }).then(function(response){
        console.log(response);
        set_exercises(response);
    }).fail(function(err){
        console.log("Query Failed!")
        console.log(err)
        alert("Query Failed!")
    })
}

/**
 * Set Exercise info to display during time interval
 * @param {object} exercise This is the response from the exercise/id endpoint
 */
function set_exercises(exercise){
    ex = {
        name: exercise.name,
        id: exercise.id,
        description: exercise.description
    }

    $("#exercise_name").text(ex.name)
    $("#exercise_description").text(ex.description)
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
function its_break_time(){
    let break_time = 15;
    $("#exercise_name").text("BREAK TIME!")
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
function display_time(time_left, section){
    console.log("Display " + time_left + " on " + section)
    let exercise_interval = setInterval(() => {
        $(section).text(convert_seconds_to_time(time_left))
        if (time_left <= 0 ){
            clearInterval(exercise_interval)
        }
        time_left = time_left-1
    }, 1000)
}

/**  Convert seconds to Time
* @param {number} given_seconds
* @returns {string} Time String formatted hh:mm:ss
* referenced: https://www.geeksforgeeks.org/how-to-convert-seconds-to-time-string-format-hhmmss-using-javascript/
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
