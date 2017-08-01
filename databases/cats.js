var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app', {useMongoClient: true});

// pattern
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// TAKE THE SCHEMA AND COMPILE IT INTO A MODEL (model has the CRUD methods available)
// 1st arg ("Cat") -> should be singluar version of collection name (automatically pluralizes it and makes it a collection)...
var Cat = mongoose.model('Cat', catSchema);
// pattern now has all of the methods


// create new cat instance
// var george = new Cat({
//   name: 'AC',
//   age: 1,
//   temperament: 'fat'
// });

// // save to db (w/ cb function)
// george.save(function(err, cat){
//   if (err){
//     console.log('something went wrong');
//   } else {
//     // cat is what's saved in the db
//     // george is the js obj that we're trying to save to the db (george is just how we're referring to the entry in the code)
//     console.log('just saved a cat to the db - ', cat);
//   }
// });

// .create ->  new + save all at once (the above 2 steps combined)
Cat.create({
  name: 'Snow White',
  age: 15,
  temperament: 'bland'
}, function(err, cat){
  if (err){
    console.log('err - ', err);
  } else {
    console.log('cat - ', cat);
  }
});


// retrieve all cats from the db (pass in empty {} cuz want em all)
Cat.find({}, function(err, cats){
  if (err){
    console.log('oh no err - ', err);
  } else {
    console.log('cats - ', cats);
  }
});
