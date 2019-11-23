function excercise() {

}

//wger_query("exercise");
$("#start").click(function start_exercise(){
    $("#work_out_page").css({"display":"block"})
    $("#profile").css({"display":"none"})
    excercise_ids = [91];
    excercise_ids.forEach(id => {
        wger_query("exercise/91");
        //let  = 45;
        display_time(45)
    });

})

function display_time(time_left){
    setInterval(function(){

    $("#timer_section").text(time_left)
    if (time_left <= 0 ){
        clearInterval()
    }
    time_left = time_left-1
},1000)}