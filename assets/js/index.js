const wger_api = {
    key: "25d6f241707205c0e6e01e38c8a191d27f8b1b8d",
    uri: "https://wger.de/api/v2/"
}

const query_data = {
    format: "json",
    status: "2",
}

const wger_query = function(endpoint){

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Token " + wger_api.key);
        },
        url: wger_api.uri + endpoint,
        data: query_data,
        method: "GET"
    }).then(function(response){
        console.log(response);
        set_exercises(response)
        return response
    })
}


function set_exercises(exercise){
    ex_name = exercise.name
    console.log(exercise.name)
}


const post_data = {
    "license_author": "Survival of the Fittest",
    "description": "Basic crunch: To do a crunch, start by lying on the floor with your knees bent and your feet flat on the ground. Then, cross your arms over your chest. When you're ready, lift your shoulders off the mat while contracting your abs and exhaling. Hold this pose for 1-2 seconds, then inhale and slowly lower back down.",
    "name": "Basic Crunch",
    "name_original": "Basic Crunch",
    "license": 2,
    "category": 10,
    "language": 2,
    "muscles": [14],
    "muscles_secondary": [],
    "equipment": []
}
const wger_post = function(endpoint){
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Token " + wger_api.key);
        },
        url: wger_api.uri + endpoint + "/",
        data: post_data,
        method: "POST"
    })
}