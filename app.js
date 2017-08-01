var express       = require("express"),
    app           = express(),
    bodyParser    = require('body-parser'),
    port          = 1234,
    mongoose      = require('mongoose');

mongoose.connect('mongodb://localhost/recit', {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "pug");

// SCHEMA SET UP
var listItemSchema = new mongoose.Schema({
  number: Number,
  artist: String,
  song: String,
  image: String,
  description: String
});

// take schema/blueprint and create a model, which has methods we can use (such as find() and create())
var ListItem = mongoose.model('ListItem', listItemSchema);

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

// INDEX route - show all list items
app.get("/list", function(req, res){
  // get all list items from db
  ListItem.find({}, function(err, listItems){
    if (err){
      console.log(err);
    } else {
      res.render("list", {list: listItems});
    }
  })
  // temp array of campground objects...
  
  // res.render("list", {list: list});
});

// need 2 routes to send a post request (1 to show form, then 1 route to post to somewhere)

// 1) NEW route - show the form that sends data to post/list route...
app.get("/list/new", function(req, res){
  res.render("new");
});

// 2) CREATE route - adds new list item to db
app.post("/list", function(req, res){
  var artist = req.body.artist;
  var song = req.body.song;
  var image = req.body.image;
  var description = req.body.description;
  // ^ form input data that's posted
  var newListItem = {number: (list.length + 1), artist: artist, song: song, image: image, description: description};
  // get data from form and add to list array

  // create new campground and save to db...
  ListItem.create(newListItem, function(err, newlyCreated){
    if (err){
      console.log('err - ', err);
    } else {
      // redirect back to list page
      res.redirect('/list');
    }
  })
});

// SHOW route - show individual list item
app.get('/list/:id', function(req, res){
  console.log('req - ', req.params.id);
  res.send('this will be the show page');
});

app.listen(port, function(){
  console.log(port + ' is litty...');
});