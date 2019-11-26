
$("#start").click(function(){
    $("#work_out_page").css({"display":"block"})
    $("#profile").css({"display":"none"})
    $("#start").css({"display":"none"})
    start_exercise()
});

wger_query("exerciseimage", img_query_data);