'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session')
var mongoose = require('mongoose');
// var Schema = mongoose.Schema

var app = express();

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greet";

//connection
mongoose.connect(mongoURL, function(err) {
  if (err) {
    console.log('Error Connecting to DB: ' + err);
  } else {
    console.log('connection to DB is successful');
  }
});

//Schema
// var nameSchema = new Schema({
//   name: {
//     type: String,
//     countTimes : Number
//   }
// });
//nameSchema.index({seq: 1}, {unique: true});


//Model
var Name = mongoose.model('Name', {
  name: String,
  countTimes: Number
});

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}))

app.use(flash())


var list = [];
var uniqList = [];
var namesGreeted = {};
var greetingCounter = 0;

app.use(bodyParser.urlencoded({
  extended: true
}));


app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', function(req, res) {

  res.render('index')
});


app.post('/greetings', function(req, res, next) {
  var string = ' ';
  var firstName = req.body.firstName
  var language = req.body.language

  list.push(firstName);

  if (language === 'English') {
    // res.render('index', {
    string = 'Hello' + " " + firstName
    greetingCounter++
    //   greetCount: "has been greeted " + greetingCounter++ + " " + 'times'
    // })
  } else if (language === 'IsiXhosa') {
    // res.render('index', {
    string = 'Molo' + " " + firstName
    greetingCounter++
    //
  } else if (language === 'Sotho') {
    // res.render('index', {
    string = 'Dumela' + " " + firstName
    greetingCounter++
  } else if (firstName === "") {
    req.flash('error', 'Please enter the name and select a language');
  };


  var newNames = {
    name: firstName,
    countTimes: 1

  };

  Name.findOne({
    name: firstName
  }, function(err, results) {
    if (!results) {
      Name.create(newNames);
    } else {

      results.countTimes = results.countTimes + 1;
      results.save();
    };

  });


  res.render('index', {
    greeting: string,
    greetCount: greetingCounter
  })


});


app.get('/greeted', function(req, res, next) {



  Name.find({}, function(err, listName) {
    console.log(listName);

    res.render('ListNames', {
      listName: listName

    })
  });
  // }
})


// });


app.get('/greeted/:firstName', function(req, res, next) {
  var firstName = req.params.firstName
  Name.findOne({
    name: firstName
  }, function(err, results) {
    if (err) {
      return next()
      console.log(err);
    } else {
      res.render('ListNames', {
        timesBeen: firstName + 'has been greeted' + results.countTimes + 'times',
        grtname: results.name + ' ' + 'has been greeted' + ' ' +results.countTimes + ' times!!!'
      })
    }
  })
})


app.post('/reset', function(req, res) {
  Name.remove({}, function(err, remove) {
if (err) {
  console.log(err);
}
else {

  res.render('index')
}

  })
});
const port = process.env.PORT || 8000;

app.use(function(err, req, res, next) {
  res.status(500).send(err.stack);
})
app.listen(port, function() {
  console.log('Example app listening at :' + port)
});
