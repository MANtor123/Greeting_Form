var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var flash = require('express-flash');
var session = require('express-session')
//var Schema = mongoose.Schema

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greet');


const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greet";

mongoose.connect(mongoURL);



var Name = mongoose.model('Name', { name: String });






var port = 3000;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}))
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
  // var namesGreeted = req.body.firstName;
  // console.log(namesGreeted);
  res.render('index')
});


app.post('/greetings', function(req, res) {
  var string = ' ';
  var name = req.body.firstName
  var language = req.body.language

  list.push(name);

  if (language === 'English') {
    // res.render('index', {
    string = 'Hello' + " " + name
    greetingCounter++
    //   greetCount: "has been greeted " + greetingCounter++ + " " + 'times'
    // })
  } else if (language === 'IsiXhosa') {
    // res.render('index', {
    string = 'Molo' + " " + name
    greetingCounter++
    //
  } else if (language === 'Sotho') {
    // res.render('index', {
    string = 'Dumela' + " " + name
    greetingCounter++
  }
else{
  req.flash('error', 'Please enter the name and select a language')
}

  var name = new Name({ name: name });
  name.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Greet');
    }
  });

  res.render('index', {
    greeting: string,
    greetCount: greetingCounter
  })
});
//
// 0000000000000000000000000000000000000000000000000000app.get('./greeted', function(req, res) {
//     res.send(uniqList);
// });

app.get('/counter', function(req, res) {
  var name = req.body.firstName;
  // if(uniqList.indexOf(name) === -1){
  //   uniqList.push(name)
  // }
  //list.push(name)
  // var name = req.params.name;
  // // console.log(name);
  // if(namesGreeted[name] === undefined){
  //   greetingCounter++;
  //   namesGreeted[name] = name;
  // }
  // // for(var i = 0; i<list.length; i++){
  // //   if(list[i].name = name){
  // //     greetingCounter++;
  // //   }
  // // }
  res.send(list)
});

app.listen(process.env.PORT || 3000, function() {

  // var host = server.address().address;
  // var port = server.address().port;

  console.log('Example app listening at :' + port);

});
