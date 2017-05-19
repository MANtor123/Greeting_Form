var express = require('express');
var app = express();
var port = 3000;

app.get('/greetings/:name',function(req, res){
var name = req.params.name
res.send('Hello,' + name)
})

app.get('/counter')

app.listen(port,function(){

// var host = server.address().address;
// var port = server.address().port;

console.log('Example app listening at :' + port);

});
