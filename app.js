var express = require("express");
var app = express();
var port = 1234;

app.set("view engine", "pug");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/list", function(req, res){
  // temp array of campground objects...
  var list = [
    {number: 1, artist: "Frank Ocean", song: "Live @ FYF Fest", image: "http://static.highsnobiety.com/wp-content/uploads/2017/07/27003442/frank-ocean-full-fyf-performance-00-320x192.jpg"},
    {number: 2, artist: "Eric Prydz", song: "Beats One Episode 15", image: "http://www.edmtunes.com/wp-content/uploads/2015/12/0-5.jpg"},
    {number: 3, artist: "Eric Prydz", song: "Live @ Tomorrowland Belgium", image: "http://mixing.dj/wp-content/uploads/2017/07/Eric-Prydz.jpg"}
  ];
  
  res.render("list", {list: list});
});

app.listen(port, function(){
  console.log(port + ' is litty...');
});