
$("#start").click(function(){
    $("#work_out_page").css({"display":"block"})
    $("#profile").css({"display":"none"})
    $("#start").css({"display":"none"})
    progress()
    start_exercise()
});

wger_query("exerciseimage", img_query_data);



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