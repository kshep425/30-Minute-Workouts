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
            description: $("#save_ex_desc").val() || `exDesc${i}`,
            url: $("#save_ex_url").val() || `exURL${i}`,
            category: $("#save_ex_category").val() || "Easy",
            level: $("#save_ex_level").val() || "Easy",
            sets: parseInt($("#save_ex_sets").val(), 10),
            reps: parseInt($("#save_ex_reps").val(), 10),
            easy_interval_time: parseInt($("#save_ex_interval").val(), 10),
            medium_interval_time: parseInt($("#save_ex_interval").val(), 10) * 2,
            hard_interval_time: parseInt($("#save_ex_interval").val(), 10) * 3,
            rest: parseInt($("#save_ex_rest").val(), 10),
            switch: $("#save_ex_switch").is(":checked") ? 1 : 0
        }
        console.log(create_exercise_form_values)
        return create_exercise_form_values
    }

    function list_exercises() {
        fetch("/api/exercises")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                for (let j = 0; j < data.length; j++) {
                    create_exercise_card(data[j])
                }
            })
    }

    list_exercises()

    function create_exercise_card(ex) {
        let modal_id = "modal" + ex._id
        let div_panel_block = $("<div>").addClass("panel-block").data({ id: ex._id });
        //            <div  class="panel-block" data-id="${ex._id}">

        let div_columns = $("<div>").addClass("columns")
        //                <div class="columns">
        let div_column_1 = $("<div>").addClass("column open_modal").data({ modal_id: modal_id })
        //<div class="column open_modal" data-modal_id="modal${ex._id}">
        let span_1 = $("<span>").addClass("panel-icon is-left open_modal").data({ modal_id: modal_id })
        //<span class="panel-icon is-left open_modal" data-modal_id="modal${ex._id}">

        let icon_info = $("<i>").addClass("fas fa-info-circle open_modal").attr("aria-hidden", "true").data({ modal_id: modal_id })
        //                            <i class="fas fa-info-circle open_modal" aria-hidden="true" data-modal_id="modal${ex._id}"></i>
        //                </span>
        //          </div>
        div_panel_block.append(div_columns)
        div_columns.append(div_column_1)
        div_column_1.append(span_1)
        span_1.append(icon_info)

        let div_column_2 = $("<div>").addClass("column is-two-thirds open_modal").data({ modal_id: modal_id }).text(ex.name)
        div_columns.append(div_column_2)
        // <div class="column is-two-thirds open_modal" data-modal_id="modal${ex._id}">
        //                       ${ex.name}
        //                    </div>
        let div_column_3 = $("<div>").addClass("column add_exercise_to_workout").data({ ex_id: ex._id }).data({ exercise: ex })
        //                    <div class="column add_exercise_to_workout" data-ex_id="${ex._id}">
        let span_3 = $("<span>").addClass("panel-icon is-right add_exercise_to_workout").data({ ex_id: ex._id }).data({ exercise: ex })
        // <span class="panel-icon is-right add_exercise_to_workout" data-ex_id="${ex._id}"
        // data-exercise=${ex}>
        let icon_add = $("<i>").addClass("fas fa-plus-circle add_exercise_to_workout").attr("aria-hidden", "true").data({ ex_id: ex._id }).data({ exercise: ex })
        //                               <i class="fas fa-plus-circle add_exercise_to_workout" aria-hidden="true"
        //                             data-ex_id="${ex._id}"
        //data-exercise=${ex}>
        //
        $(span_3).append(icon_add)
        $(div_column_3).append(span_3)
        $(div_columns).append(div_column_3)

        $("#list_of_exercises_div").append(div_panel_block)
        $("#list_of_exercises_div").append(create_modal(ex))
        set_dialog(ex._id);

    }

    function set_dialog(ex_id) {
        console.log("set_dialog")
        const modal_id = "#modal" + ex_id

        $(modal_id).dialog({
            autoOpen: false,
            show: { effect: "blind", duration: 800 },
            hide: { effect: "explode", duration: 1000 }
        })
    }

    function create_modal(ex) {
        const modal = `
            <div id="modal${ex._id}" title="${ex.name}">
                <h1>${ex.name}</h1>
                <p>Category: ${ex.category} Level: ${ex.level}</p>
                <p>Sets: ${ex.sets} Reps: ${ex.reps} Switch: ${ex.switch}</p>
                <p>Interval: ${ex.easy_interval_time} seconds Rest: ${ex.rest} seconds</p>
                <p>Description:</p>
                <p>${ex.description}</p>
            </div>
        `

        return modal
    }

    $("div").click(function (event) {
        event.preventDefault();
        const e = event.target

        console.log("div clicked")
        console.log(event.target)

        if (e.className.includes("add_exercise_to_workout")) {
            console.log("add to workout clicked")
            const exercise = $(e).data("exercise")
            console.log(exercise)
            create_exercise_list_item(exercise)
        } if (e.className.includes("open_modal")) {
            console.log("open modal")
            const modal_id = "#" + $(e).data("modal_id")
            console.log(modal_id)
            $(modal_id).dialog("open")
        } if (e.className.includes("delete_exercise")) {
            console.log("delete exercise: ")
            console.log($(e.parentNode))
            $(e.parentNode).remove()
        }
    })

    $("#sortable").sortable({
        placeholder: "ui-state-highlight",
        cursor: "move",
        items: "> li",
    });

    $("#sortable").disableSelection();

    console.log($("#sortable"))

    // add workouts to dropdowns
    function add_workouts() {
        console.log("load workouts from db")
        let workouts = $("#workout_name_dropdown")
        $(workouts.children()).remove()
        workouts.append($("<option>").text("Create Workout"))
        fetch("/api/workout_names")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.forEach((w) => {
                    console.log(w.workoutName)
                    let option = $("<option>")
                    option.data({ wo_id: w._id })
                    option.data({ wo_name: w.workoutName })
                    option.data({ wo_obj: w })
                    option.text(w.workoutName)
                    console.log(option)
                    workouts.append(option)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    add_workouts()

    $("#workout_name_dropdown").change(function () {
        console.log("workout_name changed")
        const wo_name = $("#workout_name_dropdown option:selected").data("wo_name")
        $("#save_wo_name").val(wo_name)
        $(".ui-state-default").remove();
        if (wo_name) {
            console.log("replace list in workout");
            const wo_obj = $("#workout_name_dropdown option:selected").data("wo_obj")
            wo_obj.exercises.forEach(exercise => {
                console.log(exercise)
                create_exercise_list_item(exercise)
            })
        }
    })

    $("#save_new_workout_btn").click((event) => {
        event.preventDefault()
        console.log("Save as new workout")
        const wo_name = get_workout_name()
        if (wo_name) {
            console.log("Save new workout " + wo_name)
            let exercises = get_exercises_list()

            let wo = {
                workoutName: wo_name,
                exercises: exercises
            }
            console.log(wo)
            $.ajax({
                url: "/api/workout",
                type: "POST",
                data: wo
            })
            .done((res)=>{
                add_workouts()
                console.log(res)
                alert("new workout added")
            })
        }
    })

    $("#save_workout_btn").click(() => {
        event.preventDefault()
        console.log("Save workout")
        const wo_name = get_workout_name()
        console.log(wo_name)
        if (wo_name) {
            console.log("Save workout " + wo_name)
            let exercises = get_exercises_list()
            let wo_id = $("#workout_name_dropdown option:selected").data("wo_id")

            let wo = {
                workoutName: wo_name,
                exercises: exercises
            }
            console.log(wo)
            $.ajax({
                url: "/api/workout/" + wo_id,
                type: "PATCH",
                data: wo
            })
            .done((res)=>{
                add_workouts()
                console.log(res)
                alert("workout updated")
            })
        }
    })

    function get_workout_name() {
        return $("#save_wo_name").val()
    }

    function get_exercises_list() {
        console.log("Get List of Exercises")
        let ex_list = [];
        let form_list = $(".ui-state-default")
        console.log(form_list)
        for (let i = 0; i < form_list.length; i++) {
            ex_list.push($(form_list[i]).data("exercise"))
        }
        console.log(ex_list)
        return ex_list;
    }

    function create_exercise_list_item(exercise) {
        let li = $("<li>").text(exercise.name);
        li.data({ exercise: exercise })
        li.addClass("ui-state-default")
        let icon = $("<i>").addClass("fas fa-minus-circle delete_exercise")
        icon.data({ ex_id: exercise._id })
        $(li).append(icon)
        $("#sortable").append(li)
    }

})
