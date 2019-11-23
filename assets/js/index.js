const wger_api = {
    key: "25d6f241707205c0e6e01e38c8a191d27f8b1b8d",
    uri: "https://wger.de/api/v2/"
}

const query_data = {
    format: "json",
    status: "2",
    language: "2",
    limit: '50'

}

const wger_query = function(endpoint) {

    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + wger_api.key);
        },
        url: wger_api.uri + endpoint,
        data: query_data,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        // return response
        var crunchList = [];
        for (var i = 0; i < 50; i++) {
            let img_holder = $('<img>');
            let body_ref = $('body');
            let arr_img = $('<img>');


            img_holder.attr('src', response.results[i].image);

            // crunchList.push(response.results[i].image);

            img_holder.attr('width', '200px');
            img_holder.attr('height', '200px');
            body_ref.append(img_holder);
            // arr_img.attr('src', crunchList[0]);
            body_ref.append(arr_img);
            // arr_img.attr('width', '200px');
            // arr_img.attr('height', '200px');



        }

        // console.log(crunchList);

    })
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
const wger_post = function(endpoint) {
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + wger_api.key);
        },
        url: wger_api.uri + endpoint + "/",
        data: post_data,
        method: "POST"
    })
}


// var usdaAPI = 'xwHr4uzf7ZERBQsGSdn2PaRtm4S1POqXggrfdhVz';
// $.ajax({
//         beforeSend: function(usxhr) {
//             usxhr.setRequestHeader('Content-Type', 'application/json');
//         },
//         url: 'https://api.nal.usda.gov/fdc/v1/search?api_key=' + usdaAPI,
//         method: 'POST',
//         data: JSON.stringify({ generalSearchInput: 'Cheddar Cheese' })
//     })
//     .then(function(usda) {
//         console.log(usda);
//     })