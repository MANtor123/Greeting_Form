var express = require('express');
var app = express();
// var greetedNames = require('./name.js');
// var GreetedNames = greetedNames();
var port = 3000;

var list = [];

app.get('/greetings/:name',function(req, res){
var name = req.params.name
res.send('Hello,' + name);
list.push(name);
});

app.get('/greeted', function(req, res) {
    res.send(list);
});

app.listen(port,function(){

// var host = server.address().address;
// var port = server.address().port;

console.log('Example app listening at :' + port);

});
