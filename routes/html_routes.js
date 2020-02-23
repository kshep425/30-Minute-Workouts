var path = require("path")

function html_routes(app){

    app.get("/", (req, res)=>{
        console.log(req.body)
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get("/create", (req, res)=>{
        console.log(req.body)
        res.sendFile(path.join(__dirname, "../public/create_workout.html"))
    })
}

module.exports = html_routes;