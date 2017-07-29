var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = 1234;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "pug");

var list = [
  {number: 1, artist: "Frank Ocean", song: "Live @ FYF Fest", image: "http://static.highsnobiety.com/wp-content/uploads/2017/07/27003442/frank-ocean-full-fyf-performance-00-320x192.jpg"},
  {number: 2, artist: "Eric Prydz", song: "Beats One Episode 15", image: "http://www.edmtunes.com/wp-content/uploads/2015/12/0-5.jpg"},
  {number: 3, artist: "Eric Prydz", song: "Live @ Tomorrowland Belgium", image: "http://www.techibeats.com/wp-content/uploads/2015/06/capdj19-499x300.png"},
  {number: 4, artist: "Frank Ocean", song: "Live @ FYF Fest", image: "http://static.highsnobiety.com/wp-content/uploads/2017/07/27003442/frank-ocean-full-fyf-performance-00-320x192.jpg"},
  {number: 5, artist: "Eric Prydz", song: "Beats One Episode 15", image: "http://www.edmtunes.com/wp-content/uploads/2015/12/0-5.jpg"},
  {number: 6, artist: "Eric Prydz", song: "Live @ Tomorrowland Belgium", image: "http://www.techibeats.com/wp-content/uploads/2015/06/capdj19-499x300.png"}
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/list", function(req, res){
  // temp array of campground objects...
  
  res.render("list", {list: list});
});

// show the form that sends data to post/list route...
app.get("/list/new", function(req, res){
  res.render("new");
});

// creates new data/list
app.post("/list", function(req, res){
  var artist = req.body.artist;
  var song = req.body.song;
  var image = req.body.image;
  // ^ form input data that's posted
  var newListItem = {number: (list.length + 1), artist: artist, song: song, image: image};
  // get data from form and add to list array
  list.push(newListItem);
  // redirect back to list page
  res.redirect("/list");
});


app.listen(port, function(){
  console.log(port + ' is litty...');
});