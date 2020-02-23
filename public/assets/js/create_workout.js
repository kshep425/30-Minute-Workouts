$(document).ready(() => {
    var options = { to: { width: 55, height: 55 } };
    // var options = {percent: 50}};
    $("#logo").effect("scale", options, 1000);

    $("#save_exercise_btn").click((event) => {
        event.preventDefault();
        const create_exercise_form_values = get_create_exercise_form_values();
        console.log(create_exercise_form_values)
        //fetch("")
    })

    $("#save_new_exercise_btn").click((event) => {
        event.preventDefault();
        const create_exercise_form_values = get_create_exercise_form_values();
        console.log(create_exercise_form_values)
        $.ajax({
            url: "/api/exercise",
            type: "POST",
            data: create_exercise_form_values
        })
    })
    let i = 0;
    function get_create_exercise_form_values() {
 i++
        let create_exercise_form_values = {
            name: $("#save_ex_name").val() || `exName${i}`,
            description: $("#save_ex_desc").val()|| `exDesc${i}`,
            url: $("#save_ex_url").val()|| `exURL${i}`,
            category: $("#save_ex_category").val() || "Easy",
            level: $("#save_ex_level").val() ||"Easy",
            sets: parseInt($("#save_ex_sets").val(),10),
            reps: parseInt($("#save_ex_reps").val(),10),
            easy_interval_time: parseInt($("#save_ex_interval").val(),10),
            medium_interval_time: parseInt($("#save_ex_interval").val(),10) * 2,
            hard_interval_time: parseInt($("#save_ex_interval").val(),10) * 3,
            rest: parseInt($("#save_ex_rest").val(),10),
            switch: $("#save_ex_switch").is(":checked") ? 1:0
        }
        console.log(create_exercise_form_values)
        return create_exercise_form_values
    }

})