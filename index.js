var express = require('express');
var app = express();
var greetedNames = require('./name.js')
var port = 3000;

app.get('/greetings/:name',function(req, res){
var name = req.params.name
res.send('Hello,' + name)
})

app.get('/greeted',greetedNames.names{

})

app.get('/counter/:name',function(req, res){


})

app.listen(port,function(){

// var host = server.address().address;
// var port = server.address().port;

console.log('Example app listening at :' + port);

});
