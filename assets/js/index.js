const wger_api = {
    key: "25d6f241707205c0e6e01e38c8a191d27f8b1b8d",
    uri: "https://wger.de/api/v2/workout/"
}

const query_data = {

}

const wgr_query = {
    $.ajax({
        url: wgr_api,
       // data: query_data,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}