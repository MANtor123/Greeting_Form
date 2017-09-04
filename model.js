// var mongoose = require('mongoose')
//
// var db = mongoose.connection;
//
// const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
//
// mongoose.connect(mongoURL, {useMongoClient: true});
//
// var nameSchema =  {
//   name : String
// }

Name.findOne({
  name: firstName
}, function(err, results) {
  if (err) {
    return done(err);
    console.log(err);
  }

    // console.log(results);
    else if (results) {
    var newNames = {
      name: firstName
    };

    Name.create(newNames, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        //  console.log(results);
        console.log("successfuly added" + results);
      }
    });


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
var nameSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

nameSchema.index({
  name: 1
}, {
  unique: true
});

//Model
var Name = mongoose.model('Name', nameSchema);

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
  // var namesGreeted = req.body.firstName;
  // console.log(namesGreeted);
  res.render('index')
});


app.post('/greetings', function(req, res) {
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
      } else if (!language || !firstName) {
        req.flash('error', 'Please enter the name and select a language');
      };

      var alreadyGreeted = function(greetedName, cb) {
        if (namesGreeted[greetedName] === undefined) {
          list.push(firstName);
          namesGreeted[greetedName] = 1
        }
        Name.create(newNames, function(err, results) {
            if (err) {
              cb(null, {
                err
              })
            } else {
              //  console.log(results);
              cb(null, {
              results
              })
            }
          };




          //
          // Name.findOne({
          //   name: firstName
          // }, function(err, results) {
          //   if (err) {
          //     console.log(err);
          //   }
          //   // console.log(results);
          //   else if (results) {
          //     var newNames = {
          //       name: firstName
          //     };
          //
          //     Name.create(newNames, function(err, results) {
          //       if (err) {
          //         console.log(err);
          //       } else {
          //         //  console.log(results);
          //         console.log("successfuly added" + results);
          //       }
          //     });

              res.render('index', {
                greeting: string,
                greetCount: greetingCounter
              })

            }

        });
      //
      // 0000000000000000000000000000000000000000000000000000app.get('./greeted', function(req, res) {
      //     res.send(uniqList);
      // });

      app.get('/counter', function(req, res) {
        //   var name = req.body.firstName;
        //   // if(uniqList.indexOf(name) === -1){
        //   //   uniqList.push(name)
        //   // }
        //   //list.push(name)
        //   // var name = req.params.name;
        //   // // console.log(name);
        //   // if(namesGreeted[name] === undefined){
        //   //   greetingCounter++;
        //   //   namesGreeted[name] = name;
        //   // }
        //   // // for(var i = 0; i<list.length; i++){
        //   // //   if(list[i].name = name){
        //   // //     greetingCounter++;
        //   // //   }
        //   // // }
        res.send(list)
      });

      const port = process.env.PORT || 3000;

      app.listen(port, function() {
        console.log('Example app listening at :' + port)
      });
