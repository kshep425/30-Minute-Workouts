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
        $("#list_of_exercises_div").append(
            `
            <div  class="panel-block" data-id="${ex._id}">
                <div class="columns">
                    <div class="column open_modal" data-modal_id="modal${ex._id}">
                        <span class="panel-icon is-left open_modal" data-modal_id="modal${ex._id}">
                            <i class="fas fa-info-circle open_modal" aria-hidden="true" data-modal_id="modal${ex._id}"></i>
                        </span>
                    </div>
                    <div class="column is-two-thirds open_modal" data-modal_id="modal${ex._id}">
                        ${ex.name}
                    </div>
                    <div class="column add_exercise_to_workout" data-ex_id="${ex._id}">

                            <span class="panel-icon is-right add_exercise_to_workout" data-ex_id="${ex._id}">
                                <i class="fas fa-plus-circle add_exercise_to_workout" aria-hidden="true" data-ex_id="${ex._id}"></i>
                            </span>

                    </div>
                </div>
            </div>
            `
        )
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
            console.log(e.dataset.ex_id)
            $("li").data("exercise", {ex_id: e.dataset.ex_id} )
            $("ul").append()
        } if (e.className.includes("open_modal")) {
            console.log("open modal")
            console.log(e.dataset.modal_id)
            $("#" + e.dataset.modal_id).dialog("open")
        } if (e.className.includes("ui-state-default")){


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
        fetch("/api/workout_names")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.forEach((w) => {
                    console.log(w.workoutName)
                    let option = $("<option>")
                    option.data({wo_id: w._id})
                    option.data({wo_name: w.workoutName})
                    option.data({wo_obj: w})
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

})
