
$(document).ready(function () {

    $("#start").click(function (event) {
        event.preventDefault();
        $("#work_out_page").css({ "display": "block" })
        $("#profile").hide();
        $("#start").hide();
        save_profile();
        stop_sound("start_page_audio")
        progress();
        start_exercise();
    });

    /** Save profile button
     * Save profile information in local storage
     */
    $("#save_profile").click(function (event) {
        event.preventDefault();
        save_profile();
    })

    //play_sound("start_page_audio");
    load_profile();
    wger_query("exerciseimage", img_query_data);

});