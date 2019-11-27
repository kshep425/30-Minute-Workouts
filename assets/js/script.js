
$("#start").click(function(){
    $("#work_out_page").css({"display":"block"})
    $("#profile").hide();
    $("#start").hide();
    progress();
    start_exercise();
});

/** Save profile button
 * Save profile information in local storage
*/
$("#save_profile").click(function(event){
    event.preventDefault()
    profile = {
        user_name: $("#user_name").val(),
        goal: $("#goal_pref").val(),
        intensity: $("#intensity_pref").val()
    }
    console.log(profile)
    localStorage.setItem("profile", JSON.stringify(profile));
})

function load_profile(){
    $("profile").show();
    profile = JSON.parse(localStorage.getItem("profile"))
    console.log(profile)
    if (profile != undefined){
        $("#user_name").val(profile.user_name)
        $("#goal_pref").val(profile.goal)
        $("#intensity_pref").val(profile.intensity)
    }
}


// Progress Bar
function progress() {
    sec = 0;

    var proBar = setInterval(function(){
        let i = sec/(3*60)
        $("#progress_bar").attr("value", i);
        console.log(i);
        console.log($("#progress_bar").attr("value"));
        if (i == 1) {
            clearInterval(proBar);
            console.log(i)
        }
        sec++
    },1000)

}

load_profile();
wger_query("exerciseimage", img_query_data);
