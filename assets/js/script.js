$(document).ready(function () {

    $("#start").click(function (event) {
        event.preventDefault()
        start_workout();
    })

    /** Save profile button
     * Save profile information in local storage
     */
    $("#save_profile").click(function (event) {
        event.preventDefault();
        save_profile();
    })

    let num_clicks = 0
    $(document).click(function (event) {
        if (num_clicks === 0) {
            play_sound("start_audio");
            responsiveVoice.speak("Welcome back to Survival of the Fittest.  Ready to Start your workout?")
            setTimeout(() => {
                responsive_ready()
            }, 20000)
            num_clicks += 1
        }
        // Do not play start_audio if the start button is clicked
        if (event.target.getAttribute("id") === "start") {
            stop_sound("start_audio")
        }
    })
    var options = { to: { width: 55, height: 55 } };
    // var options = {percent: 50}};
    $("#logo").effect("scale", options, 4500);

    setTimeout(() => {
        load_profile();
    }, 5000)

    async function responsive_ready() {
        console.log("async function responsive ready?")
        await get_ready_response().then(function (result) {
            start_workout()
        })
    }

    //   wger_query("exerciseimage", img_query_data);

    function start_workout() {
        // Set the times after start_button is selected
        // demo_mode: 3 min total; 20 sec interval; 10 sec break;
        total_workout_time = ($($(":selected")[1]).attr("workout") === "demo") ? 180 : (30 * 60);
        total_workout_time_left = ($($(":selected")[1]).attr("workout") === "demo") ? 180 : (30 * 60);
        interval_time = parseInt($($(":selected")[1]).attr("interval_time"));
        break_time = parseInt($($(":selected")[1]).attr("break_time"));
        exercise_music = $($(":selected")[1]).attr("music");

        $("#work_out_page").css({ "display": "block" })
        $("#profile").hide();
        $("#start").hide();
        $("#header").hide();
        save_profile();
        stop_sound('start_audio');
        progress();
        start_exercise();
    }

    // JQuery for functional dropdown on Navbar
    $(".navbar-burger").click(function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    })

});