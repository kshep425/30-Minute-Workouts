var express = require("express");
var app = express();

var mongoose = require("mongoose")

//var db = require("./models")

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

var api_routes = require("./routes/api_routes.js")
api_routes(app)

var html_routes = require("./routes/html_routes.js")
html_routes(app)

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout"
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})

app.listen(PORT, function(){
    console.log("You are listening on port: " + PORT)
})