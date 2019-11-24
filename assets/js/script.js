function excercise() {

}

//wger_query("exercise");
$("#start").click(function start_exercise(){
    $("#work_out_page").css({"display":"block"})
    $("#profile").css({"display":"none"})
    $("#start").css({"display":"none"})

    let interval_time = 10;
    display_time(30*60, "#total_workout_time")
    excercise_ids = [91];
    excercise_ids.forEach(id => {
        wger_query("exercise/91");
        console.log("Start Exercise")
        display_time(interval_time, "#exercise_timer_section")
        setTimeout(()=>{
            console.log("Start Break")
            its_break_time()
        }, interval_time*1000)

    });

})
