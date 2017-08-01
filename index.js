var express = require('express');
var app = express();
// var greetedNames = require('./name.js');
// var GreetedNames = greetedNames();
var port = 3000;

var list = [];
var uniqList =[]

app.get('/greetings/:name',function(req, res){
var name = req.params.name
if(uniqList.indexOf(name) === -1){
  uniqList.push(name)
}
res.send('Hello,' + name);
  list.push(name);
});

app.get('/greeted', function(req, res) {
    res.send(uniqList);
});

app.get('/counter/:name', function(req, res){
var name = req.params.name;
// console.log(name);
var greetingCounter = 0;
for(var i = 0; i<list.length; i++){
  if(list[i].name = name){
    greetingCounter++;
  }
}
res.send(name + " " + "has been greeted " + greetingCounter++ + " " +'times')
})

app.use((req, res, next) => {
console.log('one')
next();
});

app.use((req, res, next) => {
console.log('two')
next();
});

app.listen(port,function(){

// var host = server.address().address;
// var port = server.address().port;

console.log('Example app listening at :' + port);

});
